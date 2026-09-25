import "./component-styles/nav.css"
import { Link } from "react-router"

export default function Nav() {
    return (
        <nav className="nav">
            <a className="brand" href="#" aria-label="Edilson Zau"></a>
            <div className="nav-links">
                <Link to="/#i">Home</Link>
                <Link to="/#experience">Experience</Link>
                <Link to="/#projects">Projects</Link>
                <a href="/Edilson_Zau.pdf" target="_blank" id="resume">Resume</a>
                <select name="languages" value="english" id="language">
                    <option value="english" selected>🌐 Eng</option>
                    <option value="portuguese">🌐 Pt</option>
                </select>
            </div>
        </nav>
    )
}
