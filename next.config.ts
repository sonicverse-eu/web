import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const withMDX = createMDX({
  // MDX options: remark/rehype plugins go here
  options: {},
});

const config: NextConfig = {
  // Standalone output for self-hosting
  output: 'standalone',
  // Allow .mdx page files alongside .tsx
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
};

export default withMDX(config);
