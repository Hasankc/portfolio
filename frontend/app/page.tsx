// page.tsx — root page, assembles all sections in order
// To inspect in DevTools: look for data-page="home"
import { Navbar }     from '@/components/Navbar';
import { Hero }       from '@/components/sections/Hero';
import { About }      from '@/components/sections/About';
import { Skills }     from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Projects }   from '@/components/sections/Projects';
import { AiChat }     from '@/components/sections/AiChat';
import { Contact }    from '@/components/sections/Contact';
import { Footer }     from '@/components/Footer';

export default function Home() {
  return (
    <div id="app-root" data-page="home">
      <Navbar />
      <main id="main-content" role="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <AiChat />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
