import { Routes, Route, BrowserRouter } from 'react-router'
import Home from './pages/home'
import Hydro from './pages/projects/hydro'
import Sms from './pages/projects/sms'
import Jade from './pages/projects/jade'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/hydro" element={<Hydro />} />
        <Route path="/projects/sms" element={<Sms />} />
        <Route path="/projects/jade" element={<Jade />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
