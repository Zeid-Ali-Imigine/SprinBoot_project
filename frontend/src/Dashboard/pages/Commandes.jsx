import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheck, 
  faTimes, 
  faEye,
  faTruck,
  faSpinner,
  faPrint
} from '@fortawesome/free-solid-svg-icons';
import { apiServices } from '../../api';
import './Commandes.css';

const Commandes = () => {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCommande, setSelectedCommande] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [processingId, setProcessingId] = useState(null);

//   const fetchCommandes = async () => {
//     try {
//       setLoading(true);
//       const response = await apiServices.commandes.getAll();
//       console.log(response.data);
//       setCommandes(response.data);
//       setError(null);
//     } catch (err) {
//       setError("Erreur lors du chargement des commandes");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };
const fetchCommandes = async () => {
    try {
      setLoading(true);
      const response = await apiServices.commandes.getAll();
      console.log(response.data);
      // Assurez-vous que response.data est un tableau
      setCommandes(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des commandes");
      console.error(err);
      // En cas d'erreur, initialisez avec un tableau vide
      setCommandes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommandes();
  }, []);

  const handlePrepare = async (commandeId) => {
    try {
      setProcessingId(commandeId);
      const response = await apiServices.commandes.preparer(commandeId);
      
      if (response.data) {
        await fetchCommandes();
        alert(response.data.message || "Commande marquée comme préparée");
      }
    } catch (err) {
      console.error("Erreur lors de la préparation de la commande:", err);
      alert(err.response?.data?.error || "Erreur lors de la préparation de la commande");
    } finally {
      setProcessingId(null);
    }
  };

  const handleExpedier = async (commandeId) => {
    try {
      setProcessingId(commandeId);
      const response = await apiServices.commandes.expedier(commandeId);
      
      if (response.data) {
        await fetchCommandes();
        alert(response.data.message || "Commande marquée comme expédiée");
      }
    } catch (err) {
      console.error("Erreur lors de l'expédition de la commande:", err);
      alert(err.response?.data?.error || "Erreur lors de l'expédition de la commande");
    } finally {
      setProcessingId(null);
    }
  };

  const handleAnnuler = async (commandeId) => {
    try {
      setProcessingId(commandeId);
      const response = await apiServices.commandes.annuler(commandeId);
      
      if (response.data) {
        await fetchCommandes();
        alert(response.data.message || "Commande annulée avec succès");
      }
    } catch (err) {
      console.error("Erreur lors de l'annulation de la commande:", err);
      alert(err.response?.data?.error || "Erreur lors de l'annulation de la commande");
    } finally {
      setProcessingId(null);
    }
  };

  const filteredCommandes = commandes.filter(commande => 
    selectedStatus === 'all' ? true : commande.statut === selectedStatus
  );

  console.log("filteredCommandes", filteredCommandes);

  const handleViewDetails = (commande) => {
    setSelectedCommande(commande);
    setShowModal(true);
  };

  const renderActions = (commande) => {
    const isProcessing = processingId === commande.id;
    
    return (
      <>
        {commande.statut === 'en_attente' && (
          <button 
            className="action-btn prepare"
            onClick={() => handlePrepare(commande.id)}
            title="Préparer la commande"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <FontAwesomeIcon icon={faCheck} />
            )}
          </button>
        )}
        
        {commande.statut === 'prete' && (
          <button 
            className="action-btn ship"
            onClick={() => handleExpedier(commande.id)}
            title="Expédier la commande"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <FontAwesomeIcon icon={faTruck} />
            )}
          </button>
        )}
        
        {(commande.statut === 'EN_ATTENTE' || commande.statut === 'prete') && (
          <button 
            className="action-btn cancel"
            onClick={() => handleAnnuler(commande.id)}
            title="Annuler la commande"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <FontAwesomeIcon icon={faTimes} />
            )}
          </button>
        )}
        
        <button 
          className="action-btn print"
          onClick={() => window.print()}
          title="Imprimer"
        >
          <FontAwesomeIcon icon={faPrint} />
        </button>
      </>
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <FontAwesomeIcon icon={faSpinner} spin />
        <p>Chargement des commandes...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

 

  return (
    <div className="commandes-page">
      <div className="commandes-header">
        <h1>Gestion des Commandes</h1>
        <select 
          value={selectedStatus} 
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="status-filter"
        >
          <option value="all">Toutes les commandes</option>
          <option value="EN_ATTENTE">En Attente</option>
          <option value="prete">Prêtes</option>
          <option value="livree">Livrées</option>
          <option value="annulee">Annulées</option>
        </select>
      </div>

      {filteredCommandes.length === 0 ? (
        <div className="no-commandes">
          <p>Aucune commande {selectedStatus !== 'all' ? `avec le statut "${selectedStatus}"` : ''}</p>
        </div>
      ) : (
        <div className="commandes-table-container">
          <table className="commandes-table">
            <thead>
              <tr>
                <th>Référence</th>
                <th>Client</th>
                <th>Date</th>
                <th>Montant</th>
                <th>Paiement</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCommandes.map((commande) => (
                <tr 
                  key={commande.id} 
                  className={`status-${commande.statut}`}
                >
                  <td>#</td>
                  <td>#</td>
                  <td>{new Date(commande.dateCommande).toLocaleDateString()}</td>
                  <td>{commande.montantTotal} MRU</td>
                  <td>
                    ###
                    {/* <span className={`payment-status ${commande.paiement_statut}`}>
                      {commande.paiement_statut}
                    </span> */}
                  </td>
                  <td>
                    <span className={`status-badge ${commande.statut}`}>
                      {commande.statut}
                    </span>
                  </td>
                  <td className="actions-cell">
                    {renderActions(commande)}
                    <button 
                      className="action-btn view"
                      onClick={() => handleViewDetails(commande)}
                      title="Voir les détails"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && selectedCommande && (
        <div className="modal">
          <div className="modal-content">
            <h2>Détails de la commande #{selectedCommande.reference}</h2>
            <div className="commande-details">
              <div className="commande-info">
                <h3>Informations client</h3>
                <p><strong>Nom:</strong> ####</p>
                <p><strong>Email:</strong> ###</p>
                <p><strong>Téléphone:</strong> ###</p>
                <p><strong>Adresse:</strong> ###</p>
              </div>
              
              <div className="commande-info">
                <h3>Informations commande</h3>
                <p><strong>Date:</strong> ###</p>
                <p><strong>Statut:</strong> ###</p>
                <p><strong>Méthode de paiement:</strong> ####</p>
                <p><strong>Statut paiement:</strong> ###</p>
                <p><strong>Montant total:</strong>####</p>
              </div>
              
              <div className="commande-produits">
                <h3>Produits commandés</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Produit</th>
                      <th>Quantité</th>
                      <th>Prix unitaire</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {selectedCommande.produits.map((produit, index) => ( */}
                      <tr key="###">
                        <td>###</td>
                        <td>###</td>
                        <td>###</td>
                        <td>###</td>
                      </tr>
                    {/* ))} */}
                  </tbody>
                </table>
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

export default Commandes;