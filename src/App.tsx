import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import { useEffect } from "react";
import Decor from "./components/Decor";

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) {
      navigate('/login', { state: { from: location } });
    }
  }, [location, navigate])

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <Decor fill="#4073ff" position='70 60' />
      <Decor fill="#c026d3" position='56 80' />
      <Decor fill="#4073ff" position='140 110' />
      <Decor fill="#c026d3" position='150 90' />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </main>
  )
}

export default App
