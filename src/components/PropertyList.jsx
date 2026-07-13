import PropertyCard from './PropertyCard';

// Iterates through an array of properties and renders a PropertyCard for each one
export default function PropertyList({ properties, favourites, addFavourite, removeFavourite }) {
  return (
    <div className="property-grid">
      {properties.map((property) => (
        <PropertyCard 
          key={property.id} 
          property={property} 
          favourites={favourites}
          addFavourite={addFavourite}
          removeFavourite={removeFavourite}
        />
      ))}
    </div>
  );
}
