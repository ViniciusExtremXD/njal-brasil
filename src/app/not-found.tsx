import Link from 'next/link';
import { BRAND } from '@/lib/brand';

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center gap-8 px-6 text-center">
      <span className="type-tactical text-[10px] text-blood">ERRO 404</span>
      <h1 className="type-brutal text-[22vw] leading-[0.8] text-bone sm:text-[14vw]">
        SEM ROTA
      </h1>
      <p className="max-w-sm text-sm leading-relaxed text-smoke">
        Essa página não existe — ou o lote acabou e ela saiu do ar. O arsenal continua de pé.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="type-tactical cut-badge bg-blood px-7 py-4 text-[10px] text-bone transition-colors hover:bg-ember"
        >
          VOLTAR PARA A BASE
        </Link>
        <a
          href={BRAND.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="type-tactical border border-iron px-7 py-4 text-[10px] text-smoke transition-colors hover:border-blood hover:text-bone"
        >
          IR PARA O INSTAGRAM
        </a>
      </div>
    </main>
  );
}
