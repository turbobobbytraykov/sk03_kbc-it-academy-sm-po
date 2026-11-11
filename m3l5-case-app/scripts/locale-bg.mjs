// Writes bg/index.html beside the build: the same bundle, with <html lang="bg"> so the app starts in
// Bulgarian, and <base href="../"> so it loads the scripts and styles from the root. Run after `ng build`.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export const BG_TITLE = 'Срив в плащанията · M3 L5 симулация';

/** The Bulgarian variant of a built index.html. */
export function toBulgarian(html, base) {
  const out = html
    .replace(/<html lang="en"/, '<html lang="bg"')
    .replace(/<title>[^<]*<\/title>/, `<title>${BG_TITLE}</title>`)
    .replace('<base href="./">', `<base href="${base}">`);
  if (!out.includes('<html lang="bg"')) throw new Error('Could not set lang="bg"; check src/index.html');
  return out;
}

const browserDir = join(import.meta.dirname, '..', 'dist', 'm3l5-case-app', 'browser');
if (process.argv[1] === import.meta.filename) {
  const html = readFileSync(join(browserDir, 'index.html'), 'utf8');
  mkdirSync(join(browserDir, 'bg'), { recursive: true });
  writeFileSync(join(browserDir, 'bg', 'index.html'), toBulgarian(html, '../'));
  console.log('Bulgarian page: dist/m3l5-case-app/browser/bg/index.html');
}
