import { useState } from 'react';
import properties from '../data/properties';
import PropertyList from '../components/PropertyList';
import FavouriteList from '../components/FavouriteList';
import { filterProperties } from '../utils/filterProperties';
import Select from 'react-select';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const typeOptions = [
  { value: 'Any', label: 'Any' },
  { value: 'House', label: 'House' },
  { value: 'Flat', label: 'Flat' }
];

export default function Home({ favourites, addFavourite, removeFavourite, clearFavourites }) {
  const [criteria, setCriteria] = useState({
    type: 'Any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcode: '',
    dateFrom: '',
    dateTo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCriteria((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredProperties = filterProperties(properties, criteria);

  return (
    <div>
      <h1>Home</h1>
      
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="type">Property Type</label>
          <Select
            inputId="type"
            options={typeOptions}
            value={typeOptions.find(opt => opt.value === criteria.type)}
            onChange={(selectedOption) => setCriteria(prev => ({...prev, type: selectedOption.value}))}
          />
        </div>

        <div style={{ minWidth: '250px' }}>
          <label>Price Range (£)</label>
          <Slider
            range
            min={0}
            max={1500000}
            step={5000}
            value={[Number(criteria.minPrice) || 0, Number(criteria.maxPrice) || 1500000]}
            onChange={(val) => setCriteria(prev => ({...prev, minPrice: val[0], maxPrice: val[1]}))}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.85rem', color: '#555' }}>
            <span>£{(Number(criteria.minPrice) || 0).toLocaleString()}</span>
            <span>£{(Number(criteria.maxPrice) || 1500000).toLocaleString()}</span>
          </div>
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

        <div>
          <label htmlFor="dateFrom">Added After</label>
          <input
            type="date"
            id="dateFrom"
            name="dateFrom"
            value={criteria.dateFrom}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="dateTo">Added Before</label>
          <input
            type="date"
            id="dateTo"
            name="dateTo"
            value={criteria.dateTo}
            onChange={handleChange}
          />
        </div>
      </form>

      <FavouriteList favourites={favourites} removeFavourite={removeFavourite} clearFavourites={clearFavourites} />

      <PropertyList 
        properties={filteredProperties} 
        favourites={favourites}
        addFavourite={addFavourite}
        removeFavourite={removeFavourite}
      />
    </div>
  );
}
