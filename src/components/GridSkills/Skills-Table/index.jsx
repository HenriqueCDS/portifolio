import Skill from "./Skills";
import "./skills-grade.css"
export default function SkillsTable(){
    return(
        <section className="skills-grade">
            <Skill title = "Linguagens" texts ={["TypeScript","Javascript","Java","Pyhton", ]} />
            <Skill title = "Databases" texts ={["MySql","Microsoft SQL Server","Mongodb" ]}  />
            <Skill title = "FrameWorks" texts ={["React","Express js","Next js","SpringBoot" ]} />
            <Skill title = "Ferramentas" texts ={["Linux","Docker","Figma","Git","vscode","Eclipse" ]} />
            <Skill title = "Outros" texts ={["Scrum","Java","Pyhton" ]} />

        </section>
    )

}