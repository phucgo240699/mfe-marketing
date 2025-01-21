import './index.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

const LandingPage = React.lazy(() => import('../pages/Landing'));
const PricingPage = React.lazy(() => import('../pages/Pricing'));

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/marketing">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
