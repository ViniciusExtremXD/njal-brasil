import type { NextConfig } from 'next';

/**
 * O site é exportado como estático e servido pelo GitHub Pages em
 * https://viniciusextremxd.github.io/njal-brasil/ — daí o basePath.
 * Para rodar em domínio próprio no futuro, basta limpar NEXT_PUBLIC_BASE_PATH.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
