import { useState } from 'react';
import './skills-grade.css';

const SKILLS = [
    { category: "Linguagens",   items: ["Python", "Java", "TypeScript", "JavaScript"] },
    { category: "Dados & ETL",  items: ["Pandas", "SQL Server", "MySQL", "MongoDB", "SQLAlchemy"] },
    { category: "Backend",      items: ["Express.js", "Node.js", "Spring Boot", "REST API", "JWT"] },
    { category: "Integrações",  items: ["Canvas LMS", "Lyceum", "AWS S3", "Sequelize"] },
    { category: "Ferramentas",  items: ["Docker", "Git", "Linux", "VSCode", "Jupyter Notebook"] },
    { category: "Arquitetura",  items: ["MVC", "Microsserviços", "Client-Server", "SOA"] },
    { category: "Metodologias", items: ["Scrum", "Kanban", "TDD"] },
];

const CATEGORIES = ["All", ...SKILLS.map(s => s.category)];

export default function FilterableSkills() {
    const [active, setActive] = useState("All");

    const visibleSkills =
        active === "All"
            ? SKILLS.flatMap(s => s.items.map(item => ({ item, category: s.category })))
            : (SKILLS.find(s => s.category === active)?.items ?? []).map(item => ({ item, category: active }));

    return (
        <div className="filterable-skills">
            <div className="filter-bar">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        className={`filter-btn ${active === cat ? 'filter-btn--active' : ''}`}
                        onClick={() => setActive(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="skills-pills">
                {visibleSkills.map(({ item, category }) => (
                    <span key={`${active}-${category}-${item}`} className="skill-pill">
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}
