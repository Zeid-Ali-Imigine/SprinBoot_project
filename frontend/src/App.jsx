import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import DashboardLayout from './Dashboard/layouts/DashboardLayout';
import Dashboard from './Dashboard/pages/Dashboard';
import Commandes from './Dashboard/pages/Commandes';
import Produits from './Produits'; // ✅ Remplace CommandeProduit par Produits

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Page d'accueil : liste des produits sous forme de cards */}
        <Route path="/" element={<Produits />} />

        {/* ✅ Tableau de bord */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/commandes" element={<Commandes />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
