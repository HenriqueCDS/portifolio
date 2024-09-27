import './project.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import {  GithubLogo,LinkSimple } from 'phosphor-react';

import { useState, useEffect } from 'react';
import 'swiper/css';

export default function Project(prop) {
  const [imgPaths, setImgPaths] = useState([]);
  let images = []
  if(prop.paste == "cottom_films"){
    images = import.meta.glob('../../../assets/img/cottom_films/*.png');
  }
  if(prop.paste == "ecommerce_custom"){
    images = import.meta.glob('../../../assets/img/ecommerce_custom/*.jpeg');
  }
  if(prop.paste == "rest_api"){
    images = import.meta.glob('../../../assets/img/rest_api/*.png');
  }
  if(prop.paste == "lets_see"){
    images = import.meta.glob('../../../assets/img/lest_see/*.png');
  }
 

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
            <section className="project-item">
              <div><p>{prop.date}</p></div>
              <div className="work-item-name">
                <p> {prop.title} ------------------------------------------</p>
                <p>{prop.type}</p>
              </div>
              <div className="work-item-img">
                <Swiper key={prop.paste}
                  spaceBetween={10}
                  slidesPerView={1.5}
                >
                  {imgPaths.map((imgSrc, index) => (
                     <SwiperSlide  key={index}><img key={index} src={imgSrc} alt={`Image ${index + 1}`} /></SwiperSlide>
                  ))}
                         
                </Swiper>           
              </div>
              <div className="work-item-nav">
                <div className="work-item-desc">
                  <p>
                    {prop.title}
                
                  </p>
                </div>
                <div className="work-item-link">
                  <a href={prop.link_git} target="_blank"><GithubLogo /></a>
                  <a href={prop.link_web} target="_blank"><LinkSimple  /> </a>        
                  </div>
                </div>
              </section>
    )
}
