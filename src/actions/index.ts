import { ActionError, defineAction } from 'astro:actions';
import { FROM_EMAIL, RESEND_API_KEY, TO_EMAIL } from 'astro:env/server';
import { z } from 'astro:schema';
import { randomUUID } from 'node:crypto';
import { Resend } from 'resend';

const resend = new Resend(RESEND_API_KEY);

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function buildThreadId() {
  const date = new Date().toISOString().slice(0, 10).replaceAll('-', '');
  return `SV-${date}-${randomUUID().slice(0, 8).toUpperCase()}`;
}

function buildTeamTemplate(params: {
  threadId: string;
  name: string;
  email: string;
  company?: string;
  department: string;
  category: string;
  priority: string;
  message: string;
}) {
  const rows = [
    ['Thread ID', params.threadId],
    ['Name', params.name],
    ['Email', params.email],
    ['Company', params.company || '-'],
    ['Department', params.department],
    ['Category', params.category],
    ['Priority', params.priority]
  ]
    .map(
      ([key, value]) =>
        `<tr><td style="padding:10px 12px;font-weight:700;color:#4f2ea4;border-bottom:1px solid #e7dfff;">${escapeHtml(key)}</td><td style="padding:10px 12px;color:#2b1c4a;border-bottom:1px solid #e7dfff;">${escapeHtml(value)}</td></tr>`
    )
    .join('');

  return `
    <div style="margin:0;padding:28px;background:#f4efff;font-family:Arial,sans-serif;color:#1f1236;">
      <table role="presentation" width="100%" style="max-width:680px;margin:0 auto;border-collapse:collapse;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 12px 36px rgba(68,35,145,0.15);">
        <tr>
          <td style="padding:22px 24px;background:linear-gradient(135deg,#6b33df,#4f7dff);color:#ffffff;">
            <p style="margin:0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.9;">Sonicverse Contact Desk</p>
            <h1 style="margin:8px 0 0;font-size:24px;line-height:1.2;">New inbound request</h1>
            <p style="margin:10px 0 0;font-size:14px;opacity:0.92;">Thread: ${escapeHtml(params.threadId)}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 24px;">
            <table role="presentation" width="100%" style="border-collapse:collapse;border:1px solid #e7dfff;border-radius:12px;overflow:hidden;">${rows}</table>
            <h2 style="margin:20px 0 8px;font-size:16px;color:#2c1a52;">Message</h2>
            <div style="padding:14px;border:1px solid #e7dfff;border-radius:12px;background:#faf8ff;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(params.message)}</div>
          </td>
        </tr>
      </table>
    </div>
  `;
}

function buildSubmitterTemplate(params: {
  threadId: string;
  name: string;
  department: string;
  category: string;
  priority: string;
  message: string;
}) {
  return `
    <div style="margin:0;padding:28px;background:#eff4ff;font-family:Arial,sans-serif;color:#1f1236;">
      <table role="presentation" width="100%" style="max-width:640px;margin:0 auto;border-collapse:collapse;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 12px 36px rgba(42,87,167,0.14);">
        <tr>
          <td style="padding:22px 24px;background:linear-gradient(135deg,#2f6df7,#34a4ff);color:#ffffff;">
            <p style="margin:0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.9;">Sonicverse Support</p>
            <h1 style="margin:8px 0 0;font-size:24px;line-height:1.2;">Your request is in</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 24px;">
            <p style="margin:0 0 12px;font-size:15px;line-height:1.65;">Hi ${escapeHtml(params.name)}, thanks for reaching out. Your request has been routed and tracked with this thread ID:</p>
            <p style="margin:0 0 16px;padding:10px 12px;border-radius:10px;background:#eef5ff;color:#204a99;font-size:15px;font-weight:700;">${escapeHtml(params.threadId)}</p>
            <p style="margin:0 0 12px;font-size:14px;color:#3d2b63;">Routing: ${escapeHtml(params.department)} / ${escapeHtml(params.category)} / ${escapeHtml(params.priority)}</p>
            <p style="margin:0 0 8px;font-size:13px;letter-spacing:0.06em;text-transform:uppercase;color:#6f5ea0;">Your message</p>
            <div style="padding:14px;border:1px solid #dbe8ff;border-radius:12px;background:#f9fbff;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(params.message)}</div>
            <p style="margin:16px 0 0;font-size:14px;line-height:1.6;color:#514172;">A maintainer will follow up within two business days.</p>
          </td>
        </tr>
      </table>
    </div>
  `;
}

export const server = {
  sendMail: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string().min(2, 'Please share your name.').max(80),
      email: z.email('Enter a valid email address.'),
      company: z.string().max(120).optional(),
      department: z.string().min(2, 'Select a department.').max(80),
      category: z.string().min(2, 'Select a category.').max(120),
      priority: z.string().min(2, 'Select a priority.').max(40),
      message: z.string().min(10, 'Please include a bit more context.').max(3000)
    }),
    handler: async ({ name, email, company, department, category, priority, message }) => {
      const threadId = buildThreadId();
      const teamSubject = `[${threadId}] New contact request from ${name}`;
      const teamText = [
        'A new contact request was submitted on sonicverse.dev.',
        '',
        `Thread: ${threadId}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || '-'}`,
        `Department: ${department}`,
        `Category: ${category}`,
        `Priority: ${priority}`,
        '',
        'Message:',
        message
      ].join('\n');

      const teamResponse = await resend.emails.send({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        replyTo: email,
        subject: teamSubject,
        text: teamText,
        html: buildTeamTemplate({
          threadId,
          name,
          email,
          company,
          department,
          category,
          priority,
          message
        })
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
        `Department: ${department}`,
        `Category: ${category}`,
        `Priority: ${priority}`,
        '',
        'Message copy:',
        message,
        '',
        'A maintainer will follow up within two business days.'
      ].join('\n');

      const submitterResponse = await resend.emails.send({
        from: FROM_EMAIL,
        to: [email],
        subject: submitterSubject,
        text: submitterText,
        html: buildSubmitterTemplate({
          threadId,
          name,
          department,
          category,
          priority,
          message
        })
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