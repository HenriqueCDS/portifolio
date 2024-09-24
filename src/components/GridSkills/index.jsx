import Skill from "./Skill";
import './gridSkills.css'
export default function GridSkills(prop){

    return(
        <section className="grid-skils">
                <div className="container">
                    <div className="container-skils">
                        <Skill key="1" title = "Javascript" descris ="Teste test testtetste" />
                        <Skill key="2" title = "test" descris ="Teste test testtetste" />
                        <Skill key="3" title = "test" descris="Teste test testtetste"/>
                        <Skill key="4" title = "test" descris ="Teste test testtetste" />
                        <Skill key="5" title = "test" descris ="Teste test testtetste" />
                        <Skill key="6" title = "test" descris="Teste test testtetste"/>
                        <Skill key="7" title = "test" descris ="Teste test testtetste" />
                        <Skill key="8" title = "test" descris ="Teste test testtetste" />
                        <Skill key="9" title = "test" descris="Teste test testtetste"/>
                        <Skill key="10" title = "test" descris ="Teste test testtetste" />
                        <Skill key="11" title = "test" descris ="Teste test testtetste" />
                        <Skill key="12" title = "test" descris="Teste test testtetste"/>
                    </div>
                </div>
        </section>
    )

}