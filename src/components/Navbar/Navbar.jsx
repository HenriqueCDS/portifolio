import './Navbar.css'
export default function Navbar(prop) {
    return(
      <nav>
        <div className="nav-item "><a href="index.html">HOME</a></div>
        <div className="nav-item"><a href="./pages/about.html">ABOUT</a></div>
        <div className="nav-item"><a href="./pages/work.html">PROJECTS</a></div>
        <div className="nav-item"><a href="./pages/awards.html">SKILLS</a></div>
        <div className="nav-item"><a href="./pages/contact.html">CONTACT</a></div>
      </nav>
    )
    
}