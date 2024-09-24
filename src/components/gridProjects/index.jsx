import Project from "./Project";
import "./gridProject.css"
export default function GridProjects(prop) {
    return(
        <section className="gridProjects">
            <div className="container">
                <div className="Projects">
                    <Project key="Cottom Films"  date='07/05/2024' tilte ="Cottom Films" type = "WEB" link_git="https://github.com/HenriqueCDS/Cotton_Films_Website" link_web="https://cotton-films-website-usbq.vercel.app/" paste="cottom_films"
                    descris= "Developed a powerful financial dashboard that provides users with real-time insights into their financial health and performance"/>
                    
                    <Project  key="Rest Api questoes" date='07/10' tilte = "Rest Api questoes" type = "REST API"   link_git="https://github.com/HenriqueCDS/Cotton_Films_Website" link_web="https://cotton-films-website-usbq.vercel.app/" paste="rest_api"
                    descris= "Developed a powerful financial dashboard that provides users with real-time insights into their financial health and performance"/>
                    

                    <Project key="lets_see" date='07/10' tilte = "Rest Api questoes" type = "REST API"   link_git="https://github.com/HenriqueCDS/Cotton_Films_Website" link_web="https://cotton-films-website-usbq.vercel.app/" paste="lest_see"
                    descris= "Developed a powerful financial dashboard that provides users with real-time insights into their financial health and performance"/>
                </div>
            </div>
        </section>
    )
    
}