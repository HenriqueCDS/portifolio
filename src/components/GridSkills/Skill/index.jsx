import { FileJs, Database } from 'phosphor-react'
import './skill.css'
export default function Skill(prop) {
    return(
        <>
            <div className="skill"> 
                <p>{prop.title}</p>
                <p>{prop.descris}</p>
                <div className='skill-icon'>
                    <p>&mdash;</p> 
                    <img src={ prop.icon} /> 
                </div>
              
            </div>
        </>
    )
}