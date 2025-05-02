import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './home'
import './App.css'
import DashboardLayout from './Dashboard/layouts/DashboardLayout'
import Dashboard from './Dashboard/pages/Dashboard'
import Commandes from './Dashboard/pages/Commandes'
import Utilisateurs from './Dashboard/pages/Utilisateurs'
import Produits from './Dashboard/pages/Produits'
import ProduitForm from './Dashboard/components/Forms/ProduitForm'
import Categories from './Dashboard/pages/Categories'
import CategorieForm from './Dashboard/components/Forms/CategorieForm'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard/commandes" element={<Commandes />} />
            <Route path="/dashboard/utilisateurs" element={<Utilisateurs />} />
            <Route path="/dashboard/produits" element={<Produits />} />
            <Route path="/dashboard/produits/ajouter" element={<ProduitForm />} />
            <Route path="/dashboard/produits/modifier/:id" element={<ProduitForm />} />

            
            
            <Route path="/dashboard/categories" element={<Categories />} />
            <Route path="/dashboard/categories/ajouter" element={<CategorieForm />} />
            <Route path="/dashboard/categories/modifier/:id" element={<CategorieForm />} />
        </Route>

      </Routes>
    </Router>
  )
}

export default App
