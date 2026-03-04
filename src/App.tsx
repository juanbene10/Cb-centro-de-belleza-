import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Turnos from './pages/Turnos'
import Tienda from './pages/Tienda'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/turnos" element={<Turnos />} />
        <Route path="/tienda" element={<Tienda />} />
      </Routes>
    </Layout>
  )
}

