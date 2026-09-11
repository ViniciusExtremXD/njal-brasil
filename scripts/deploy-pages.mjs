/**
 * Publica o export estático da NJAL no GitHub Pages (branch gh-pages).
 *
 * Uso: npm run deploy
 *
 *  1. builda com NEXT_PUBLIC_BASE_PATH=/njal-brasil (o Pages serve em subpasta);
 *  2. copia out/ para uma pasta temporária com .nojekyll;
 *  3. faz force push dessa pasta na branch gh-pages.
 */
import { execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const REPO_URL = 'https://github.com/ViniciusExtremXD/njal-brasil.git';
const BASE_PATH = '/njal-brasil';

const win = process.platform === 'win32';
const run = (cmd, args, cwd) => execFileSync(cmd, args, { cwd, stdio: 'inherit', shell: win });

console.log(`\n> build estático com basePath ${BASE_PATH}`);
execFileSync('npm', ['run', 'build'], {
  stdio: 'inherit',
  shell: win,
  env: { ...process.env, NEXT_PUBLIC_BASE_PATH: BASE_PATH },
});

const staging = mkdtempSync(join(tmpdir(), 'njal-pages-'));
try {
  cpSync('out', staging, { recursive: true });
  // Sem isto o Jekyll do GitHub ignora a pasta _next inteira.
  writeFileSync(join(staging, '.nojekyll'), '');

  run('git', ['init', '-b', 'gh-pages', '-q'], staging);
  run('git', ['add', '-A'], staging);
  run(
    'git',
    [
      '-c',
      'user.name=NJAL Deploy',
      '-c',
      'user.email=deploy@njal.local',
      'commit',
      '-q',
      '-m',
      'Deploy da vitrine NJAL',
    ],
    staging
  );
  run('git', ['remote', 'add', 'origin', REPO_URL], staging);
  run('git', ['push', '-f', 'origin', 'gh-pages'], staging);

  console.log(`\n> publicado em https://viniciusextremxd.github.io${BASE_PATH}/`);
} finally {
  rmSync(staging, { recursive: true, force: true });
}
