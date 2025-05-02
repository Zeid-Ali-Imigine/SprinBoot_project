import React, { useState } from 'react';
import { FaCheckCircle, FaShoppingCart, FaTimes } from 'react-icons/fa';

import eau from './assets/images/eau.jpeg';
import casque from './assets/images/casque.jpg';
import clavier from './assets/images/clavier.webp';
import lampe from './assets/images/lampe.webp';

const produits = [
  {
    id: 1,
    nom: 'Bouteille d’eau',
    prix: '15€',
    description: 'Une bouteille réutilisable pour rester hydraté toute la journée.',
    image: eau
  },
  {
    id: 2,
    nom: 'Casque Audio',
    prix: '45€',
    description: 'Casque stéréo haute qualité avec réduction de bruit.',
    image: casque
  },
  {
    id: 3,
    nom: 'Clavier Gamer',
    prix: '60€',
    description: 'Clavier mécanique RGB idéal pour le gaming.',
    image: clavier
  },
  {
    id: 4,
    nom: 'Lampe LED',
    prix: '25€',
    description: 'Lampe LED de bureau avec lumière réglable.',
    image: lampe
  },
];

const Produits = () => {
  const [produitSelectionne, setProduitSelectionne] = useState(null);
  const [commandeValidee, setCommandeValidee] = useState(false);
  const [panier, setPanier] = useState([]);
  const [showPanier, setShowPanier] = useState(false);
  const [capturePaiement, setCapturePaiement] = useState(null);
  const [commandeSoumise, setCommandeSoumise] = useState(false);

  const confirmerCommande = () => {
    setPanier([...panier, produitSelectionne]);
    setCommandeValidee(true);
    setTimeout(() => {
      setCommandeValidee(false);
      setProduitSelectionne(null);
    }, 2000);
  };

  const calculerTotal = () => {
    return panier.reduce((total, item) => {
      const prix = parseFloat(item.prix.replace('€', ''));
      return total + prix;
    }, 0);
  };

  const soumettreCommandeFinale = () => {
    if (capturePaiement) {
      setCommandeSoumise(true);
      setTimeout(() => {
        setCommandeSoumise(false);
        setCapturePaiement(null);
        setPanier([]);
        setShowPanier(false);
      }, 3000);
    } else {
      alert('Veuillez joindre une capture de paiement avant de valider la commande.');
    }
  };
  

  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <h2 style={{ margin: 0 }}>🛍️ eShop</h2>
        <div style={styles.cartIcon} onClick={() => setShowPanier(true)}>
          <FaShoppingCart size={30} />
          {panier.length > 0 && <span style={styles.cartBadge}>{panier.length}</span>}
        </div>
      </nav>

      <header style={styles.header}>
        <h1>Bienvenue sur notre site de commande en ligne</h1>
        <p>Explorez notre catalogue et passez votre commande en quelques clics !</p>
      </header>

      <div style={styles.grille}>
        {produits.map(produit => (
          <div key={produit.id} style={styles.card} onClick={() => setProduitSelectionne(produit)}>
            <img src={produit.image} alt={produit.nom} style={styles.image} />
            <h2>{produit.nom}</h2>
            <p style={styles.prix}>{produit.prix}</p>
            <p style={styles.desc}>{produit.description}</p>
            <button style={styles.btnCommander}>Commander</button>
          </div>
        ))}
      </div>

      {produitSelectionne && !commandeValidee && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <p style={styles.modalText}>Voulez-vous commander <strong>{produitSelectionne.nom}</strong> ?</p>
            <div>
              <button style={styles.btnOui} onClick={confirmerCommande}>Oui</button>
              <button style={styles.btnNon} onClick={() => setProduitSelectionne(null)}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      {commandeValidee && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <FaCheckCircle color="#28a745" size={40} />
            <p style={styles.modalText}>Merci ! Votre commande a été validée ✅</p>
          </div>
        </div>
      )}

      {showPanier && (
        <div style={styles.modalOverlay}>
          <div style={styles.panierContent}>
            <div style={styles.panierHeader}>
              <h2 style={styles.modalTitle}>🛒 Mon Panier</h2>
              <FaTimes style={{ cursor: 'pointer' }} size={22} onClick={() => setShowPanier(false)} />
            </div>
            <div style={styles.panierBody}>
              {panier.length === 0 ? (
                <p style={styles.panierEmpty}>Votre panier est vide.</p>
              ) : (
                <div style={styles.panierList}>
                  {panier.map((item, index) => (
                    <div key={index} style={styles.panierItem}>
                      <img src={item.image} alt={item.nom} style={styles.panierImage} />
                      <div style={styles.panierText}>
                        <p style={styles.panierNom}>{item.nom}</p>
                        <p style={styles.panierPrix}>{item.prix}</p>
                      </div>
                    </div>
                  ))}
                  <p style={{ fontWeight: 'bold', marginTop: '10px' }}>
                    Total : {calculerTotal().toFixed(2)} €
                  </p>
                  <div style={styles.zonePaiement}>
                  <label style={styles.customFileLabel}>
  📤 Envoyez votre capture de carte du paiement
  <input
    type="file"
    accept="image/*"
    onChange={e => setCapturePaiement(e.target.files[0])}
    style={styles.hiddenFileInput}
  />
</label>
{capturePaiement && (
  <p style={styles.selectedFileName}>{capturePaiement.name}</p>
)}

  <button style={styles.btnSoumettre} onClick={soumettreCommandeFinale}>
    Soumettre ma commande
  </button>
</div>

                  {commandeSoumise && (
                    <p style={{ color: '#28a745', fontWeight: 'bold', marginTop: '10px' }}>
                      ✅ Commande finale soumise avec succès !
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <footer style={styles.footer}>
        <p>© 2025 eShop | Site de démonstration React</p>
      </footer>
      {commandeSoumise && (
  <div style={styles.successOverlay}>
    <div style={styles.successBox}>
      <div style={styles.successIcon}>
        <FaCheckCircle size={70} color="#28a745" />
      </div>
      <h2 style={styles.successTitle}>🎉 Félicitations !</h2>
      <p style={styles.successText}>
        Votre commande a été <strong>envoyée avec succès</strong>.<br />
        Merci pour votre confiance !
      </p>
      <button style={styles.btnOK} onClick={() => setCommandeSoumise(false)}>
        OK
      </button>
    </div>
  </div>
)}



    </div>
  );
};

const styles = {
  page: {
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#fff',
    minHeight: '100vh',
    paddingBottom: '50px',
  },
  nav: {
    backgroundColor: '#0077cc',
    color: '#fff',
    padding: '15px 30px',
    fontSize: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartIcon: {
    position: 'relative',
    cursor: 'pointer',
    fontSize: '26px',
  },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: '#dc3545',
    color: '#fff',
    borderRadius: '50%',
    padding: '2px 6px',
    fontSize: '12px',
  },
  header: {
    textAlign: 'center',
    padding: '40px 20px',
  },
  grille: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '30px',
    padding: '0 20px',
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: '14px',
    width: '280px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    borderRadius: '10px',
    marginBottom: '15px',
    objectFit: 'cover',
    height: '180px'
  },
  prix: {
    color: '#0077cc',
    fontWeight: 'bold',
    margin: '10px 0 5px',
  },
  desc: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '15px',
  },
  btnCommander: {
    backgroundColor: '#0077cc',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '15px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '14px',
    textAlign: 'center',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  },
  modalText: {
    fontSize: '18px',
    marginBottom: '20px',
  },
  btnOui: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    marginRight: '10px',
    cursor: 'pointer',
  },
  btnNon: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  panierContent: {
    backgroundColor: '#f7faff',
    padding: '30px',
    borderRadius: '16px',
    width: '380px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  panierHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
  },
  modalTitle: {
    fontSize: '20px',
    marginBottom: '0px',
  },
  panierBody: {
    marginTop: '10px',
    maxHeight: '300px',
    overflowY: 'auto',
  },
  panierList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  panierItem: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#eaf4ff',
    padding: '10px',
    borderRadius: '10px',
    gap: '12px',
  },
  panierImage: {
    width: '60px',
    height: '60px',
    borderRadius: '6px',
    objectFit: 'cover',
    border: '1px solid #ccc',
  },
  panierText: {
    display: 'flex',
    flexDirection: 'column',
  },
  panierNom: {
    fontSize: '15px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#0077cc',
  },
  panierPrix: {
    fontSize: '14px',
    color: '#444',
  },
  panierEmpty: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#777',
    padding: '20px 0',
  },
  footer: {
    marginTop: '60px',
    textAlign: 'center',
    color: '#777',
    fontSize: '14px',
  },
  zonePaiement: {
    marginTop: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  
  inputFile: {
    border: '1px solid #ccc',
    padding: '8px',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: '#fff',
  },
  
  btnSoumettre: {
    backgroundColor: '#0077cc',
    color: '#fff',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  successOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  
  successBox: {
    backgroundColor: '#ffffff',
    padding: '40px 35px',
    borderRadius: '20px',
    width: '90%',
    maxWidth: '420px',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
    textAlign: 'center',
    animation: 'fadeIn 0.4s ease-in-out',
  },
  
  successIcon: {
    marginBottom: '25px',
  },
  
  successTitle: {
    fontSize: '24px',
    color: '#0077cc',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  
  successText: {
    fontSize: '16px',
    color: '#444',
    marginBottom: '20px',
    lineHeight: '1.6',
  },
  
  btnOK: {
    backgroundColor: '#0077cc',
    color: '#fff',
    padding: '10px 24px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' }
  },
  customFileLabel: {
    backgroundColor: '#0077cc',
    color: '#fff',
    padding: '10px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'inline-block',
  },
  
  hiddenFileInput: {
    display: 'none',
  },
  
  selectedFileName: {
    marginTop: '8px',
    fontSize: '13px',
    color: '#444',
    fontStyle: 'italic',
  }
  
  
  
  
  
  
};

export default Produits;
