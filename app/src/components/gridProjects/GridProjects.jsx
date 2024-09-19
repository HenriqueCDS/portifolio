import Project from "./project.jsx/project";
import "./gridProject.css"
export default function GridProjects(prop) {

    return(
        <section className="gridProjects">
            <div className="container">
                <div className="Projects">
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                </div>
            </div>
        </section>
    )
    
}