import properties from '../data/properties';

export default function FavouriteList({ favourites, addFavourite, removeFavourite, clearFavourites }) {
  return (
    <div
      className="favourites-dropzone"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const id = e.dataTransfer.getData('text/plain');
        addFavourite(id);
      }}
    >
      {favourites.length === 0 ? (
        <p>No favourites yet. Drag a property card here to add it!</p>
      ) : (
        <>
          <button onClick={clearFavourites}>Clear all</button>
          <ul className="favourite-list">
            {favourites.map((id) => {
              const property = properties.find((p) => p.id === id);
              if (!property) return null;
              return (
                <li
                  key={id}
                  draggable="true"
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', id)}
                >
                  <span>{property.shortDescription} — {property.location}</span>
                  <button onClick={() => removeFavourite(id)}>Remove</button>
                </li>
              );
            })}
          </ul>
          <div
            className="remove-dropzone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const id = e.dataTransfer.getData('text/plain');
              removeFavourite(id);
            }}
          >
            🗑 Drag here to remove
          </div>
        </>
      )}
    </div>
  );
}
