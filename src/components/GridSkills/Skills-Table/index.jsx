import Skill from "./Skills";
import "./skills-grade.css"
export default function SkillsTable(){
    return(
        <section className="skills-grade">
            <Skill title = "Linguagens" texts ={["TypeScript","Javascript","Java","Pyhton", ]} />
            <Skill title = "Databases" texts ={["MySql","Microsoft SQL Server","Mongodb" ]}  />
            <Skill title = "Frameworks" texts ={["React","Express js","Next js","SpringBoot" ]} />
            <Skill title = "Ferramentas" texts ={["Linux","Docker","Figma","Git","VScode","Eclipse" ]} />
            <Skill title = "Arquitetura de Software" texts ={["MVC","Microsserviços","SOA","Client-Server","Monolítica" ]} />
            <Skill title = "Metodologias ágeis" texts ={["Scrum","Kanban","Test Driven Development (TDD)" ]} />

        </section>
    )

}