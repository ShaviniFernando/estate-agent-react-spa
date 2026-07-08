import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route 
          path="/property/:id" 
          element={<PropertyDetails />} 
        />
      </Routes>
    </>
  );
}