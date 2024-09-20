import './project.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import {  GithubLogo,LinkSimple } from 'phosphor-react';

import { useState, useEffect } from 'react';
import 'swiper/css';



export default function ImageGallery(prop) {
  const [imgPaths, setImgPaths] = useState([]);
  const images = import.meta.glob('../../../assets/img/cottom_films/*.png');

  useEffect(() => {
    async function loadImages() {
      const loadedImages = await Promise.all(
        Object.keys(images).map(async (path) => {
          const module = await images[path]();
          return module.default; 
        })
      );
      setImgPaths(loadedImages);
    }

    loadImages();
  }, []);

return(
            <section class="project-item">
              <div><p>{prop.date}</p></div>
              <div class="work-item-name">
                <p>{prop.tilte}</p>
                <p>{prop.type}</p>
              </div>
              <div class="work-item-img">
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1.5}
                >
                  {imgPaths.map((imgSrc, index) => (
                     <SwiperSlide><img key={index} src={imgSrc} alt={`Image ${index + 1}`} /></SwiperSlide>
                  ))}
                         
                </Swiper>           
              </div>
              <div class="work-item-nav">
                <div class="work-item-desc">
                  <p>
                    {prop.descris}
                
                  </p>
                </div>
                <div class="work-item-link">
                  <a href={prop.link_git} target="_blank"><GithubLogo /></a>
                  <a href={prop.link_web} target="_blank"><LinkSimple  /> </a>        
                  </div>
                </div>
              </section>
    )
}
