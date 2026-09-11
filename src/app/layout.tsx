import type { Metadata, Viewport } from 'next';
import { Archivo, Sora, JetBrains_Mono } from 'next/font/google';
import { asset } from '@/lib/brand';
import { Shell } from '@/components/layout/Shell';
import './globals.css';

// Variável com eixo de largura: é o que permite a tipografia esticar no scroll.
const display = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-display',
  display: 'swap',
});

const body = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-body',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://viniciusextremxd.github.io/njal-brasil/'),
  title: 'NJAL BRASIL — Forged For Champions',
  description:
    'Não são apenas roupas. São armaduras de treino. Crossfit RX, Valhalla, tatame e rua. Drops limitados anunciados no Instagram @njalbrasil.',
  openGraph: {
    title: 'NJAL BRASIL — Forged For Champions',
    description: 'Não são apenas roupas. São armaduras de treino.',
    images: [asset('/assets/images/para-quem-e-a-njal.png')],
    locale: 'pt_BR',
    type: 'website',
  },
  icons: { icon: asset('/favicon.svg') },
};

export const viewport: Viewport = {
  themeColor: '#050506',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {/*
          As revelações nascem invisíveis e o JS as liga. Sem script, nada
          ligaria — então o conteúdo volta inteiro, sem gesto nenhum.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important;filter:none!important}`}</style>
        </noscript>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}

export const dynamic = 'force-static';
