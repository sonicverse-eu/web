'use server';

import { createElement } from 'react';
import { Resend } from 'resend';
import { z } from 'zod';
import { SubmitterContactEmail, TeamContactEmail } from '@/actions/contact-email-templates';
import { getValidThreadId } from '@/lib/contact';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please share your name.').max(80),
  email: z.string().trim().email('Enter a valid email address.'),
  company: z.string().trim().max(120).optional(),
  detailsUrl: z.union([z.string().trim().url('Enter a valid URL.'), z.literal('')]).optional(),
  category: z.string().trim().min(2, 'Select a category.').max(120),
  categoryLabel: z.string().trim().optional(),
  threadId: z.string().trim().optional(),
  message: z.string().trim().min(10, 'Please include a bit more context.').max(3000),
  website: z.string().max(0).optional(),
});

export type ContactFormValues = {
  name: string;
  email: string;
  company: string;
  detailsUrl: string;
  category: string;
  categoryLabel: string;
  threadId: string;
  message: string;
};

export type ContactFormState = {
  ok: boolean;
  message?: string;
  threadId: string;
  errors?: Partial<Record<keyof ContactFormValues, string>>;
  values: ContactFormValues;
};

function formatCategory(value: string) {
  return value
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getSafeReferenceUrl(value?: string) {
  if (!value) {
    return undefined;
  }

  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? parsed.toString() : undefined;
  } catch {
    return undefined;
  }
}

function valueFromFormData(formData: FormData, field: keyof ContactFormValues) {
  const value = formData.get(field);
  return typeof value === 'string' ? value : '';
}

export async function sendContactRequest(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const rawValues: ContactFormValues = {
    name: valueFromFormData(formData, 'name'),
    email: valueFromFormData(formData, 'email'),
    company: valueFromFormData(formData, 'company'),
    detailsUrl: valueFromFormData(formData, 'detailsUrl'),
    category: valueFromFormData(formData, 'category'),
    categoryLabel: valueFromFormData(formData, 'categoryLabel'),
    threadId: getValidThreadId(valueFromFormData(formData, 'threadId')),
    message: valueFromFormData(formData, 'message'),
  };

  const website = typeof formData.get('website') === 'string' ? String(formData.get('website')) : '';

  const parsed = contactSchema.safeParse({
    ...rawValues,
    website,
  });

  if (!parsed.success) {
    const flattened = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      threadId: rawValues.threadId,
      message: 'Please fix the highlighted fields and try again.',
      values: rawValues,
      errors: {
        name: flattened.name?.[0],
        email: flattened.email?.[0],
        company: flattened.company?.[0],
        detailsUrl: flattened.detailsUrl?.[0],
        category: flattened.category?.[0],
        categoryLabel: flattened.categoryLabel?.[0],
        threadId: flattened.threadId?.[0],
        message: flattened.message?.[0],
      },
    };
  }

  const { name, email, company, detailsUrl, category, categoryLabel, message } = parsed.data;
  const threadId = getValidThreadId(parsed.data.threadId);
  const resolvedCategoryLabel = categoryLabel || formatCategory(category);
  const safeDetailsUrl = getSafeReferenceUrl(detailsUrl);

  if (website) {
    return {
      ok: true,
      threadId,
      message: 'Message sent.',
      values: {
        ...rawValues,
        categoryLabel: resolvedCategoryLabel,
        detailsUrl: safeDetailsUrl ?? '',
      },
    };
  }

  if (!resend || !process.env.FROM_EMAIL || !process.env.TO_EMAIL) {
    return {
      ok: false,
      threadId,
      message: 'Contact delivery is not configured yet. Please set the email environment variables.',
      values: {
        ...rawValues,
        categoryLabel: resolvedCategoryLabel,
        detailsUrl: safeDetailsUrl ?? '',
      },
    };
  }

  const teamSubject = `[${threadId}] New contact request from ${name}`;
  const teamText = [
    'A new contact request was submitted on sonicverse.eu.',
    '',
    `Thread: ${threadId}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || '-'}`,
    `Reference URL: ${safeDetailsUrl || '-'}`,
    `Category: ${resolvedCategoryLabel}`,
    '',
    'Message:',
    message,
  ].join('\n');

  const teamResponse = await resend.emails.send({
    from: process.env.FROM_EMAIL,
    to: [process.env.TO_EMAIL],
    replyTo: email,
    subject: teamSubject,
    text: teamText,
    react: createElement(TeamContactEmail, {
      threadId,
      name,
      email,
      company,
      detailsUrl: safeDetailsUrl,
      category: resolvedCategoryLabel,
      message,
    }),
  });

  if (teamResponse.error) {
    return {
      ok: false,
      threadId,
      message: 'We could not send your message right now. Please try again shortly.',
      values: {
        ...rawValues,
        categoryLabel: resolvedCategoryLabel,
        detailsUrl: safeDetailsUrl ?? '',
      },
    };
  }

  const submitterSubject = `Sonicverse request received [${threadId}]`;
  const submitterText = [
    `Hi ${name},`,
    '',
    'Thanks for reaching out to Sonicverse. Your request is now in our queue.',
    `Thread ID: ${threadId}`,
    '',
    `Category: ${resolvedCategoryLabel}`,
    '',
    'Message copy:',
    message,
    '',
    'A maintainer will follow up within two business days.',
  ].join('\n');

  const submitterResponse = await resend.emails.send({
    from: process.env.FROM_EMAIL,
    to: [email],
    subject: submitterSubject,
    text: submitterText,
    react: createElement(SubmitterContactEmail, {
      threadId,
      name,
      detailsUrl: safeDetailsUrl,
      category: resolvedCategoryLabel,
      message,
    }),
  });

  if (submitterResponse.error) {
    return {
      ok: false,
      threadId,
      message: 'We could not send your message right now. Please try again shortly.',
      values: {
        ...rawValues,
        categoryLabel: resolvedCategoryLabel,
        detailsUrl: safeDetailsUrl ?? '',
      },
    };
  }

  return {
    ok: true,
    threadId,
    message: `Message sent. Use thread ID ${threadId} in any follow-up reply.`,
    values: {
      ...rawValues,
      categoryLabel: resolvedCategoryLabel,
      detailsUrl: safeDetailsUrl ?? '',
    },
  };
}
