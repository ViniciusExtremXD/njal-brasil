'use client';

import { useEffect } from 'react';
import clsx from 'clsx';

/**
 * Sistema de revelação do site inteiro.
 *
 * Todo elemento que deve entrar no scroll carrega `data-reveal`. Um único
 * IntersectionObserver marca `data-revealed` quando ele encosta na viewport e
 * o CSS faz o resto — transform e opacity, que a GPU resolve sozinha.
 *
 * Por que não um componente de motion por elemento: são centenas de itens.
 * Centenas de observers, de subscriptions e de re-renders custariam frames
 * justamente durante o scroll, que é quando eles precisam estar livres.
 */

export type RevealKind =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'scale'
  | 'clip'
  | 'clip-x'
  | 'blur'
  | 'rule'
  | 'mask';

interface RevealProps {
  children: React.ReactNode;
  /** Gesto de entrada. */
  kind?: RevealKind;
  /** Atraso em ms — use para escalonar itens de uma mesma fileira. */
  delay?: number;
  /** Duração em ms; o padrão já é longo o bastante para parecer pesado. */
  duration?: number;
  className?: string;
  as?: 'div' | 'span' | 'li' | 'figure' | 'section' | 'header' | 'p' | 'h2' | 'h3';
}

/** Envelope de revelação para qualquer bloco. */
export function Reveal({
  children,
  kind = 'up',
  delay = 0,
  duration,
  className,
  as: Tag = 'div',
}: RevealProps) {
  return (
    <Tag
      data-reveal={kind}
      style={
        {
          '--reveal-delay': `${delay}ms`,
          ...(duration ? { '--reveal-duration': `${duration}ms` } : null),
        } as React.CSSProperties
      }
      className={className}
    >
      {children}
    </Tag>
  );
}

/**
 * Texto que entra palavra a palavra. Cada palavra é uma máscara própria, então
 * a linha parece ser digitada por uma prensa, não desbotada na tela.
 */
export function RevealWords({
  text,
  className,
  wordClassName,
  delay = 0,
  step = 34,
  as: Tag = 'span',
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  step?: number;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'blockquote';
}) {
  const words = text.split(' ');

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="line-mask inline-block align-bottom">
          <span
            data-reveal="mask"
            style={{ '--reveal-delay': `${delay + i * step}ms` } as React.CSSProperties}
            className={clsx('inline-block', wordClassName)}
          >
            {word}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  );
}

/** Linhas inteiras subindo de dentro da máscara, uma atrás da outra. */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  step = 90,
  as: Tag = 'div',
}: {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  step?: number;
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'p';
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <span
            data-reveal="mask"
            style={{ '--reveal-delay': `${delay + i * step}ms` } as React.CSSProperties}
            className={clsx('block', lineClassName)}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * Mídia com dupla camada: a moldura abre de baixo para cima enquanto a imagem
 * relaxa de um zoom — o movimento que faz a foto parecer respirar ao entrar.
 */
export function RevealMedia({
  children,
  className,
  delay = 0,
  kind = 'clip',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  kind?: 'clip' | 'clip-x';
}) {
  return (
    <div
      data-reveal={kind}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
      className={clsx('relative overflow-hidden', className)}
    >
      <div
        data-reveal="scale"
        style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
        className="h-full w-full"
      >
        {children}
      </div>
    </div>
  );
}

/** Régua que cresce da esquerda — separa as seções com um gesto. */
export function RevealRule({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <span
      data-reveal="rule"
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
      className={clsx('block h-px w-full bg-iron', className)}
    />
  );
}

/**
 * Liga o observador único da página.
 *
 * Cuidados que valem o código: (1) um MutationObserver pega elementos que
 * nascem depois — os cards trocam quando o filtro muda; (2) um prazo de
 * segurança revela tudo se o observador não reportar, porque conteúdo escondido
 * esperando um frame é bug, não enfeite; (3) cada elemento sai da observação
 * assim que entra, e o `will-change` cai junto.
 */
export function RevealProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const revealed = (el: Element) => el.hasAttribute('data-revealed');

    const reveal = (el: Element) => {
      if (!revealed(el)) el.setAttribute('data-revealed', '');
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 }
    );

    const pending = () => document.querySelectorAll('[data-reveal]:not([data-revealed])');

    const revealAll = () => pending().forEach(reveal);

    const scan = () => {
      // Viewport sem altura (aba aberta em segundo plano, embed colapsado):
      // não dá para decidir por geometria e o observer também não dispara.
      // Nesse caso o conteúdo aparece inteiro — visível vale mais que animado.
      if (window.innerHeight === 0) {
        revealAll();
        return;
      }

      pending().forEach((el) => {
        // Já está na tela no primeiro paint: revela sem esperar scroll.
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
          reveal(el);
          return;
        }
        observer.observe(el);
      });
    };

    scan();

    const mutations = new MutationObserver(() => scan());
    mutations.observe(document.body, { childList: true, subtree: true });

    // A janela pode ganhar altura depois (pane restaurada, aba trazida à frente).
    window.addEventListener('resize', scan);
    document.addEventListener('visibilitychange', scan);

    /*
     * Varredura por geometria, em paralelo ao observer.
     *
     * Não dá para detectar um IntersectionObserver "morto": ele dispara um
     * callback inicial mesmo sem interseção nenhuma, então parecer vivo não
     * prova que vai reportar. Em vez de adivinhar, as duas vias ficam ligadas:
     * o observer resolve o caso comum de graça e esta varredura garante o
     * resultado. Ela só mede os elementos que ainda faltam — a lista encolhe
     * sozinha conforme a página é revelada.
     */
    let timer: number | null = null;

    const byGeometry = () => {
      timer = null;
      const list = pending();
      if (!list.length) return;
      const limit = window.innerHeight * 0.92;
      list.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < limit && rect.bottom > -rect.height) reveal(el);
      });
    };

    const onScroll = () => {
      if (timer !== null) return;
      timer = window.setTimeout(byGeometry, 140);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Rede de segurança para viewport sem altura, onde geometria não decide nada.
    const safety = window.setTimeout(() => {
      if (window.innerHeight === 0) revealAll();
      else byGeometry();
    }, 2200);

    /*
     * Último recurso: uma varredura periódica curta.
     *
     * Existem contextos (webviews suspensas, pré-visualizações embutidas) em
     * que a posição do scroll muda mas nem o evento `scroll` nem o
     * IntersectionObserver são despachados. Sem isto a página ficaria em branco
     * abaixo da dobra nesses ambientes. Em um navegador normal as outras duas
     * vias já resolveram tudo antes, e o intervalo se desliga sozinho assim que
     * não há mais nada pendente — ou ao fim da janela de 20s.
     */
    const started = Date.now();
    const sweep = window.setInterval(() => {
      if (!pending().length || Date.now() - started > 20_000) {
        window.clearInterval(sweep);
        return;
      }
      byGeometry();
    }, 400);

    return () => {
      observer.disconnect();
      mutations.disconnect();
      window.removeEventListener('resize', scan);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', scan);
      window.clearTimeout(safety);
      window.clearInterval(sweep);
      if (timer !== null) window.clearTimeout(timer);
    };
  }, []);

  return <>{children}</>;
}
