// import React, {useEffect, useState} from 'react';
// import { Await, useParams } from 'react-router-dom';
// import GenericForm from './common/GenericForm';
// import { apiServices } from '../../../api';

// const ProduitForm = () => {
//   const { id } = useParams();
//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//             const response = await apiServices.categories.getAll();
//             console.log("rs", response.data);
//             setCategories(response.data);
//             // console.log("cat1", categories);
//             } catch (err) {
//             console.error('Erreur lors du chargement des catégories:', err);
//             }
//         };
//         fetchCategories();
//         }
//     , []);
    
//         console.log("cat", categories);
//   const fields = [
//     { field: 'nom', label: 'Nom', type: 'text' },
//     { field: 'description', label: 'Description', type: 'textarea' },
//     { field: 'prix', label: 'Prix (MRU)', type: 'number' },
//     { field: 'quantiteStock', label: 'Quantité en stock', type: 'number' },
//     { 
//       field: 'categorieId', 
//       label: 'Catégorie', 
//       type: 'select',
//       Option: categories.map(item => ({
//         value: item.id,
//         label: item.username
//       }))
//     }
//   ];

//   const relations = {
//     categories: { endpoint: 'categories', labelField: 'nom' }
//   };

//   return (
//     <GenericForm 
//       fields={fields}
//       relations={relations}
//       endpoint="produits"
//       id={id}
//       title="un produit"
//     />
//   );
// };

// export default ProduitForm;






import React from 'react';
import { useParams } from 'react-router-dom';
import GenericForm from './common/GenericForm';

const ProduitForm = () => {
  const { id } = useParams();

  const fields = [
    { field: 'nom', label: 'Nom', type: 'text' },
    { field: 'description', label: 'Description', type: 'textarea' },
    { field: 'prix', label: 'Prix (MRU)', type: 'number' },
    { field: 'quantiteStock', label: 'Quantité en stock', type: 'number' },
    { 
      field: 'categorieId', 
      label: 'Catégorie', 
      type: 'select',
      relation: 'categories' // Utilisez 'relation' au lieu de 'Option'
    }
  ];

  const relations = {
    categories: { endpoint: 'categories', labelField: 'nom' } // Correction: 'nom' au lieu de 'username'
  };

  return (
    <GenericForm 
      fields={fields}
      relations={relations}
      endpoint="produits"
      id={id}
      title="un produit"
    />
  );
};

export default ProduitForm;