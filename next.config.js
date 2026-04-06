/** @type {import('next').NextConfig} */
const deployTarget = process.env.DEPLOY_TARGET;
const isGithubPages = deployTarget === 'github-pages' || process.env.GITHUB_PAGES === 'true';
const repo = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : 'Aoki-portfolio';

const nextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  reactStrictMode: true,
  ...(isGithubPages
    ? {
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
        trailingSlash: true,
      }
    : {}),
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
