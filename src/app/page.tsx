import { Categories } from '@/categories/categories';
import { Container } from '@/common/container';
import { Hero } from '@/common/hero';
import { getMetadata } from '@/seo/seo-utils';

export const metadata = getMetadata({ title: 'Home', pathname: '/' });

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <Container maxWidth="xl" className="p-4 py-12">
        <h2 className="text-center text-2xl text-primary font-bold mb-5">Catégories</h2>
        <Categories />
      </Container>
    </main>
  );
}
