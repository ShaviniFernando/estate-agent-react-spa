import { Link } from 'react-router-dom';

export default function PropertyCard({ property }) {
  return (
    <div className="property-card">
      <img src={property.images[0]} alt={property.shortDescription} />
      <div>
        <p>{property.type} - {property.bedrooms} bed</p>
        <h3>£{property.price.toLocaleString()}</h3>
        <p>{property.shortDescription}</p>
        <Link to={`/property/${property.id}`}>View details</Link>
      </div>
    </div>
  );
}
