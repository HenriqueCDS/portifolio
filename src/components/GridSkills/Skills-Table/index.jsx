import Skill from "./Skills";
import "./skills-grade.css"

export default function SkillsTable() {
    return (
        <section className="skills-grade">
            <Skill title="Linguagens" texts={["Python", "Java", "TypeScript", "JavaScript"]} />
            <Skill title="Dados & ETL" texts={["Pandas", "SQL Server", "MySQL", "MongoDB", "SQLAlchemy"]} />
            <Skill title="Backend" texts={["Express.js", "Node.js", "Spring Boot", "REST API", "JWT"]} />
            <Skill title="Integrações" texts={["Canvas LMS", "Lyceum", "AWS S3", "Sequelize"]} />
            <Skill title="Ferramentas" texts={["Docker", "Git", "Linux", "VSCode", "Jupyter Notebook"]} />
            <Skill title="Arquitetura" texts={["MVC", "Microsserviços", "Client-Server", "SOA"]} />
            <Skill title="Metodologias" texts={["Scrum", "Kanban", "TDD"]} />
        </section>
    )
}
