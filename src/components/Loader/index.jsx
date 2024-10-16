import './loader.css'


import load from './imgLouder.jpg'
import { gsap } from "gsap";
import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';



export default function Loader() {

  gsap.registerPlugin(useGSAP);

  useGSAP(() => {

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
      delay: 6,
    });
    

   

  })



  var counterElement = useRef(null);

  var valor = 0


  function startLoader() {

    useEffect(() => {
      function updateCounter() {
        if (valor === 100) {
          animateText()
          return;
        }

        valor += Math.floor(Math.random() * 10) + 1
        valor = valor > 100 ? 100 : valor


        const htmlContent = valor
          .toString()
          .split("")
          .map((char) => `<span>${char}</span>`)
          .join("") + "<span>%</span>";

        if (counterElement.current) {
          counterElement.current.innerHTML = htmlContent;

        }


        var delay = Math.floor(Math.random() * 300) + 100;
        setTimeout(updateCounter, delay);


      }
      updateCounter()

    }, [])


    function animateText() {
      setTimeout(() => {
        gsap.to(".counter p span", {
          top: "-400px",
          stagger: 0.1,
          ease: "power3.inOut",
          duration: 1,
        });

        gsap.to(".overlay", {
          opacity: 0,
          ease: "power3.inOut",
          duration: 1,
          delay: 4,
          zIndex: -1
        });

     
      }, 100);
    }

  }
  startLoader();



  return (
    <>
      
        <div className='container-loader'>
            <div className="overlay">
            <div className="overlay-content">
            <div className="images">
                <div className="img-holder">
                <img src={load} alt="" />
                <img src={load} alt="" />
                <img src={load} alt="" />
                <img src={load} alt="" />
                <img src={load} alt="" />
                <img src={load} alt="" />
                <img src={load} alt="" />
                <img src={load} alt="" />
                <img src={load} alt="" />
                <img src={load} alt="" />
                
                </div>
            </div>
            <div className="text">
                <div className="counter" >
                <p ref={counterElement}></p>
                </div>
            </div>
                <div className='line'/>
                </div>
            </div>

        </div>
     
    </>
  )
}

