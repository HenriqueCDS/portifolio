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
      stagger: 0.03,
      ease: "power4.out",
      duration: 0.3,
      delay: 0.1,
    });

    gsap.to(".img-holder img", {
      left: "120%",
      stagger: -0.03,
      ease: "power4.out",
      duration: 0.3,
      delay: 0.5,
    });

    const updateCounter = () => {
      if (valorRef.current >= 100) {
        animateText();
        return;
      }

      valorRef.current += Math.floor(Math.random() * 15) + 8;
      if (valorRef.current > 100) valorRef.current = 100;

      const htmlContent = valorRef.current
        .toString()
        .split("")
        .map((char) => `<span>${char}</span>`)
        .join("") + "<span>%</span>";

      if (counterElement.current) {
        counterElement.current.innerHTML = htmlContent;
      }

      const delay = Math.floor(Math.random() * 30) + 20;
      setTimeout(updateCounter, delay);
    };

    const animateText = () => {
      setTimeout(() => {
        gsap.to(".counter p span", {
          top: "-400px",
          stagger: 0.03,
          ease: "power3.inOut",
          duration: 0.3,
        });

        gsap.to(".overlay", {
          opacity: 0,
          ease: "power3.inOut",
          duration: 0.4,
          delay: 0.2,
          zIndex: -1,
        });
      }, 50);
    };

    updateCounter();

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
