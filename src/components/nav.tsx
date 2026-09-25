import "./component-styles/nav.css"

export default function Nav() {
    return (
        <nav className="nav">
            <a className="brand" href="#" aria-label="Edilson Zau"></a>
            <div className="nav-links">
                <a href="#about">About</a>
                <a href="#projects">Projects</a>
                <a href="#contact">Contact</a>
                <a href="assets/Edilson_Zau.pdf" target="_blank" id="resume">Resume</a>

                <select name="languages" value="english" id="language">
                    <option value="english" selected>🌐 Eng</option>
                    <option value="portuguese">🌐 Pt</option>
                </select>
            </div>
        </nav>
    )
}
