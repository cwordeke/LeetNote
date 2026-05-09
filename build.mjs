import * as esbuild from 'esbuild';
import { copyFileSync, mkdirSync, existsSync } from 'fs';

if (!existsSync('dist')) {
  mkdirSync('dist');
}

await esbuild.build({
  entryPoints: [
    'src/background.ts',
    'src/sidepanel.ts'
  ],

  bundle: true,
  outdir: 'dist',

  sourcemap: true,
  minify: false,

  target: ['chrome120'],
  format: 'esm'
});

copyFileSync('public/manifest.json', 'dist/manifest.json');
copyFileSync('public/sidepanel.html', 'dist/sidepanel.html');

console.log('Build complete');