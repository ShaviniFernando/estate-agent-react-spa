import PropertyCard from './PropertyCard';

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
