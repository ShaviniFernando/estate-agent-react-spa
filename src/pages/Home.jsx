import { useState } from 'react';
import properties from '../data/properties';
import PropertyList from '../components/PropertyList';
import FavouriteList from '../components/FavouriteList';

export default function Home({ favourites, addFavourite, removeFavourite }) {
  const [criteria, setCriteria] = useState({
    type: 'Any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCriteria((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredProperties = properties.filter((property) => {
    if (criteria.type && criteria.type !== 'Any') {
      if (property.type !== criteria.type) {
        return false;
      }
    }
    if (criteria.minPrice !== '') {
      if (property.price < Number(criteria.minPrice)) {
        return false;
      }
    }
    if (criteria.maxPrice !== '') {
      if (property.price > Number(criteria.maxPrice)) {
        return false;
      }
    }
    if (criteria.minBedrooms !== '') {
      if (property.bedrooms < Number(criteria.minBedrooms)) {
        return false;
      }
    }
    if (criteria.maxBedrooms !== '') {
      if (property.bedrooms > Number(criteria.maxBedrooms)) {
        return false;
      }
    }
    if (criteria.postcode !== '') {
      if (!property.postcode.toLowerCase().startsWith(criteria.postcode.toLowerCase())) {
        return false;
      }
    }
    return true;
  });

  return (
    <div>
      <h1>Home</h1>
      
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="type">Property Type</label>
          <select
            id="type"
            name="type"
            value={criteria.type}
            onChange={handleChange}
          >
            <option value="Any">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        <div>
          <label htmlFor="minPrice">Min Price (£)</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            value={criteria.minPrice}
            onChange={handleChange}
            placeholder="Min Price"
          />
        </div>

        <div>
          <label htmlFor="maxPrice">Max Price (£)</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={criteria.maxPrice}
            onChange={handleChange}
            placeholder="Max Price"
          />
        </div>

        <div>
          <label htmlFor="minBedrooms">Min Bedrooms</label>
          <input
            type="number"
            id="minBedrooms"
            name="minBedrooms"
            value={criteria.minBedrooms}
            onChange={handleChange}
            placeholder="Min Bedrooms"
          />
        </div>

        <div>
          <label htmlFor="maxBedrooms">Max Bedrooms</label>
          <input
            type="number"
            id="maxBedrooms"
            name="maxBedrooms"
            value={criteria.maxBedrooms}
            onChange={handleChange}
            placeholder="Max Bedrooms"
          />
        </div>

        <div>
          <label htmlFor="postcode">Postcode Area</label>
          <input
            type="text"
            id="postcode"
            name="postcode"
            value={criteria.postcode}
            onChange={handleChange}
            placeholder="e.g. BR5"
          />
        </div>
      </form>

      <FavouriteList favourites={favourites} removeFavourite={removeFavourite} />

      <PropertyList 
        properties={filteredProperties} 
        favourites={favourites}
        addFavourite={addFavourite}
        removeFavourite={removeFavourite}
      />
    </div>
  );
}
