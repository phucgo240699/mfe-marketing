import './index.css';
import React from 'react';
import PricingPage from '../pages/Pricing';
import LandingPage from '../pages/Landing';
import { BrowserRouter, Route, Routes } from 'react-router';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
