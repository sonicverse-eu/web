// @ts-check
import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';

import node from '@astrojs/node';

import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx(), partytown()],

  adapter: node({
    mode: 'standalone'
  }),

  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret' }),
      FROM_EMAIL: envField.string({ context: 'server', access: 'secret' }),
      TO_EMAIL: envField.string({ context: 'server', access: 'secret' })
    }
  },

  vite: {
    plugins: [tailwindcss()]
  }
});