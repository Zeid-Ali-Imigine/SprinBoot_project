// import React, { useState } from 'react';
// import { FaShoppingCart, FaUser, FaSignInAlt, FaUserPlus, FaTimes } from 'react-icons/fa';
// import './HomePage.css';
// import productImage from './assets/images/eau.jpeg';

// const HomePage = () => {
//   // États pour la gestion du panier
//   const [cart, setCart] = useState([]);
//   const [showCart, setShowCart] = useState(false);
//   const [paymentScreenshot, setPaymentScreenshot] = useState(null);
//   const [orderSubmitted, setOrderSubmitted] = useState(false);

//   // États pour les formulaires
//   const [showLoginForm, setShowLoginForm] = useState(false);
//   const [showRegisterForm, setShowRegisterForm] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Données des produits
//   const products = [
//     { id: 1, title: "TRENDY SKIRTS", price: 49.99, discount: "UP TO 50% OFF", image: productImage },
//     { id: 2, title: "DESIGNER BAGS", price: 89.99, discount: "UP TO 30% OFF", image: productImage },
//     { id: 3, title: "BRANDED WATCH", price: 129.99, discount: "UP TO 40% OFF", image: productImage },
//     { id: 4, title: "CASUAL SHOES", price: 59.99, discount: "UP TO 35% OFF", image: productImage }
//   ];

//   // Fonctions pour le panier
//   const addToCart = (product) => {
//     setCart([...cart, product]);
//   };

//   const removeFromCart = (productId) => {
//     setCart(cart.filter(item => item.id !== productId));
//   };

//   const calculateTotal = () => {
//     return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
//   };

//   const handlePaymentSubmit = (e) => {
//     e.preventDefault();
//     if (paymentScreenshot) {
//       setOrderSubmitted(true);
//       setTimeout(() => {
//         setOrderSubmitted(false);
//         setCart([]);
//         setShowCart(false);
//         setPaymentScreenshot(null);
//       }, 3000);
//     }
//   };

//   // Fonctions pour l'authentification
//   const handleLogin = (e) => {
//     e.preventDefault();
//     setIsLoggedIn(true);
//     setShowLoginForm(false);
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();
//     setIsLoggedIn(true);
//     setShowRegisterForm(false);
//   };

//   return (
//     <div className="zurea-container">
//       {/* Header avec navigation */}
//       <header className="zurea-header">
//         <div className="logo">ZUREA</div>
//         <nav className="main-nav">
//           <a href="/">Home</a>
//           <a href="/products">Products</a>
//           <a href="/about">About</a>
//           <a href="/contact">Contact</a>
//         </nav>
//         <div className="user-actions">
//           {!isLoggedIn ? (
//             <>
//               <button onClick={() => setShowLoginForm(true)}>
//                 <FaSignInAlt /> Login
//               </button>
//               <button onClick={() => setShowRegisterForm(true)}>
//                 <FaUserPlus /> Register
//               </button>
//             </>
//           ) : (
//             <button>
//               <FaUser /> Mon compte
//             </button>
//           )}
//           <div className="cart-icon" onClick={() => setShowCart(true)}>
//             <FaShoppingCart />
//             {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
//           </div>
//         </div>
//       </header>

//       {/* Bannière principale */}
//       <section className="hero-banner">
//         <h1>ZUREA FASHION STORE</h1>
//         <p>Premium PrestaShop Theme</p>
//       </section>

//       {/* Section des produits */}
//       <section className="products-section">
//         <h2 className="section-title">NOS COLLECTIONS</h2>
//         <div className="products-grid">
//           {products.map(product => (
//             <div key={product.id} className="product-card">
//               <img src={product.image} alt={product.title} />
//               <div className="product-info">
//                 <h3>{product.title}</h3>
//                 <p className="price">${product.price}</p>
//                 <p className="discount">{product.discount}</p>
//                 <button 
//                   className="shop-now-btn"
//                   onClick={() => addToCart(product)}
//                 >
//                   ADD TO CART
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Panier */}
//       {showCart && (
//         <div className="cart-modal">
//           <div className="cart-content">
//             <div className="cart-header">
//               <h2>Your Cart</h2>
//               <FaTimes className="close-icon" onClick={() => setShowCart(false)} />
//             </div>
//             {cart.length === 0 ? (
//               <p className="empty-cart">Your cart is empty</p>
//             ) : (
//               <>
//                 <div className="cart-items">
//                   {cart.map(item => (
//                     <div key={item.id} className="cart-item">
//                       <img src={item.image} alt={item.title} />
//                       <div className="item-details">
//                         <h4>{item.title}</h4>
//                         <p>${item.price}</p>
//                       </div>
//                       <button 
//                         className="remove-btn"
//                         onClick={() => removeFromCart(item.id)}
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="cart-total">
//                   <p>Total: ${calculateTotal()}</p>
//                 </div>
//                 <form onSubmit={handlePaymentSubmit} className="payment-form">
//                   <label>
//                     Upload payment screenshot:
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => setPaymentScreenshot(e.target.files[0])}
//                       required
//                     />
//                   </label>
//                   {paymentScreenshot && (
//                     <p>Selected file: {paymentScreenshot.name}</p>
//                   )}
//                   <button type="submit" className="submit-order-btn">
//                     Submit Order
//                   </button>
//                 </form>
//               </>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Formulaire de connexion */}
//       {showLoginForm && (
//         <div className="auth-modal">
//           <div className="auth-content">
//             <FaTimes className="close-icon" onClick={() => setShowLoginForm(false)} />
//             <h2>Login</h2>
//             <form onSubmit={handleLogin}>
//               <div className="form-group">
//                 <label>Email</label>
//                 <input type="email" required />
//               </div>
//               <div className="form-group">
//                 <label>Password</label>
//                 <input type="password" required />
//               </div>
//               <button type="submit">Login</button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Formulaire d'inscription */}
//       {showRegisterForm && (
//         <div className="auth-modal">
//           <div className="auth-content">
//             <FaTimes className="close-icon" onClick={() => setShowRegisterForm(false)} />
//             <h2>Register</h2>
//             <form onSubmit={handleRegister}>
//               <div className="form-group">
//                 <label>Name</label>
//                 <input type="text" required />
//               </div>
//               <div className="form-group">
//                 <label>Email</label>
//                 <input type="email" required />
//               </div>
//               <div className="form-group">
//                 <label>Password</label>
//                 <input type="password" required />
//               </div>
//               <div className="form-group">
//                 <label>Confirm Password</label>
//                 <input type="password" required />
//               </div>
//               <button type="submit">Register</button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Confirmation de commande */}
//       {orderSubmitted && (
//         <div className="order-confirmation">
//           <div className="confirmation-content">
//             <h2>Order Submitted Successfully!</h2>
//             <p>Thank you for your purchase. Your order has been received.</p>
//             <button onClick={() => setOrderSubmitted(false)}>OK</button>
//           </div>
//         </div>
//       )}

//       {/* Footer */}
//       <footer className="zurea-footer">
//         <p>© 2023 ZUREA FASHION STORE. Tous droits réservés.</p>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;



import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaUser, FaSignInAlt, FaUserPlus, FaTimes } from 'react-icons/fa';
import './HomePage.css';
import productImage from './assets/images/eau.jpeg';
import api, { apiServices } from './api';

const HomePage = () => {
  // États pour la gestion du panier
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // États pour les produits
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productError, setProductError] = useState(null);

  // États pour l'authentification
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Récupération des produits au chargement du composant
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiServices.produits.getAll();
        setProducts(response.data);
      } catch (error) {
        setProductError("Erreur lors du chargement des produits");
        console.error("Erreur:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // Fonctions pour le panier
  const addToCart = (product) => {
    if (product.quantiteStock <= 0) return;
    
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { 
        ...product, 
        quantity: 1,
        prixUnitaire: product.prix,
        sousTotal: product.prix
      }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.prixUnitaire * item.quantity), 0).toFixed(2);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      alert("Votre panier est vide");
      return;
    }
  
    setIsLoading(true);
  
    try {
      // 1. Vérifions d'abord le format des données
      const articlesDTO = cart.map(item => ({
        produitId: item.id,
        quantite: item.quantity,
        prixUnitaire: item.prixUnitaire,
        sousTotal: (item.prixUnitaire * item.quantity).toFixed(2),
        produitNom: item.nom
      }));
  
      console.log("Articles à envoyer:", articlesDTO); // Debug
  
      const commandeData = {
        adresseLivraison: "123 Rue de la Mode",
        statut: "EN_ATTENTE",
        montantTotal: parseFloat(calculateTotal()),
        utilisateurId: 1, // À remplacer par l'ID de l'utilisateur connecté
        articles: articlesDTO
      };
  
      console.log("Données complètes de la commande:", commandeData); // Debug
  
      // 2. Essayons d'abord seulement la création de commande
      const response = await apiServices.commandes.create(commandeData);
      console.log("Réponse du serveur:", response);
  
      // Si la commande est créée avec succès, alors mettons à jour les stocks
    //   const updateStockPromises = cart.map(item =>
    //     console.log("Mise à jour du stock pour l'article:", item) ||
    //     apiServices.produits.update(item.id, {
    //       quantiteStock: 39
    //     })
    //   );
      
    //   await Promise.all(updateStockPromises);
  
      // Gestion du succès
      setOrderSubmitted(true);
      setTimeout(() => {
        setOrderSubmitted(false);
        setCart([]);
        setShowCart(false);
        setIsLoading(false);
        // Recharger les produits
        apiServices.produits.getAll().then(response => setProducts(response.data));
      }, 3000);
  
    } catch (error) {
      console.error("Erreur complète:", {
        message: error.message,
        response: error.response?.data,
        stack: error.stack
      });
      
      alert(`Erreur lors de la création de la commande: ${error.response?.data?.message || error.message}`);
      setIsLoading(false);
    }
  };

  // Fonctions pour l'authentification
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowLoginForm(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowRegisterForm(false);
  };

  return (
    <div className="zurea-container">
      {/* Header avec navigation */}
      <header className="zurea-header">
        <div className="logo">ZUREA</div>
        <nav className="main-nav">
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="user-actions">
          {!isLoggedIn ? (
            <>
              <button onClick={() => setShowLoginForm(true)}>
                <FaSignInAlt /> Login
              </button>
              <button onClick={() => setShowRegisterForm(true)}>
                <FaUserPlus /> Register
              </button>
            </>
          ) : (
            <button>
              <FaUser /> Mon compte
            </button>
          )}
          <div className="cart-icon" onClick={() => setShowCart(true)}>
            <FaShoppingCart />
            {cart.length > 0 && (
              <span className="cart-count">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Bannière principale */}
      <section className="hero-banner">
        <h1>ZUREA FASHION STORE</h1>
        <p>Premium PrestaShop Theme</p>
      </section>

      {/* Section des produits */}
      <section className="products-section">
        <h2 className="section-title">NOS COLLECTIONS</h2>
        {loadingProducts ? (
          <div className="loading-message">Chargement des produits...</div>
        ) : productError ? (
          <div className="error-message">{productError}</div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <img 
                  src={product.imageUrl || productImage} 
                  alt={product.nom} 
                  onError={(e) => {
                    e.target.src = productImage;
                  }}
                />
                <div className="product-info">
                  <h3>{product.nom}</h3>
                  <p className="price">${product.prix.toFixed(2)}</p>
                  <p className="stock">
                    {product.quantiteStock > 0 
                      ? `${product.quantiteStock} en stock` 
                      : 'Rupture de stock'}
                  </p>
                  <button 
                    className={`shop-now-btn ${product.quantiteStock <= 0 ? 'disabled' : ''}`}
                    onClick={() => addToCart(product)}
                    disabled={product.quantiteStock <= 0}
                  >
                    {product.quantiteStock <= 0 ? 'RUPTURE' : 'AJOUTER AU PANIER'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Panier */}
      {showCart && (
        <div className="cart-modal">
          <div className="cart-content">
            <div className="cart-header">
              <h2>Votre Panier</h2>
              <FaTimes className="close-icon" onClick={() => setShowCart(false)} />
            </div>
            {cart.length === 0 ? (
              <p className="empty-cart">Votre panier est vide</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <img 
                        src={item.imageUrl || productImage} 
                        alt={item.nom}
                        onError={(e) => {
                          e.target.src = productImage;
                        }}
                      />
                      <div className="item-details">
                        <h4>{item.nom}</h4>
                        <p>${item.prixUnitaire.toFixed(2)} x {item.quantity}</p>
                        <p>Sous-total: ${(item.prixUnitaire * item.quantity).toFixed(2)}</p>
                      </div>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  ))}
                </div>
                <div className="cart-total">
                  <p>Total: ${calculateTotal()}</p>
                </div>
                <form onSubmit={handlePaymentSubmit} className="payment-form">
                  <button 
                    type="submit" 
                    className="submit-order-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Traitement en cours...' : 'Valider la commande'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Formulaire de connexion */}
      {showLoginForm && (
        <div className="auth-modal">
          <div className="auth-content">
            <FaTimes className="close-icon" onClick={() => setShowLoginForm(false)} />
            <h2>Connexion</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" required />
              </div>
              <div className="form-group">
                <label>Mot de passe</label>
                <input type="password" required />
              </div>
              <button type="submit">Se connecter</button>
            </form>
          </div>
        </div>
      )}

      {/* Formulaire d'inscription */}
      {showRegisterForm && (
        <div className="auth-modal">
          <div className="auth-content">
            <FaTimes className="close-icon" onClick={() => setShowRegisterForm(false)} />
            <h2>Inscription</h2>
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label>Nom</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" required />
              </div>
              <div className="form-group">
                <label>Mot de passe</label>
                <input type="password" required />
              </div>
              <div className="form-group">
                <label>Confirmer le mot de passe</label>
                <input type="password" required />
              </div>
              <button type="submit">S'inscrire</button>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation de commande */}
      {orderSubmitted && (
        <div className="order-confirmation">
          <div className="confirmation-content">
            <h2>Commande validée avec succès !</h2>
            <p>Merci pour votre achat. Votre commande a bien été enregistrée.</p>
            <button onClick={() => setOrderSubmitted(false)}>OK</button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="zurea-footer">
        <p>© {new Date().getFullYear()} ZUREA FASHION STORE. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default HomePage;