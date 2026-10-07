import { Routes, Route, BrowserRouter } from 'react-router'
import Home from './pages/home'
import Hydro from './pages/projects/hydro'
import Sms from './pages/projects/sms'
import Jade from './pages/projects/jade'
import ScrollToHash from './components/scrollToHash'
import Finance from './pages/projects/finance'

function App() {

  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/hydro" element={<Hydro />} />
        <Route path="/projects/sms" element={<Sms />} />
        <Route path="/projects/jade" element={<Jade />} />
        <Route path="/projects/finance" element={<Finance />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
