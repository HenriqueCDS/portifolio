import './loader.css';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

const CHARS = '1234567890ABCDEFSOUBOMNOLOLGHIJKLMNOPQRSTUVWXYZ!@#$%*?><';
const NAME_TOP = 'HENRIQUE';
const NAME_BOTTOM = 'CORDEIROツ';
const FRAMES_PER_CHAR = 2; // a cada N frames uma letra "trava" (~60 ms)
const START_DELAY_MS = 100;
const HOLD_MS = 300; // pausa com o nome completo antes de abrir os painéis
const EXIT_DURATION_S = 0.7;

export default function Loader({ onComplete }) {
  const topPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);
  const nameTopRef = useRef(null);
  const nameBottomRef = useRef(null);

  useEffect(() => {
    const topPanel = topPanelRef.current;
    const bottomPanel = bottomPanelRef.current;
    let exitTimer;
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
        if (frame % FRAMES_PER_CHAR === 0 && resolvedTop < NAME_TOP.length) resolvedTop++;
        render(NAME_TOP, resolvedTop, nameTopRef);
        if (resolvedTop >= NAME_TOP.length) {
          phase = 'bottom';
          frame = 0;
        }
      } else if (phase === 'bottom') {
        if (frame % FRAMES_PER_CHAR === 0 && resolvedBottom < NAME_BOTTOM.length) resolvedBottom++;
        render(NAME_BOTTOM, resolvedBottom, nameBottomRef);
        if (resolvedBottom >= NAME_BOTTOM.length) {
          exitTimer = setTimeout(exit, HOLD_MS);
          return;
        }
      }

      frameId = requestAnimationFrame(tick);
    };

    const exit = () => {
      gsap.to(topPanel, {
        y: '-100%',
        duration: EXIT_DURATION_S,
        ease: 'power4.inOut',
      });
      gsap.to(bottomPanel, {
        y: '100%',
        duration: EXIT_DURATION_S,
        ease: 'power4.inOut',
        onComplete: () => onComplete?.(),
      });
    };

    const startTimer = setTimeout(() => {
      frameId = requestAnimationFrame(tick);
    }, START_DELAY_MS);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(exitTimer);
      cancelAnimationFrame(frameId);
      gsap.killTweensOf([topPanel, bottomPanel]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- onComplete só precisa disparar uma vez, ao fim da animação de saída
  }, []);

  return (
    <div className="container-loader">
      <div className="gl-panel gl-panel-top" ref={topPanelRef}>
        <div className="gl-content gl-content-top">
          <span className="gl-label">{'// carregando portfolio'}</span>
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
