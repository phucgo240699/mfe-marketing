import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import PricingPage from './pages/Pricing';
import LandingPage from './pages/Landing';

const App = () => {
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
