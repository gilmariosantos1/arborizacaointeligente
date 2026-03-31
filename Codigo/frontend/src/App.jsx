import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import SobreNos from './pages/SobreNos'
import Aplicativo from './pages/Aplicativo'
import Contato from './pages/Contato'
import Upload from './pages/Upload'
import RedefinirSenha from './pages/RedefinirSenha'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/sobre-nos" element={<SobreNos />} />
          <Route path="/aplicativo" element={<Aplicativo />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/redefinir-senha" element={<RedefinirSenha />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
