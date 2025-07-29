import './loader.css';
import load from './imgLouder.png';
import { gsap } from "gsap";
import { useEffect, useRef } from 'react';

export default function Loader() {
  const counterElement = useRef(null);
  let valorRef = useRef(0); // Referência persistente, não causa re-render

  useEffect(() => {
    gsap.to(".img-holder img", {
      left: 0,
      stagger: 0.1,
      ease: "power4.out",
      duration: 1.5,
      delay: 3,
    });

    gsap.to(".img-holder img", {
      left: "120%",
      stagger: -0.1,
      ease: "power4.out",
      duration: 1.5,
      delay: 5,
    });

    const updateCounter = () => {
      if (valorRef.current >= 100) {
        animateText();
        return;
      }

      valorRef.current += Math.floor(Math.random() * 10) + 1;
      if (valorRef.current > 100) valorRef.current = 100;

      const htmlContent = valorRef.current
        .toString()
        .split("")
        .map((char) => `<span>${char}</span>`)
        .join("") + "<span>%</span>";

      if (counterElement.current) {
        counterElement.current.innerHTML = htmlContent;
      }

      const delay = Math.floor(Math.random() * 100) + 100;
      setTimeout(updateCounter, delay);
    };

    const animateText = () => {
      setTimeout(() => {
        gsap.to(".counter p span", {
          top: "-400px",
          stagger: 0.1,
          ease: "power3.inOut",
          duration: 1,
        });

        gsap.to(".overlay", {
          opacity: 1,
          ease: "power3.inOut",
          duration: 2,
          delay: 1,
          zIndex: -1,
        });
      }, 75);
    };

    updateCounter(); // inicia a contagem

  }, []);

  return (
    <div className='container-loader'>
      <div className="overlay">
        <div className="overlay-content">
          <div className="images">
            <div className="img-holder">
              {Array.from({ length: 10 }).map((_, i) => (
                <img key={i} src={load} alt="" />
              ))}
            </div>
          </div>
          <div className="text">
            <div className="counter">
              <p ref={counterElement}></p>
            </div>
          </div>
          <div className='line' />
        </div>
      </div>
    </div>
  );
}
