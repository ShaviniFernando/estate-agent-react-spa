import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import Navbar from './components/Navbar';

export default function App() {
  const [favourites, setFavourites] = useState([]);

  const addFavourite = (id) => {
    setFavourites((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  };

  const removeFavourite = (id) => {
    setFavourites((prev) => prev.filter((favId) => favId !== id));
  };

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