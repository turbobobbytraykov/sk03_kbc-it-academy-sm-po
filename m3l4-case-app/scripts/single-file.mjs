// Inlines the built JS and CSS into one HTML file that works when opened straight from disk
// (file://), where browsers refuse to load external module scripts. Run after `ng build`.
//
// Unlike M3 L5, this build has lazy chunks: ng-apexcharts loads ApexCharts with import(), and
// igniteui-webcomponents loads floating-ui the same way. A file:// page cannot fetch them, so the
// built main bundle is bundled once more with esbuild and code splitting off, which pulls every
// dynamically imported chunk into the same file.
import { buildSync } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { toBulgarian } from './locale-bg.mjs';

const browserDir = join(import.meta.dirname, '..', 'dist', 'm3l4-case-app', 'browser');
const outDir = join(import.meta.dirname, '..', 'dist', 'm3l4-case-app', 'single');
const outFile = join(outDir, 'm3l4-case-app.html');

const main = readdirSync(browserDir).find((f) => /^main-.*\.js$/.test(f));
if (!main) throw new Error('No main-*.js in the build');

const bundled = buildSync({
  entryPoints: [join(browserDir, main)],
  bundle: true,
  format: 'esm',
  splitting: false,
  minify: true,
  write: false,
  logLevel: 'warning',
}).outputFiles[0].text;
if (/import\(\s*[`'"]\.\/chunk-/.test(bundled)) {
  throw new Error('A lazy chunk is still loaded by import(); the single file would not be self-contained');
}

let html = readFileSync(join(browserDir, 'index.html'), 'utf8');

// Stylesheets: the build emits <link rel="stylesheet" href="styles-*.css" ...> plus a <noscript> fallback.
html = html.replace(/<noscript><link rel="stylesheet" href="styles-[^"]+\.css"><\/noscript>/g, '');
html = html.replace(/<link rel="stylesheet" href="(styles-[^"]+\.css)"[^>]*>/g, (_, href) => {
  const css = readFileSync(join(browserDir, href), 'utf8');
  return `<style>${css}</style>`;
});

// Scripts: an inline module script needs no fetch, so it runs from file://.
html = html.replace(/<script src="(main-[^"]+\.js)" type="module"><\/script>/g, () => {
  const js = bundled.replace(/<\/script/gi, '<\\/script');
  return `<script type="module">${js}</script>`;
});

if (/src="main-|href="styles-/.test(html)) throw new Error('Inlining missed a reference; check the built index.html');

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, html);
// Bulgarian: the same file with lang="bg". The language switch links the two by name.
writeFileSync(outFile.replace(/\.html$/, '-bg.html'), toBulgarian(html, './'));
console.log(`Single-file build: ${outFile} and -bg.html (${Math.round(html.length / 1024)} kB each)`);
