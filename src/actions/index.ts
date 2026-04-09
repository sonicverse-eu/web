import { ActionError, defineAction } from 'astro:actions';
import { FROM_EMAIL, RESEND_API_KEY, TO_EMAIL } from 'astro:env/server';
import { z } from 'astro:schema';
import { Resend } from 'resend';
import { createElement } from 'react';
import { SubmitterContactEmail, TeamContactEmail } from './contact-email-templates';
import { getValidThreadId } from '../utils/contact';

const resend = new Resend(RESEND_API_KEY);

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

export const server = {
  sendMail: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string().min(2, 'Please share your name.').max(80),
      email: z.email('Enter a valid email address.'),
      company: z.string().max(120).optional(),
      detailsUrl: z.union([z.url('Enter a valid URL.'), z.literal('')]).optional(),
      category: z.string().min(2, 'Select a category.').max(120),
      categoryLabel: z.string().optional(),
      threadId: z.string().optional(),
      message: z.string().min(10, 'Please include a bit more context.').max(3000),
      website: z.string().max(0).optional()
    }),
    handler: async ({ name, email, company, detailsUrl, category, categoryLabel, threadId: submittedThreadId, message, website }) => {
      const threadId = getValidThreadId(submittedThreadId);
      const resolvedCategoryLabel = categoryLabel?.trim() || formatCategory(category);
      const safeDetailsUrl = getSafeReferenceUrl(detailsUrl);

      if (website) {
        return { ok: true, threadId };
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
        message
      ].join('\n');
      const teamReact = createElement(TeamContactEmail, {
        threadId,
        name,
        email,
        company,
        detailsUrl: safeDetailsUrl,
        category: resolvedCategoryLabel,
        message
      });

      const teamResponse = await resend.emails.send({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        replyTo: email,
        subject: teamSubject,
        text: teamText,
        react: teamReact
      });

      if (teamResponse.error) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'We could not send your message right now. Please try again shortly.'
        });
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
        'A maintainer will follow up within two business days.'
      ].join('\n');
      const submitterReact = createElement(SubmitterContactEmail, {
        threadId,
        name,
        detailsUrl: safeDetailsUrl,
        category: resolvedCategoryLabel,
        message
      });

      const submitterResponse = await resend.emails.send({
        from: FROM_EMAIL,
        to: [email],
        subject: submitterSubject,
        text: submitterText,
        react: submitterReact
      });

      if (submitterResponse.error) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'We could not send your message right now. Please try again shortly.'
        });
      }

      return { ok: true, threadId };
    }
  })
};
