import {Link} from "react-router-dom"


function NavBar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/projects">Projects</Link></li>
                <li><Link to="/skills">Skills</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/singup">Sing Up</Link></li>
                <li><Link to="/LogIn">Log IN</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;