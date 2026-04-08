const esbuild = require('esbuild');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function build() {
  // Build Tailwind CSS
  const minifyFlag = process.env.NODE_ENV === 'production' ? '--minify' : '';
  execSync(`npx @tailwindcss/cli -i src/styles/main.css -o dist/styles/tailwind.css ${minifyFlag}`, { stdio: 'inherit' });

  // Bundle TypeScript
  await esbuild.build({
    entryPoints: ['src/app.ts'],
    bundle: true,
    outdir: 'dist',
    format: 'esm',
    splitting: true,
    target: 'es2020',
    sourcemap: true,
    minify: process.env.NODE_ENV === 'production',
  });

  // Copy static files to dist
  const staticFiles = ['index.html', 'manifest.json', 'robots.txt', 'sitemap.xml', '404.html', '_headers', '_redirects'];
  for (const file of staticFiles) {
    if (fs.existsSync(file)) {
      fs.copyFileSync(file, path.join('dist', file));
    }
  }

  // Copy assets directory
  if (fs.existsSync('assets')) {
    copyDir('assets', path.join('dist', 'assets'));
  }

  // Copy service worker with build-stamped cache name
  if (fs.existsSync('sw.js')) {
    const swContent = fs.readFileSync('sw.js', 'utf8');
    const buildHash = Date.now().toString(36);
    const stamped = swContent.replace(/const CACHE_NAME = '[^']+';/, `const CACHE_NAME = 'gongyi-${buildHash}';`);
    fs.writeFileSync(path.join('dist', 'sw.js'), stamped);
  }

  console.log('Build complete!');
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
