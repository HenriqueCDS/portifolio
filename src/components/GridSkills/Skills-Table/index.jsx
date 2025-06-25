import Skill from "./Skills";
import "./skills-grade.css"
export default function SkillsTable(){
    return(
        <section className="skills-grade">
            <Skill title = "Linguagens" texts ={["TypeScript","Javascript","Java","Pyhton", ]} />
            <Skill title = "Databases" texts ={["MySql","Microsoft SQL Server","Mongodb" ]}  />
            <Skill title = "Frameworks" texts ={["React","Express js","Next js","SpringBoot" ]} />
            <Skill title = "Ferramenta" texts ={["Linux","Docker","Figma","Git","VScode","Eclipse" ]} />
            <Skill title = "Outros" texts ={["Scrum","Solid","MVC" ]} />

        </section>
    )

}