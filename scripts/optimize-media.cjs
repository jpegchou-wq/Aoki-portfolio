const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const sharp = require('sharp');

const ffmpegPath = (() => {
  try {
    return require('ffmpeg-static');
  } catch {
    return null;
  }
})();

function walk(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function formatMB(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)}MB`;
}

function isImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return ['.jpg', '.jpeg', '.png'].includes(ext);
}

function isVideo(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return ['.mp4', '.mov', '.m4v', '.webm'].includes(ext);
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const before = fs.statSync(filePath).size;

  const pipeline = sharp(filePath, { failOnError: false });
  const meta = await pipeline.metadata();
  const width = meta.width ?? null;

  const maxWidth = 2400;
  const shouldResize = typeof width === 'number' && width > maxWidth;
  const resized = shouldResize ? pipeline.resize({ width: maxWidth, withoutEnlargement: true }) : pipeline;

  const tmpPath = `${filePath}.opt.tmp`;
  ensureDir(path.dirname(tmpPath));

  if (ext === '.jpg' || ext === '.jpeg') {
    await resized
      .jpeg({ quality: 72, progressive: true, mozjpeg: true })
      .toFile(tmpPath);
  } else if (ext === '.png') {
    await resized
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(tmpPath);
  } else {
    return { changed: false, before, after: before };
  }

  const after = fs.statSync(tmpPath).size;
  if (after < before * 0.98) {
    fs.renameSync(tmpPath, filePath);
    return { changed: true, before, after };
  }

  fs.unlinkSync(tmpPath);
  return { changed: false, before, after: before };
}

function optimizeVideo(filePath) {
  if (!ffmpegPath) {
    return { skipped: true, reason: 'ffmpeg-static not installed' };
  }

  const before = fs.statSync(filePath).size;
  const tmpPath = `${filePath}.opt.tmp.mp4`;
  ensureDir(path.dirname(tmpPath));

  const args = [
    '-y',
    '-i',
    filePath,
    '-vf',
    "scale='min(1280,iw)':-2",
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-crf',
    '28',
    '-pix_fmt',
    'yuv420p',
    '-c:a',
    'aac',
    '-b:a',
    '96k',
    '-movflags',
    '+faststart',
    tmpPath,
  ];

  const res = spawnSync(ffmpegPath, args, { stdio: 'inherit' });
  if (res.status !== 0) {
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
    return { skipped: true, reason: `ffmpeg failed (${res.status})` };
  }

  const after = fs.statSync(tmpPath).size;
  if (after < before * 0.98) {
    fs.renameSync(tmpPath, filePath);
    return { changed: true, before, after };
  }

  fs.unlinkSync(tmpPath);
  return { changed: false, before, after: before };
}

async function main() {
  const publicDir = path.join(process.cwd(), 'public');
  const files = walk(publicDir);

  const imageFiles = files.filter((f) => isImage(f));
  const videoFiles = files.filter((f) => isVideo(f));

  let imgBefore = 0;
  let imgAfter = 0;
  let imgChanged = 0;

  for (const f of imageFiles) {
    imgBefore += fs.statSync(f).size;
    const res = await optimizeImage(f);
    imgAfter += fs.statSync(f).size;
    if (res.changed) imgChanged += 1;
  }

  let vidBefore = 0;
  let vidAfter = 0;
  let vidChanged = 0;
  let vidSkipped = 0;

  for (const f of videoFiles) {
    vidBefore += fs.statSync(f).size;
    const res = optimizeVideo(f);
    vidAfter += fs.statSync(f).size;
    if (res.changed) vidChanged += 1;
    if (res.skipped) vidSkipped += 1;
  }

  console.log('\nDone.');
  console.log(`Images: ${imgChanged}/${imageFiles.length} changed, ${formatMB(imgBefore)} → ${formatMB(imgAfter)}`);
  console.log(`Videos: ${vidChanged}/${videoFiles.length} changed, skipped=${vidSkipped}, ${formatMB(vidBefore)} → ${formatMB(vidAfter)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

