import "./component-styles/nav.css"

export default function HomeNav() {
    return (
        <nav className="nav">
            <a className="brand" href="#" aria-label="Edilson Zau"></a>
            <div className="nav-links">
                <a href="/#i">Home</a>
                <a href="/#experience">Experience</a>
                <a href="/#projects">Projects</a>
                <a href="/Edilson_Zau.pdf" target="_blank" id="resume">Resume</a>
                <select name="languages" value="english" id="language">
                    <option value="english" selected>🌐 Eng</option>
                    <option value="portuguese">🌐 Pt</option>
                </select>
            </div>
        </nav>
    )
}
