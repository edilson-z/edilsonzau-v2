import { Link } from 'react-router'
import './component-styles/Projects.css'

export default function Projects() {
    return (
        <div>
            <h2>Projects</h2>
            <div className="project-cards">
                <Link to="/projects/hydro" style={{ all: 'unset', cursor: 'pointer' }}>
                    <div className="project-card">
                        <img src='./hydro.png' />
                        <div className='project-card-container'>
                            <h3>Hydroponics AI & IoT Control Unit</h3>
                            <p>An AI and IoT-powered hydroponic control system using NFT and a Random Forest Classifier to monitor and optimise hydroponics variables in real time.</p>
                            <span className="project-tag">Java</span>
                            <span className="project-tag">Kotlin</span>
                            <span className="project-tag">Spring</span>
                            <span className="project-tag">Arduino</span>
                            <span className="project-tag">Python</span>
                            <span className="project-tag">RFC</span>
                            <span className="project-tag">React Native</span>
                            <span className="project-tag">MongoDB</span>
                        </div>
                    </div>
                </Link>
                <Link to="/projects/sms" style={{ all: 'unset', cursor: 'pointer' }}>
                    <div className="project-card">
                        <img src='./last.png' />
                        <div className='project-card-container'>
                            <h3>SMS Chatbot For Data Collection</h3>
                            <p>An offline-capable SMS chatbot that enables rural farmers to report crop yields, pest outbreaks, and market trends using feature phones.</p>
                            <span className="project-tag">Python</span>
                            <span className="project-tag">Flask</span>
                            <span className="project-tag">OpenAI</span>
                            <span className="project-tag">Twillio</span>
                            <span className="project-tag">MongoDB</span>
                            <span className="project-tag">NumPy</span>
                            <span className="project-tag">Pandas</span>
                            <span className="project-tag">Jupyter</span>
                            <span className="project-tag">Git</span>
                            <span className="project-tag">NGROK</span>
                        </div>
                    </div>
                </Link>
                <Link to="/projects/sms" style={{ all: 'unset', cursor: 'pointer' }}>
                    <div className="project-card">
                        <img src='./last.png' />
                        <div className='project-card-container'>
                            <h3>SMS Chatbot For Data Collection</h3>
                            <p>An offline-capable SMS chatbot that enables rural farmers to report crop yields, pest outbreaks, and market trends using feature phones.</p>
                            <span className="project-tag">Python</span>
                            <span className="project-tag">Flask</span>
                            <span className="project-tag">OpenAI</span>
                            <span className="project-tag">Twillio</span>
                            <span className="project-tag">MongoDB</span>
                            <span className="project-tag">NumPy</span>
                            <span className="project-tag">Pandas</span>
                            <span className="project-tag">Jupyter</span>
                            <span className="project-tag">Git</span>
                            <span className="project-tag">NGROK</span>
                        </div>
                    </div>
                </Link>
                <Link to="/projects/jade" style={{ all: 'unset', cursor: 'pointer' }}>
                    <div className="project-card">
                        <img src='./jade-3.png' />
                        <div className='project-card-container'>
                            <h3>Jade Garden Digital Menu</h3>
                            <p>A lightweight, mobile-first e-commerce platform that digitises in-dining ordering through table-specific QR codes.</p>
                            <span className="project-tag">Next.js</span>
                            <span className="project-tag">React.js</span>
                            <span className="project-tag">Node.js</span>
                            <span className="project-tag">Javascript</span>
                            <span className="project-tag">JSON</span>
                            <span className="project-tag">GIT</span>
                            <span className="project-tag">Vercel</span>
                        </div>
                    </div>
                </Link>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}
