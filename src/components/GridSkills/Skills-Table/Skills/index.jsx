import "./skills.css";
export default function Skill({title, texts}) {
    return(
          <div className="skill-card">
            <div className="skill-title">
                <h3>{title}</h3>
            </div>
            <div className="skill-conteudo">
                {texts.map((text, index) => (
                    <p key={index} className="text-line"><span>---</span><span className="arrow-paste">\</span>  {text} </p>
                ))}
            </div>
        </div>
    )
    
}