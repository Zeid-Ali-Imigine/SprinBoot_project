import { useNavigate } from 'react-router-dom';
import { apiServices } from '../../../../api';
import React, { useState, useEffect } from 'react';
import './Forms.css';

const GenericForm = ({ 
  fields, 
  endpoint, 
  id, 
  title,
  relations = {} // { relationName: { endpoint: 'types', labelField: 'nom' } }
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [relationData, setRelationData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Charger les données des relations
    const loadRelations = async () => {
      const relationsData = {};
      
      for (const [relationName, config] of Object.entries(relations)) {
        try {
          const response = await apiServices[config.endpoint].getAll();
          relationsData[relationName] = response.data;
        } catch (err) {
          console.error(`Erreur lors du chargement des ${relationName}:`, err);
        }
      }
      
      setRelationData(relationsData);
    };

    loadRelations();

    // Initialiser formData
    const initialData = {};
    fields.forEach(field => {
      initialData[field.field] = field.defaultValue || '';
    });
    setFormData(initialData);

    // Charger les données existantes si ID
    if (id) {
      const fetchData = async () => {
        try {
          const response = await apiServices[endpoint].getById(id);
          setFormData(response.data);
        } catch (err) {
          setError(`Erreur lors du chargement des données`);
        }
      };
      fetchData();
    }
  }, [id, fields, endpoint, relations]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await apiServices[endpoint].update(id, formData);
      } else {
        await apiServices[endpoint].create(formData);
      }
      navigate(`/dashboard/${endpoint}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'enregistrement');
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getEnhancedFields = () => {
    return fields.map(field => {
      if (field.type === 'select' && field.relation) {
        const relation = relations[field.relation];
        return {
          ...field,
          options: relationData[field.relation]?.map(item => ({
            value: item.id,
            label: item[relation.labelField]
          })) || []
        };
      }
      return field;
    });
  };

  return (
    <div className="form-container">
      <h2>{id ? 'Modifier' : 'Créer'} {title}</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="form">
        {getEnhancedFields().map((field) => (
          <div className="form-group" key={field.field}>
            <label htmlFor={field.field}>{field.label}</label>
            
            {field.type === "select" ? (
              <select
                id={field.field}
                name={field.field}
                value={formData[field.field] || ''}
                onChange={handleChange}
                required={field.required !== false}
              >
                <option value="">Sélectionner {field.label}</option>
                {field.options?.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                id={field.field}
                name={field.field}
                value={formData[field.field] || ''}
                onChange={handleChange}
                required={field.required !== false}
              />
            ) : (
              <input
                type={field.type}
                id={field.field}
                name={field.field}
                value={formData[field.field] || ''}
                onChange={handleChange}
                required={field.required !== false}
              />
            )}
          </div>
        ))}

        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => navigate(`/dashboard/${endpoint}`)}
            className="button-secondary"
          >
            Annuler
          </button>
          <button 
            type="submit" 
            className="button-primary"
            disabled={loading}
          >
            {loading ? 'Enregistrement...' : (id ? 'Modifier' : 'Créer')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GenericForm;
