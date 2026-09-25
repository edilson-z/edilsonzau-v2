import ClockWidget from './components/clockWidget'
import Experience from './components/experience'
import Footer from './components/footer'
import Header from './components/header'
import MapWidget from './components/mapWidget'
import Projects from './components/projects'
import Weather from './components/weather'
import WordleWidget from './components/wordleWidget'

function App() {

  return (
    <div className='shell'>
      <Header />
      <div className="cards">
        <Weather />
        <MapWidget />
        <ClockWidget />
        <WordleWidget />
      </div>
      <div id='experience'></div>
      <Experience />
      <Projects />
      <Footer />
    </div>
  )
}

export default App
