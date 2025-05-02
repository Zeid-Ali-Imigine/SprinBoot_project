import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEdit, 
  faTrash, 
  faEye,
  faSpinner,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import { apiServices } from '../../api';
import './Utilisateurs.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategorie, setSelectedCategorie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [processingId, setProcessingId] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await apiServices.categories.getAll();
      setCategories(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des catégories");
      console.error(err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (categorieId) => {
    try {
      setProcessingId(categorieId);
      const response = await apiServices.categories.delete(categorieId);
      
      if (response.data) {
        await fetchCategories();
        alert(response.data.message || "Catégorie supprimée avec succès");
      }
    } catch (err) {
      console.error("Erreur lors de la suppression de la catégorie:", err);
      alert(err.response?.data?.error || "Erreur lors de la suppression");
    } finally {
      setProcessingId(null);
    }
  };

  const handleViewDetails = (categorie) => {
    setSelectedCategorie(categorie);
    setShowModal(true);
  };

  let navigate = useNavigate();
  const renderActions = (categorie) => {
    const isProcessing = processingId === categorie.id;
    
    return (
      <div className="actions-cell">
        <button 
          className="action-btn view"
          onClick={() => handleViewDetails(categorie)}
          title="Voir les détails"
        >
          <FontAwesomeIcon icon={faEye} />
        </button>
        
        <button 
          className="action-btn edit"
          onClick={() => { navigate(`/dashboard/categories/modifier/${categorie.id}`)}}
          title="Modifier"
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        
        <button 
          className="action-btn delete"
          onClick={() => handleDelete(categorie.id)}
          title="Supprimer"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <FontAwesomeIcon icon={faTrash} />
          )}
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <FontAwesomeIcon icon={faSpinner} spin />
        <p>Chargement des catégories...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="categories-page">
      <div className="produits-header">
        <h1>Gestion des categories</h1>
        <Link 
          to="/dashboard/categories/ajouter" 
          className="btn-add"
          style={{ textDecoration: 'none' }}
        >
          <FontAwesomeIcon icon={faPlus} /> Ajouter un produit
        </Link>
      </div>

      {categories.length === 0 ? (
        <div className="no-categories">
          <p>Aucune catégorie trouvée</p>
        </div>
      ) : (
        <div className="categories-table-container">
          <table className="categories-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Nombre de produits</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((categorie) => (
                <tr key={categorie.id}>
                  <td>{categorie.id}</td>
                  <td>{categorie.nom}</td>
                  <td>{categorie.nombreProduits || 0}</td>
                  <td>{renderActions(categorie)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && selectedCategorie && (
        <div className="modal">
          <div className="modal-content">
            <h2>Détails de la catégorie #{selectedCategorie.id}</h2>
            <div className="categorie-details">
              <div className="categorie-info">
                <p><strong>Nom:</strong> {selectedCategorie.nom}</p>
                <p><strong>Nombre de produits:</strong> {selectedCategorie.nombreProduits || 0}</p>
              </div>
            </div>
            <button onClick={() => setShowModal(false)} className="close-modal">
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;