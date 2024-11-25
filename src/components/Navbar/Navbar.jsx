import './Navbar.css'
export default function Navbar(prop) {
    return(
      <nav>
        <div className='desktop'>
          <div className="nav-item "><a href="#container-banner">HOME</a></div>
          <div className="nav-item"><a href="./pages/about.html">ABOUT</a></div>
          <div className="nav-item"><a href="./pages/work.html">PROJECTS</a></div>
          <div className="nav-item"><a href="./pages/awards.html">SKILLS</a></div>
          <div className="nav-item"><a href="./pages/contact.html">CONTACT</a></div>
        </div>
       
      </nav>
      
    )
    
}