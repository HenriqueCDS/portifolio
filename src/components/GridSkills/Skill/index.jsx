import { FileJs, Database } from 'phosphor-react'
import './skill.css'
export default function Skill(prop) {
    return(
        <>
            <div className="skill"> 
                <p>{prop.title}</p>
                <p>{prop.descris}</p>
                <p>&mdash;</p> 
            </div>
        </>
    )
}