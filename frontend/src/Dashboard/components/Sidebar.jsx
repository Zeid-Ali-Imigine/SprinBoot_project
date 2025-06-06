import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faCog,
  faLayerGroup,
  faSearch,
  faBagShopping,
  faNewspaper,
  faUsers,
  faBars,
  faCode,
  

} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
// import { useLogout } from '../../components/common/header/Logout';

import './Sidebar.css'; 

function Sidebar({ isOpen, setIsOpen }) {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  // const handleLogout = useLogout();

  const handleSubmenuClick = (index, e) => {
    e.preventDefault(); // Prevent navigation
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  const menuItems = [
    { 
      icon: faHome, 
      text: 'Dashboard', 
      path: '/dashboard',
    },
    { 
      icon: faBagShopping, 
      text: 'Commande', 
      path: '/dashboard/commandes',
    },
    { icon: faCog, text: 'Produits', path: '/dashboard/produits' },
    { icon: faUsers, text: 'Client', path: '/dashboard/utilisateurs' },
    { icon: faLayerGroup, text: 'Categories', path: '/dashboard/categories' },
    { 
      icon: faNewspaper,
      text: 'Rapports',
      path: '/dashboard/Rapports',
      subItems: [
        { text: 'Ventes', path: '/dashboard/Rapports/ventes' },
        { text: 'clents', path: '/dashboard/Rapports/client' },
        { text: 'produits', path: '/dashboard/Rapports/produits' },
      ]
    },

    { icon: faCog, text: 'paramettre', path: '/dashboard/settings' },
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Logo Section */}
      <div className="logo-details">
        <div className={`logo-content ${!isOpen ? 'hidden' : ''}`}>
          <FontAwesomeIcon icon={faCode} className="icon" />
          <span className="logo-name">CodingLab</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="menu-btn"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      {/* Navigation List */}
      <div className="nav-list-container">
        <ul className="nav-list">
          {/* Search Bar */}
          <li className="search-box">
            <div className="search-wrapper">
              <input
                type="text"
                placeholder={isOpen ? "Search..." : ""}
                className="search-input"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="search-icon"
              />
            </div>
          </li>

          {/* Menu Items */}
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item">
              <Link 
                to={item.path} 
                className="nav-link"
                onClick={(e) => item.subItems && handleSubmenuClick(index, e)}
              >
                <FontAwesomeIcon icon={item.icon} className="nav-icon" />
                <span className={`nav-text ${!isOpen && 'hidden'}`}>
                  {item.text}
                </span>
                {!isOpen && <span className="tooltip">{item.text}</span>}
              </Link>
              {item.subItems && (
                <ul className={`sub-menu ${activeSubmenu === index ? 'active' : ''}`}>
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link to={subItem.path} className="sub-link">
                        {subItem.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default Sidebar;