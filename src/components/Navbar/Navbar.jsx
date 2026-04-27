import './Navbar.css'
export default function Navbar() {
    return (
        <nav>
            <div className='desktop'>
                <div className="nav-item"><a href="#banner">HOME</a></div>
                <div className="nav-item"><a href="#about">SOBRE</a></div>
                <div className="nav-item"><a href="#experience">EXPERIÊNCIA</a></div>
                <div className="nav-item"><a href="#education">FORMAÇÃO</a></div>
                <div className="nav-item"><a href="#gridProjects">PROJETOS</a></div>
                <div className="nav-item"><a href="#grid-skils">SKILLS</a></div>
                <div className="nav-item"><a href="#footerContainer">CONTATO</a></div>
            </div>
        </nav>
    )
}
