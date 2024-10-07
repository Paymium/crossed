/** @type {import('next').NextConfig} */

import { withCrossed } from '@crossed/next-adapter';
const nextConfig = withCrossed({ configPath: './src/style.config.ts' })({});

export default nextConfig;
