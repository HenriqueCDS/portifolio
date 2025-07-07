import IconSkill from "./IconSkill";
import './gridSkills.css';
import js from "../../assets/icon/js.png";
import c from "../../assets/icon/c.png";
import c_ from "../../assets/icon/C++.png";
import nodejs from "../../assets/icon/nodejs.png";
import expressjs from "../../assets/icon/express.png";
import react from "../../assets/icon/react.png";
import mongodb from "../../assets/icon/mongodb.png";
import php from "../../assets/icon/php.png";
import python from "../../assets/icon/python.png";
import java from "../../assets/icon/java.png"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import SkillsTable from "./Skills-Table";


export default function GridIconSkills(prop){
    return(
        <section id="grid-skils" className="grid-skils">
                <div className="container">
                    <div className="container-skils">
                        <Swiper key={prop.paste}
                                  spaceBetween={1}
                                  slidesPerView={8}
                                  loop={true}
                                  breakpoints={{
                                    300:{
                                        slidesPerView:4
                                    }
                                  }}
                                  autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                  }}
                                  >

                        <SwiperSlide > 
                        <IconSkill key="1" title = "Javascript"
                          icon={js}  /> 
                        </SwiperSlide>

                        
                        <SwiperSlide >  
                        <IconSkill key="2"  title = "C" 
                            icon={c} />
                        </SwiperSlide>  

                        <SwiperSlide>  
                        <IconSkill key="3" title = "C++" 
                            icon={c_} />
                        </SwiperSlide>

                        <SwiperSlide> 
                        <IconSkill key="4" title = "Node js" 
                            icon={nodejs} />
                        </SwiperSlide>

                        <SwiperSlide>
                        <IconSkill key="5" title = "React" 
                            icon={react} />
                        </SwiperSlide>

                        <SwiperSlide>
                        <IconSkill key="7" title = "PHP"
                            icon={php} />
                        </SwiperSlide>    

                        <SwiperSlide>
                        <IconSkill key="8" title = "Mongodb" 
                            icon={mongodb} />
                        </SwiperSlide>

                        <SwiperSlide>
                        <IconSkill key="9" title = "Express.js" 
                            icon={expressjs} />
                        </SwiperSlide>

                        <SwiperSlide>
                        
                        <IconSkill key="10" title = "Python" 
                            icon={python} />
                        </SwiperSlide>   

                        <SwiperSlide>
                        <IconSkill key="11" title = "Java"
                            icon={java} />
                        </SwiperSlide>   

                        </Swiper>

                       
                    </div>
                    <div className="skill-tables">
                         <SkillsTable />
                    </div>
                </div>


                          
                                  
                                         
        </section>
    )

}