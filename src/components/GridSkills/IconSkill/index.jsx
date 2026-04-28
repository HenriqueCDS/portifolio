import './IconSkill.css'
export default function IconSkill({ title, icon }) {
    return (
        <div className="skill">
            <div className='skill-icon'>
                <img src={icon} alt={title} />
            </div>
            <span className="skill-label">{title}</span>
        </div>
    )
}