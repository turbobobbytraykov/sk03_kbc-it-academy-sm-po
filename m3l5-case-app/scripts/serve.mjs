// Serves the production build on http://localhost:4300 for presenting. No dependencies.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = join(import.meta.dirname, '..', 'dist', 'm3l5-case-app', 'browser');
const port = Number(process.env.PORT ?? 4300);
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.txt': 'text/plain' };

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  // A folder without its slash (/bg) would resolve the page's relative links against the wrong folder.
  if (url.pathname !== '/' && !extname(url.pathname) && !url.pathname.endsWith('/')) {
    res.writeHead(301, { Location: `${url.pathname}/${url.search}` }).end();
    return;
  }
  const path = normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, '');
  // A folder serves its index.html: / and /bg/.
  const file = join(root, extname(path) ? path : join(path, 'index.html'));
  if (!file.startsWith(root)) {
    res.writeHead(403).end();
    return;
  }
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': `${types[extname(file)] ?? 'application/octet-stream'}; charset=utf-8` });
    res.end(body);
  } catch {
    res.writeHead(404).end('Not found');
  }
}).listen(port, 'localhost', () => console.log(`Case app on http://localhost:${port}/`));
