import './Navbar.css'
export default function Navbar(prop) {
    return(
      <nav>
        <div className='desktop'>
          <div className="nav-item "><a href="#banner">HOME</a></div>
          <div className="nav-item"><a href="#gridProjects">PROJECTS</a></div>
          <div className="nav-item"><a href="#grid-skils">SKILLS</a></div>
          <div className="nav-item"><a href="#footerContainer">CONTACT</a></div>
        </div>
       
      </nav>
      
    )
    
}