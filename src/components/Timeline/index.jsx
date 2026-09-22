import './Timeline.css';
import { useTimelineReveal } from '../../hooks/useTimelineReveal';

// timeline vertical (linha "desenha" com o scroll + fade/slide por item),
// usada por Experience e Education — só os dados mudam entre as duas
export default function Timeline({ items }) {
    const scope = useTimelineReveal();

    return (
        <div className="timeline" ref={scope}>
            {items.map((item, i) => (
                <div key={i} className="timeline-item">
                    <div className="timeline-left">
                        <span className="timeline-period">{item.period}</span>
                        <span className="timeline-location">{item.location}</span>
                    </div>

                    <div className="timeline-connector">
                        <div className="timeline-dot" />
                        <div className="timeline-line" />
                    </div>

                    <div className="timeline-right">
                        <div className="timeline-role">
                            <h3>{item.heading}</h3>
                            <span className="timeline-company">{item.subheading}</span>
                        </div>

                        <ul className="timeline-bullets">
                            {item.bullets.map((b, j) => (
                                <li key={j}>{b}</li>
                            ))}
                        </ul>

                        <div className="timeline-stack">
                            {item.stack.map((tech) => (
                                <span key={tech} className="stack-tag">{tech}</span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
