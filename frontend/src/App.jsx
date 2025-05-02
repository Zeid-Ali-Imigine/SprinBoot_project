import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './home'
import './App.css'
import DashboardLayout from './Dashboard/layouts/DashboardLayout'
import Dashboard from './Dashboard/pages/Dashboard'
import Commandes from './Dashboard/pages/Commandes'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard/commandes" element={<Commandes />} />
        </Route>

      </Routes>
    </Router>
  )
}

export default App
