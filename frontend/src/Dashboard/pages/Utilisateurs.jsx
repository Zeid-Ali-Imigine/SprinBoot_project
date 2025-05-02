import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEdit, 
  faTrash, 
  faEye,
  faSpinner,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import { apiServices } from '../../api';
import './Utilisateurs.css';

const Utilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUtilisateur, setSelectedUtilisateur] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [processingId, setProcessingId] = useState(null);

  const fetchUtilisateurs = async () => {
    try {
      setLoading(true);
      const response = await apiServices.Utilisateures.getAll();
      setUtilisateurs(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des utilisateurs");
      console.error(err);
      setUtilisateurs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  const handleDelete = async (userId) => {
    try {
      setProcessingId(userId);
      const response = await apiServices.Utilisateures.delete(userId);
      
      if (response.data) {
        await fetchUtilisateurs();
        alert(response.data.message || "Utilisateur supprimé avec succès");
      }
    } catch (err) {
      console.error("Erreur lors de la suppression de l'utilisateur:", err);
      alert(err.response?.data?.error || "Erreur lors de la suppression");
    } finally {
      setProcessingId(null);
    }
  };

  const handleViewDetails = (utilisateur) => {
    setSelectedUtilisateur(utilisateur);
    setShowModal(true);
  };

  const renderActions = (utilisateur) => {
    const isProcessing = processingId === utilisateur.id;
    
    return (
      <div className="actions-cell">
        <button 
          className="action-btn view"
          onClick={() => handleViewDetails(utilisateur)}
          title="Voir les détails"
        >
          <FontAwesomeIcon icon={faEye} />
        </button>
        
        <button 
          className="action-btn delete"
          onClick={() => handleDelete(utilisateur.id)}
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
        <p>Chargement des utilisateurs...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="utilisateurs-page">
      <div className="utilisateurs-header">
        <h1>Gestion des Utilisateurs</h1>
        
      </div>

      {utilisateurs.length === 0 ? (
        <div className="no-utilisateurs">
          <p>Aucun utilisateur trouvé</p>
        </div>
      ) : (
        <div className="utilisateurs-table-container">
          <table className="utilisateurs-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Date de création</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {utilisateurs.map((utilisateur) => (
                <tr key={utilisateur.id}>
                  <td>{utilisateur.id}</td>
                  <td>{utilisateur.nom}</td>
                  <td>{utilisateur.email}</td>
                  <td>{new Date(utilisateur.dateCreation).toLocaleDateString()}</td>
                  <td>{renderActions(utilisateur)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && selectedUtilisateur && (
        <div className="modal">
          <div className="modal-content">
            <h2>Détails de l'utilisateur #{selectedUtilisateur.id}</h2>
            <div className="utilisateur-details">
              <div className="utilisateur-info">
                <p><strong>Nom:</strong> {selectedUtilisateur.nom}</p>
                <p><strong>Email:</strong> {selectedUtilisateur.email}</p>
                <p><strong>Date de création:</strong> {new Date(selectedUtilisateur.dateCreation).toLocaleString()}</p>
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

export default Utilisateurs;