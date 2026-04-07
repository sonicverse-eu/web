import { ActionError, defineAction } from 'astro:actions';
import { FROM_EMAIL, RESEND_API_KEY, TO_EMAIL } from 'astro:env/server';
import { z } from 'astro:schema';
import { Resend } from 'resend';

const resend = new Resend(RESEND_API_KEY);

export const server = {
  sendMail: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string().min(2, 'Please share your name.').max(80),
      email: z.email('Enter a valid email address.'),
      message: z.string().min(10, 'Please include a bit more context.').max(3000)
    }),
    handler: async ({ name, email, message }) => {
      const subject = `New Sonicverse contact form message from ${name}`;
      const text = [
        'You have a new contact request from sonicverse.dev.',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        'Message:',
        message
      ].join('\n');

      const response = await resend.emails.send({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        replyTo: email,
        subject,
        text
      });

      if (response.error) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'We could not send your message right now. Please try again shortly.'
        });
      }

      return { ok: true };
    }
  })
};