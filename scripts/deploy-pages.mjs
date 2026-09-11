/**
 * Publica a vitrine NJAL no GitHub Pages (branch gh-pages).
 *
 * Uso: npm run deploy
 *
 * O que ele faz:
 *  1. builda com VITE_BASE=/<repo>/ para os assets resolverem no subdiretorio;
 *  2. copia dist/ para uma pasta temporaria com .nojekyll;
 *  3. faz force push dessa pasta na branch gh-pages do remote origin.
 */
import { execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const REPO_URL = 'https://github.com/ViniciusExtremXD/njal-brasil.git';
const BASE = '/njal-brasil/';

const run = (cmd, args, cwd) =>
  execFileSync(cmd, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' });

console.log(`\n> build com base ${BASE}`);
execFileSync('npm', ['run', 'build'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: { ...process.env, VITE_BASE: BASE },
});

const staging = mkdtempSync(join(tmpdir(), 'njal-pages-'));
try {
  cpSync('dist', staging, { recursive: true });
  // Impede o Jekyll do GitHub de ignorar arquivos iniciados por _
  writeFileSync(join(staging, '.nojekyll'), '');

  run('git', ['init', '-b', 'gh-pages', '-q'], staging);
  run('git', ['add', '-A'], staging);
  run('git', ['-c', 'user.name=NJAL Deploy', '-c', 'user.email=deploy@njal.local',
              'commit', '-q', '-m', 'Deploy da vitrine NJAL Brasil'], staging);
  run('git', ['remote', 'add', 'origin', REPO_URL], staging);
  run('git', ['push', '-f', 'origin', 'gh-pages'], staging);

  console.log(`\n> publicado em https://viniciusextremxd.github.io${BASE}`);
} finally {
  rmSync(staging, { recursive: true, force: true });
}
