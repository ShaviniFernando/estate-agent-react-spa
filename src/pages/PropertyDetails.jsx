import { useParams } from 'react-router-dom';
import properties from '../data/properties';
import ImageGallery from '../components/ImageGallery';

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
      <ImageGallery images={property.images} />
      <div>
        <h2>{property.type}</h2>
        <h3>£{property.price.toLocaleString()}</h3>
        <p>Bedrooms: {property.bedrooms}</p>
        <p>{property.description}</p>
      </div>
    </div>
  );
}
