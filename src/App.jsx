import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import Navbar from './components/Navbar';
import { addToFavourites, removeFromFavourites, clearAllFavourites } from './utils/favourites';

export default function App() {
  const [favourites, setFavourites] = useState([]);

  const addFavourite = (id) => {
    setFavourites((prev) => addToFavourites(prev, id));
  };

  const removeFavourite = (id) => {
    setFavourites((prev) => removeFromFavourites(prev, id));
  };

  const clearFavourites = () => setFavourites(clearAllFavourites());

  return (
    <>
      <Navbar />

      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              favourites={favourites} 
              addFavourite={addFavourite} 
              removeFavourite={removeFavourite} 
              clearFavourites={clearFavourites}
            />
          } 
        />

        <Route 
          path="/property/:id" 
          element={
            <PropertyDetails 
              favourites={favourites} 
              addFavourite={addFavourite} 
              removeFavourite={removeFavourite} 
            />
          } 
        />
      </Routes>
    </>
  );
}