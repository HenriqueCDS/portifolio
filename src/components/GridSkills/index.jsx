import Skill from "./Skill";
import './gridSkills.css';
import js from "../../assets/icon/js.png";
import c from "../../assets/icon/c.png";
import c_ from "../../assets/icon/C++.png";
import nodejs from "../../assets/icon/nodejs.png";
import react from "../../assets/icon/react.png";
import mongodb from "../../assets/icon/mongodb.png";
    

export default function GridSkills(prop){

    return(
        <section className="grid-skils">
                <div className="container">
                    <div className="container-skils">
                        <Skill key="1" title = "Javascript" 
                         descris ="JavaScript é uma linguagem de programação interpretada estruturada, de script em alto nível com tipagem dinâmica fraca e multiparadigma. Juntamente com HTML e CSS, o JavaScript é uma das três principais tecnologias da World Wide Web." 
                        icon={js}  />
                        <Skill key="2" title = "test" descris ="Teste test testtetste" icon={c} />
                        <Skill key="3" title = "test" descris="Teste test testtetste" icon={c} />
                        <Skill key="4" title = "test" descris ="Teste test testtetste" icon={nodejs} />
                        <Skill key="5" title = "test" descris ="Teste test testtetste" icon={react} />
                        <Skill key="6" title = "test" descris="Teste test testtetste" icon={c_} />
                        <Skill key="7" title = "test" descris ="Teste test testtetste" icon={js} />
                        <Skill key="8" title = "test" descris ="Teste test testtetste" icon={js} />
                        <Skill key="9" title = "test" descris="Teste test testtetste"icon={js} />
                        <Skill key="10" title = "test" descris ="Teste test testtetste" icon={js} />
                        <Skill key="11" title = "test" descris ="Teste test testtetste" icon={js} />
                        <Skill key="12" title = "test" descris="Teste test testtetste"icon={js} />
                    </div>
                </div>
        </section>
    )

}