import Project from "./Project";
import "./gridProject.css";

export default function GridProjects(prop) {
    return(
        <section className="gridProjects">
            <div className="container">
                <div className="Projects">
                    <Project 
                        key="cottom_films"  
                        date='07/05/2024' 
                        title="Cottom Films" 
                        type="WEB" 
                        link_git="https://github.com/HenriqueCDS/Cotton_Films_Website" 
                        link_web="https://cotton-films-website-usbq.vercel.app/" 
                        paste="cottom_films"
                        description="Developed a powerful financial dashboard that provides users with real-time insights into their financial health and performance"
                    />
                    <Project 
                        key="lets_see" 
                        date='07/10/2024' 
                        title="Lets See" 
                        type="REST API"   
                        link_git="https://github.com/HenriqueCDS/Cotton_Films_Website" 
                        link_web="https://cotton-films-website-usbq.vercel.app/" 
                        paste="lets_see"
                        description="Developed a powerful financial dashboard that provides users with real-time insights into their financial health and performance"
                    />
                    <Project  
                        key="rest_api" 
                        date='07/10/2024' 
                        title="Rest Api questoes" 
                        type="REST API"   
                        link_git="https://github.com/HenriqueCDS/Cotton_Films_Website" 
                        link_web="https://cotton-films-website-usbq.vercel.app/" 
                        paste="rest_api"
                        description="Developed a powerful financial dashboard that provides users with real-time insights into their financial health and performance"
                    />
                    
                 
                </div>
            </div>
        </section>
    );
}
