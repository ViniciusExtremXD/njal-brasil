import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { DROPS, getDrop } from '@/data/drops';
import { DropView } from '@/components/sections/DropView';

export function generateStaticParams() {
  return DROPS.map((drop) => ({ slug: drop.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const drop = getDrop(slug);
  if (!drop) return { title: 'Drop não encontrado — NJAL BRASIL' };

  return {
    title: `${drop.name} — NJAL BRASIL`,
    description: drop.battlecry,
    openGraph: { title: `${drop.name} — NJAL`, description: drop.story, images: [drop.image] },
  };
}

export default async function DropPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const drop = getDrop(slug);
  if (!drop) notFound();

  const others = DROPS.filter((d) => d.slug !== drop.slug).slice(0, 3);

  return <DropView drop={drop} others={others} />;
}
