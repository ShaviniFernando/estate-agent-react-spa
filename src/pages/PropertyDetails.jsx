import { useState } from 'react';
import { useParams } from 'react-router-dom';
import properties from '../data/properties';
import ImageGallery from '../components/ImageGallery';

export default function PropertyDetails() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);
  const [activeTab, setActiveTab] = useState('description');

  if (!property) {
    return (
      <div>
        <h1>Property not found</h1>
      </div>
    );
  }

  return (
    <div className="property-details">
      <h1>{property.location}</h1>
      <ImageGallery images={property.images} />
      <div>
        <h2>{property.type}</h2>
        <h3>£{property.price.toLocaleString()}</h3>
        <p>Bedrooms: {property.bedrooms}</p>
      </div>

      <div className="tab-buttons">
        <button
          className={`tab-button${activeTab === 'description' ? ' active' : ''}`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </button>
        <button
          className={`tab-button${activeTab === 'floorplan' ? ' active' : ''}`}
          onClick={() => setActiveTab('floorplan')}
        >
          Floor Plan
        </button>
        <button
          className={`tab-button${activeTab === 'map' ? ' active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          Map
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'description' && (
          <p>{property.description}</p>
        )}
        {activeTab === 'floorplan' && (
          <img src={property.floorplan} alt="Floor plan" />
        )}
        {activeTab === 'map' && (
          <iframe
            src={property.mapEmbedUrl}
            width="100%"
            height="400"
            title="Property location map"
          ></iframe>
        )}
      </div>
    </div>
  );
}
