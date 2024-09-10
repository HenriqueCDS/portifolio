import './Navbar.css'
export default function Navbar(prop) {
    return(
      <nav>
        <div className="nav-item "><a href="index.html">Home</a></div>
        <div className="nav-item"><a href="./pages/about.html">About</a></div>
        <div className="nav-item"><a href="./pages/work.html">Projects</a></div>
        <div className="nav-item"><a href="./pages/awards.html">Awards</a></div>
        <div className="nav-item"><a href="./pages/contact.html">Contact</a></div>
      </nav>
    )
    
}