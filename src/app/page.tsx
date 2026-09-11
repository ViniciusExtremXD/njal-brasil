import { Hero } from '@/components/sections/Hero';
import { Arsenal } from '@/components/sections/Arsenal';
import { Manifesto } from '@/components/sections/Manifesto';
import { Legado } from '@/components/sections/Legado';
import { Comunidade } from '@/components/sections/Comunidade';
import { Forja } from '@/components/sections/Forja';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Arsenal />
      <Manifesto />
      <Legado />
      <Comunidade />
      <Forja />
      <Footer />
    </main>
  );
}
