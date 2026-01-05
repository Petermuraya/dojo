import Hero from '../components/Hero';
import Ranks from '../components/Ranks';
import Locations from '../components/Locations';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <Ranks />
      <Locations />
      <Testimonials />
      <CTA />
    </main>
  );
}
