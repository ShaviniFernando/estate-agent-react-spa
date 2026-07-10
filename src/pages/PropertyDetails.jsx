import { useParams } from 'react-router-dom';
import properties from '../data/properties';

export default function PropertyDetails() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);

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
      <img src={property.images[0]} alt={property.shortDescription} />
      <div>
        <h2>{property.type}</h2>
        <h3>£{property.price.toLocaleString()}</h3>
        <p>Bedrooms: {property.bedrooms}</p>
        <p>{property.description}</p>
      </div>
    </div>
  );
}
