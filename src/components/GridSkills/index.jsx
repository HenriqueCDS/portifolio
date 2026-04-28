import IconSkill from "./IconSkill";
import './gridSkills.css';
import js from "../../assets/icon/js.png";
import nodejs from "../../assets/icon/nodejs.png";
import expressjs from "../../assets/icon/express.png";
import react from "../../assets/icon/react.png";
import mongodb from "../../assets/icon/mongodb.png";
import python from "../../assets/icon/python.png";
import java from "../../assets/icon/java.png";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import SkillsTable from "./Skills-Table";
import 'swiper/css';
import 'swiper/css/autoplay';

export default function GridIconSkills(prop) {
    return (
        <section id="grid-skils" className="grid-skils">
            <div className="container">
                <div className="skills-header">
                    <span className="section-tag">// skills</span>
                    <h2>Stack Técnica</h2>
                </div>

                <div className="container-skils">
                    <Swiper
                        key={prop.paste}
                        spaceBetween={0}
                        slidesPerView={7}
                        loop={true}
                        speed={600}
                        breakpoints={{
                            300: { slidesPerView: 4 },
                            768: { slidesPerView: 5 },
                        }}
                        autoplay={{
                            delay: 1800,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                    >
                        <SwiperSlide>
                            <IconSkill title="Python" icon={python} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <IconSkill title="Java" icon={java} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <IconSkill title="JavaScript" icon={js} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <IconSkill title="Node.js" icon={nodejs} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <IconSkill title="Express.js" icon={expressjs} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <IconSkill title="React" icon={react} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <IconSkill title="MongoDB" icon={mongodb} />
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
