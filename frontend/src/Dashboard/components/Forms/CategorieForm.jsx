import React from 'react';
import { useParams } from 'react-router-dom';
import GenericForm from './common/GenericForm';

const CategorieForm = () => {
  const { id } = useParams();

  const fields = [
    { field: 'nom', label: 'Nom', type: 'text' },
    { field: 'description', label: 'Description', type: 'textarea' }
  ];

  return (
    <GenericForm 
      fields={fields}
      endpoint="categories"
      relations={{NaN}}
      id={id}
      title="une catégorie"
    />
  );
};

export default CategorieForm;