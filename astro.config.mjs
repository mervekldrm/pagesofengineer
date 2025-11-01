import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  // Disable the Astro dev toolbar overlay which can inject Astro-related UI during dev
  // This setting is safe to remove if you want the toolbar back.
  devToolbar: { enabled: false },
});