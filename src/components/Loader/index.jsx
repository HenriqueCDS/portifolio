import './loader.css';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

const CHARS = '1234567890ABCDEFSOUBOMNOLOLGHIJKLMNOPQRSTUVWXYZ!@#$%*?><';
const NAME_TOP = 'HENRIQUE';
const NAME_BOTTOM = 'CORDEIROツ';

export default function Loader({ onComplete }) {
  const topPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);
  const nameTopRef = useRef(null);
  const nameBottomRef = useRef(null);

  useEffect(() => {
    let frameId;
    let resolvedTop = 0;
    let resolvedBottom = 0;
    let frame = 0;
    let phase = 'top';

    const render = (name, resolved, ref) => {
      if (!ref.current) return;
      ref.current.innerHTML = name
        .split('')
        .map((char, i) =>
          i < resolved
            ? `<span class="gl-locked">${char}</span>`
            : `<span class="gl-scramble">${CHARS[Math.floor(Math.random() * CHARS.length)]}</span>`
        )
        .join('');
    };

    const tick = () => {
      frame++;

      if (phase === 'top') {
        if (frame % 4 === 0 && resolvedTop < NAME_TOP.length) resolvedTop++;
        render(NAME_TOP, resolvedTop, nameTopRef);
        if (resolvedTop >= NAME_TOP.length) {
          phase = 'bottom';
          frame = 0;
        }
      } else if (phase === 'bottom') {
        if (frame % 4 === 0 && resolvedBottom < NAME_BOTTOM.length) resolvedBottom++;
        render(NAME_BOTTOM, resolvedBottom, nameBottomRef);
        if (resolvedBottom >= NAME_BOTTOM.length) {
          setTimeout(exit, 700);
          return;
        }
      }

      frameId = requestAnimationFrame(tick);
    };

    const exit = () => {
      gsap.to(topPanelRef.current, {
        y: '-100%',
        duration: 1.1,
        ease: 'power4.inOut',
      });
      gsap.to(bottomPanelRef.current, {
        y: '100%',
        duration: 1.1,
        ease: 'power4.inOut',
        onComplete: () => onComplete?.(),
      });
    };

    setTimeout(() => {
      frameId = requestAnimationFrame(tick);
    }, 300);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="container-loader">
      <div className="gl-panel gl-panel-top" ref={topPanelRef}>
        <div className="gl-content gl-content-top">
          <span className="gl-label">// carregando portfolio</span>
          <div className="gl-name" ref={nameTopRef}>HENRIQUE</div>
        </div>
      </div>
      <div className="gl-panel gl-panel-bottom" ref={bottomPanelRef}>
        <div className="gl-content gl-content-bottom">
          <div className="gl-name" ref={nameBottomRef}>CORDEIRO ツ</div>
          <span className="gl-label">frontend &amp; backend &amp; dados</span>
        </div>
      </div>
    </div>
  );
}
