import { Link } from 'react-router-dom';

export default function PropertyCard({ property, favourites, addFavourite, removeFavourite }) {
  const isFav = favourites.includes(property.id);
  const handleClick = () => {
    if (isFav) {
      removeFavourite(property.id);
    } else {
      addFavourite(property.id);
    }
  };

  return (
    <div 
      className="property-card"
      draggable="true"
      onDragStart={(e) => e.dataTransfer.setData('text/plain', property.id)}
    >
      <img src={property.images[0]} alt={property.shortDescription} />
      <div>
        <p>{property.type} - {property.bedrooms} bed</p>
        <h3>£{property.price.toLocaleString()}</h3>
        <p>{property.shortDescription}</p>
        <button onClick={handleClick}>
          {isFav ? '★ Remove from favourites' : '☆ Add to favourites'}
        </button>
        <Link to={`/property/${property.id}`}>View details</Link>
      </div>
    </div>
  );
}
