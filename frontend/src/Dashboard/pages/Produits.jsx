import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEdit, 
  faTrash, 
  faEye,
  faSpinner,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { apiServices } from '../../api';
import './Utilisateurs.css';

const Produits = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduit, setSelectedProduit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [processingId, setProcessingId] = useState(null);

  const fetchProduits = async () => {
    try {
      setLoading(true);
      const response = await apiServices.produits.getAll();
      setProduits(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des produits");
      console.error(err);
      setProduits([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduits();
  }, []);

  const handleDelete = async (produitId) => {
    try {
      setProcessingId(produitId);
      const response = await apiServices.produits.delete(produitId);
      
      if (response.data) {
        await fetchProduits();
        alert(response.data.message || "Produit supprimé avec succès");
      }
    } catch (err) {
      console.error("Erreur lors de la suppression du produit:", err);
      alert(err.response?.data?.error || "Erreur lors de la suppression");
    } finally {
      setProcessingId(null);
    }
  };

  const handleViewDetails = (produit) => {
    setSelectedProduit(produit);
    setShowModal(true);
  };

  let navigate = useNavigate();
  const renderActions = (produit) => {
    const isProcessing = processingId === produit.id;
    
    return (
      <div className="actions-cell">
        <button 
          className="action-btn view"
          onClick={() => handleViewDetails(produit)}
          title="Voir les détails"
        >
          <FontAwesomeIcon icon={faEye} />
        </button>
        
        <button 
          className="action-btn edit"
          onClick={() => {navigate(`/dashboard/produits/modifier/${produit.id}`)}}
          title="Modifier"
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        
        <button 
          className="action-btn delete"
          onClick={() => handleDelete(produit.id)}
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
        <p>Chargement des produits...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="produits-page">
      <div className="produits-header">
        <h1>Gestion des Produits</h1>
        <Link 
          to="/dashboard/produits/ajouter" 
          className="btn-add"
          style={{ textDecoration: 'none' }}
        >
          <FontAwesomeIcon icon={faPlus} /> Ajouter un produit
        </Link>
      </div>

      {produits.length === 0 ? (
        <div className="no-produits">
          <p>Aucun produit trouvé</p>
        </div>
      ) : (
        <div className="produits-table-container">
          <table className="produits-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Prix</th>
                <th>Stock</th>
                <th>Catégorie</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {produits.map((produit) => (
                <tr key={produit.id}>
                  <td>{produit.id}</td>
                  <td>{produit.nom}</td>
                  <td>{produit.description.substring(0, 50)}...</td>
                  <td>{produit.prix} MRU</td>
                  <td>{produit.quantiteStock}</td>
                  <td>{produit.categorieNom || 'N/A'}</td>
                  <td>{renderActions(produit)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && selectedProduit && (
        <div className="modal">
          <div className="modal-content">
            <h2>Détails du produit #{selectedProduit.id}</h2>
            <div className="produit-details">
              <div className="produit-info">
                <p><strong>Nom:</strong> {selectedProduit.nom}</p>
                <p><strong>Description:</strong> {selectedProduit.description}</p>
                <p><strong>Prix:</strong> {selectedProduit.prix} MRU</p>
                <p><strong>Stock:</strong> {selectedProduit.quantiteStock}</p>
                <p><strong>Catégorie:</strong> {selectedProduit.categorieNom || 'N/A'}</p>
                <p><strong>Date d'ajout:</strong> {new Date(selectedProduit.dateAjout).toLocaleString()}</p>
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

export default Produits;