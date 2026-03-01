import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const cursor = cursorRef.current;

    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let raf;

    const moveDot = (e) => {
      dotX = e.clientX;
      dotY = e.clientY;
      dot.style.left = `${dotX}px`;
      dot.style.top = `${dotY}px`;
    };

    const animateRing = () => {
      ringX += (dotX - ringX) * 0.13;
      ringY += (dotY - ringY) * 0.13;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      raf = requestAnimationFrame(animateRing);
    };

    // Use event delegation on the document
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [data-hover]')) {
        cursor.classList.add('cursor--hover');
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, [data-hover]')) {
        cursor.classList.remove('cursor--hover');
      }
    };

    window.addEventListener('mousemove', moveDot);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    raf = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', moveDot);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={cursorRef} className="cursor">
      <div ref={dotRef} className="cursor__dot" />
      <div ref={ringRef} className="cursor__ring" />
    </div>
  );
}
