import './project.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
export default function Project(){
    return(
            <section class="projetct-item">
              <div><p>07 / 09</p></div>
              <div class="work-item-name">
                <p>FinTrack</p>
                <p>Web Design</p>
              </div>
              <div class="work-item-img">
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1.1}
                >
                  
                <SwiperSlide><img src="https://cdn.prod.website-files.com/6475df10614983200b234b6b/64b05b3f02f569b0aceef0db_1.1%20PT%20Thumb%207%20Tips%20API%20Rest.webp" alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://cdn.prod.website-files.com/6475df10614983200b234b6b/64b05b3f02f569b0aceef0db_1.1%20PT%20Thumb%207%20Tips%20API%20Rest.webp" alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://cdn.prod.website-files.com/6475df10614983200b234b6b/64b05b3f02f569b0aceef0db_1.1%20PT%20Thumb%207%20Tips%20API%20Rest.webp" alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://cdn.prod.website-files.com/6475df10614983200b234b6b/64b05b3f02f569b0aceef0db_1.1%20PT%20Thumb%207%20Tips%20API%20Rest.webp" alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://cdn.prod.website-files.com/6475df10614983200b234b6b/64b05b3f02f569b0aceef0db_1.1%20PT%20Thumb%207%20Tips%20API%20Rest.webp" alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://cdn.prod.website-files.com/6475df10614983200b234b6b/64b05b3f02f569b0aceef0db_1.1%20PT%20Thumb%207%20Tips%20API%20Rest.webp" alt="" /></SwiperSlide>
                
                </Swiper>
                
                
              </div>
              <div class="work-item-nav">
                <div class="work-item-desc">
                  <p>
                    Developed a powerful financial dashboard that provides users
                    with real-time insights into their financial health and
                    performance.
                  </p>
                </div>
                <div class="work-item-link">
                  <a href="#"></a>
                </div>
                </div>
              </section>
    )
}
