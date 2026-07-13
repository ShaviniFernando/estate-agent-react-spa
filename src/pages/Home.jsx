import { useState } from 'react';
import properties from '../data/properties';
import PropertyList from '../components/PropertyList';
import FavouriteList from '../components/FavouriteList';
import { filterProperties } from '../utils/filterProperties';
import Select from 'react-select';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const parseDateString = (dateStr) => {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split('-');
  return new Date(year, month - 1, day);
};

const typeOptions = [
  { value: 'Any', label: 'Any' },
  { value: 'House', label: 'House' },
  { value: 'Flat', label: 'Flat' }
];

const bedroomOptions = [
  { value: '', label: 'Any' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6+' }
];

const postcodeOptions = [
  { value: '', label: 'Any' },
  ...Array.from(new Set(properties.map(p => p.postcode))).sort().map(pc => ({
    value: pc,
    label: pc
  }))
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

  const handleDateChange = (name, date) => {
    if (!date) {
      setCriteria(prev => ({ ...prev, [name]: '' }));
      return;
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    setCriteria(prev => ({ ...prev, [name]: `${year}-${month}-${day}` }));
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

        <div className="price-range-field">
          <label>Price Range (Rs.)</label>
          <Slider
            range
            min={0}
            max={1500000}
            step={5000}
            value={[Number(criteria.minPrice) || 0, Number(criteria.maxPrice) || 1500000]}
            onChange={(val) => setCriteria(prev => ({...prev, minPrice: val[0], maxPrice: val[1]}))}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.85rem', color: '#555' }}>
            <span>Rs. {(Number(criteria.minPrice) || 0).toLocaleString()}</span>
            <span>Rs. {(Number(criteria.maxPrice) || 1500000).toLocaleString()}</span>
          </div>
        </div>

        <div>
          <label htmlFor="minBedrooms">Min Bedrooms</label>
          <Select
            inputId="minBedrooms"
            options={bedroomOptions}
            value={bedroomOptions.find(opt => opt.value === criteria.minBedrooms) || bedroomOptions[0]}
            onChange={(selectedOption) => setCriteria(prev => ({...prev, minBedrooms: selectedOption.value}))}
          />
        </div>

        <div>
          <label htmlFor="maxBedrooms">Max Bedrooms</label>
          <Select
            inputId="maxBedrooms"
            options={bedroomOptions}
            value={bedroomOptions.find(opt => opt.value === criteria.maxBedrooms) || bedroomOptions[0]}
            onChange={(selectedOption) => setCriteria(prev => ({...prev, maxBedrooms: selectedOption.value}))}
          />
        </div>

        <div>
          <label htmlFor="postcode">Postcode Area</label>
          <Select
            inputId="postcode"
            options={postcodeOptions}
            value={postcodeOptions.find(opt => opt.value === criteria.postcode) || postcodeOptions[0]}
            onChange={(selectedOption) => setCriteria(prev => ({...prev, postcode: selectedOption.value}))}
          />
        </div>

        <div>
          <label htmlFor="dateFrom">Added After</label>
          <DatePicker
            id="dateFrom"
            selected={parseDateString(criteria.dateFrom)}
            onChange={(date) => handleDateChange('dateFrom', date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="YYYY-MM-DD"
            isClearable
          />
        </div>

        <div>
          <label htmlFor="dateTo">Added Before</label>
          <DatePicker
            id="dateTo"
            selected={parseDateString(criteria.dateTo)}
            onChange={(date) => handleDateChange('dateTo', date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="YYYY-MM-DD"
            isClearable
          />
        </div>
      </form>

      <FavouriteList favourites={favourites} addFavourite={addFavourite} removeFavourite={removeFavourite} clearFavourites={clearFavourites} />

      <PropertyList 
        properties={filteredProperties} 
        favourites={favourites}
        addFavourite={addFavourite}
        removeFavourite={removeFavourite}
      />
    </div>
  );
}
