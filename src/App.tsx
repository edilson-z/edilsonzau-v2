import { Routes, Route, BrowserRouter } from 'react-router'
import Home from './pages/home'
import Hydro from './pages/projects/hydro'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/hydro" element={<Hydro />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
