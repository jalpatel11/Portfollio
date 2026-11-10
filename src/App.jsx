import { useLayoutEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import OpenSource from './components/OpenSource';
import Education from './components/Education';
import Recommendation from './components/Recommendation';
import Contact from './components/Contact';

function App() {
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <OpenSource />
        <Education />
        <Recommendation />
        <Contact />
      </main>
    </ThemeProvider>
  );
}

export default App;
