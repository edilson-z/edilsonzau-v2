import ClockWidget from '../components/clockWidget'
import Experience from '../components/experience'
import Footer from '../components/footer'
import Header from '../components/header'
import MapWidget from '../components/mapWidget'
import Nav from '../components/nav'
import Projects from '../components/projects'
import Weather from '../components/weather'
import WordleWidget from '../components/wordleWidget'

export default function home() {
    return (
        <div className='shell'>
            {/* <Nav /> */}
            <section id='i'>
                <Header />
            </section>
            <div className="cards">
                <Weather />
                <MapWidget />
                <ClockWidget />
                <WordleWidget />
            </div>
            <section id='experience'>
                <Experience />
            </section>
            <section id='projects'>
                <Projects />
            </section>
            <Footer />
        </div>
    )
}
