import Project from "./project.jsx/project";
import "./gridProject.css"
import { DotsThreeCircle } from "phosphor-react";
export default function GridProjects() {

    return(
        <section className="gridProjects">
            <div className="container">
                <div className="Projects">
                    <Project date='07/05/2024' tilte ="Cottom Films" type = "WEB" link_git="https://github.com/HenriqueCDS/Cotton_Films_Website" link_web="https://cotton-films-website-usbq.vercel.app/" paste="cottom_films"
                    descris= "Developed a powerful financial dashboard that provides users with real-time insights into their financial health and performance"/>
                    
                    <Project date='07/10' tilte = "Rest Api questoes" type = "REST API"   link_git="https://github.com/HenriqueCDS/Cotton_Films_Website" link_web="https://cotton-films-website-usbq.vercel.app/" paste="rest_api"
                    descris= "Developed a powerful financial dashboard that provides users with real-time insights into their financial health and performance"/>
                    
                    <Project date='07/10' tilte = "Rest Api questoes" type = "API"
                    descris= "Developed a powerful financial dashboard that provides users with real-time insights into their financial health and performance"/>

                    <Project date='07/10' tilte = "Rest Api questoes" type = "API"
                    descris= "Developed a powerful financial dashboard that provides users with real-time insights into their financial health and performance"/>
                  
                    <Project date='07/10' tilte = "Rest Api questoes" type = "API"
                    descris= "Developed a powerful financial dashboard that provides users with real-time insights into their financial health and performance"/>
                </div>
            </div>
        </section>
    )
    
}