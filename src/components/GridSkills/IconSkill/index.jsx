import { FileJs, Database } from 'phosphor-react'
import './IconSkill.css'
export default function IconSkill(prop) {
    return(
        <>
            <div className="skill"> 
                <div className='skill-icon'>
                    <img src={prop.icon} /> 
                </div>   
            </div>
        </>
    )
}