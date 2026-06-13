import sharp from 'sharp';
import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, '..', 'assets');

const files = (await readdir(assetsDir)).filter(f => f.startsWith('screenshot-') && f.endsWith('.png'));

for (const file of files) {
  const base = file.replace(/\.png$/, '');
  const input = path.join(assetsDir, file);
  const webpOut = path.join(assetsDir, `${base}.webp`);

  const meta = await sharp(input).metadata();
  const before = (await import('fs/promises')).then ? null : null;

  await sharp(input)
    .resize(960, null, { withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: 82, effort: 4 })
    .toFile(webpOut);

  const { statSync } = await import('fs');
  const beforeKb = Math.round(statSync(input).size / 1024);
  const afterKb = Math.round(statSync(webpOut).size / 1024);
  console.log(`${base}: ${meta.width}x${meta.height} PNG ${beforeKb}KB → WebP ${afterKb}KB`);
}
