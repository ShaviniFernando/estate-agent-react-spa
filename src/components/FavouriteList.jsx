import properties from '../data/properties';

export default function FavouriteList({ favourites, addFavourite, removeFavourite, clearFavourites }) {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropOnList = (e) => {
    e.preventDefault();
    const raw = e.dataTransfer.getData('text/plain');
    // Only add if dragged from a property card (prefixed with "card:")
    if (raw.startsWith('card:')) {
      addFavourite(raw.slice(5));
    }
  };

  const handleDropOnRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const raw = e.dataTransfer.getData('text/plain');
    // Only remove if dragged from the favourites list (prefixed with "fav:")
    if (raw.startsWith('fav:')) {
      removeFavourite(raw.slice(4));
    }
  };

  return (
    <div
      className="favourites-dropzone"
      onDragOver={handleDragOver}
      onDrop={handleDropOnList}
    >
      <h3>⭐ Favourites</h3>
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
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', `fav:${id}`);
                    e.dataTransfer.effectAllowed = 'move';
                  }}
                >
                  <span>{property.shortDescription} — {property.location}</span>
                  <button onClick={() => removeFavourite(id)}>Remove</button>
                </li>
              );
            })}
          </ul>
          <div
            className="remove-dropzone"
            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onDrop={handleDropOnRemove}
          >
            🗑 Drag here to remove
          </div>
        </>
      )}
    </div>
  );
}
