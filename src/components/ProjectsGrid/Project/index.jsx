import './project.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { GithubLogo, LinkSimple } from 'phosphor-react';
import { useState, useEffect } from 'react';
import 'swiper/css';

const IMAGE_GLOBS = {
    cottom_films:    () => import.meta.glob('../../../assets/img/cottom_films/*.png'),
    ecommerce_custom: () => import.meta.glob('../../../assets/img/ecommerce_custom/*.jpeg'),
    rest_api:        () => import.meta.glob('../../../assets/img/rest_api/*.png'),
    lets_see:        () => import.meta.glob('../../../assets/img/lest_see/*.png'),
};

export default function Project(prop) {
    const [imgPaths, setImgPaths] = useState([]);

    useEffect(() => {
        const globFn = IMAGE_GLOBS[prop.paste];
        if (!globFn) return;

        const images = globFn();
        Promise.all(
            Object.keys(images).map(async (path) => {
                const mod = await images[path]();
                return mod.default;
            })
        ).then(setImgPaths);
    }, [prop.paste]);

    const hasLiveLink = prop.link_web && prop.link_web !== prop.link_git;

    return (
        <article className="project-item">
            <div className="project-meta">
                <span className="project-type">{prop.type}</span>
                <span className="project-date">{prop.date}</span>
            </div>

            <h3 className="project-title">{prop.title}</h3>

            {imgPaths.length > 0 && (
                <div className="work-item-img">
                    <Swiper key={prop.paste} spaceBetween={10} slidesPerView={1.4}>
                        {imgPaths.map((src, i) => (
                            <SwiperSlide key={i}>
                                <img src={src} alt={`${prop.title} screenshot ${i + 1}`} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}

            <p className="project-description">{prop.description}</p>

            {prop.stack?.length > 0 && (
                <div className="project-stack">
                    {prop.stack.map((tech) => (
                        <span key={tech} className="stack-tag">{tech}</span>
                    ))}
                </div>
            )}

            <div className="project-links">
                <a href={prop.link_git} target="_blank" rel="noopener noreferrer">
                    <GithubLogo size={18} />
                    <span>Código</span>
                </a>
                {hasLiveLink && (
                    <a href={prop.link_web} target="_blank" rel="noopener noreferrer">
                        <LinkSimple size={18} />
                        <span>Demo</span>
                    </a>
                )}
            </div>
        </article>
    );
}
