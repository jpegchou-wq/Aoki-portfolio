# China Deployment Guide

This project has been adjusted to reduce blocked external dependencies in Mainland China:
- Removed Google Fonts and Alibaba iconfont CDN references
- Replaced remote thumbnails with local static assets
- Replaced YouTube embed in project data with local fallback image

## Recommended Production Setup (Mainland China)

1. ICP filing (required for stable mainland access)
- Register your domain under a mainland cloud provider
- Complete ICP filing before opening public traffic

2. Mainland hosting
- Build static output locally or in CI:
  - `npm ci`
  - `npm run build`
- Deploy the `out/` directory to:
  - Tencent Cloud COS + CDN
  - Alibaba Cloud OSS + CDN
  - Huawei OBS + CDN

3. DNS strategy
- `www.yourdomain.com` -> Mainland CDN origin (primary for CN users)
- `global.yourdomain.com` -> Vercel deployment (for global users)

4. Cache and compression
- Enable Brotli/Gzip on CDN
- Cache immutable assets (`_next/static/*`, images, fonts)
- Keep HTML cache short or bypass cache for fast content updates

5. Optional split traffic
- Use GeoDNS / line routing:
  - Mainland users -> mainland CDN
  - Overseas users -> Vercel

## CI recommendation
If you keep GitHub + Vercel for global delivery, add a second pipeline that publishes `out/` to mainland object storage after each successful push to `main`.
