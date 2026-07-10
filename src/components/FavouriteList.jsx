import properties from '../data/properties';

export default function FavouriteList({ favourites, removeFavourite }) {
  if (favourites.length === 0) {
    return <p>No favourites yet.</p>;
  }

  return (
    <ul className="favourite-list">
      {favourites.map((id) => {
        const property = properties.find((p) => p.id === id);
        if (!property) return null;
        return (
          <li key={id}>
            <span>{property.shortDescription} — {property.location}</span>
            <button onClick={() => removeFavourite(id)}>Remove</button>
          </li>
        );
      })}
    </ul>
  );
}
