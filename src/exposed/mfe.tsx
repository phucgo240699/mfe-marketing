import './index.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { SuspenseLayer } from '@/components/SuspenseLayer';

const LandingPage = React.lazy(() => import('@/pages/landing'));
const PricingPage = React.lazy(() => import('@/pages/pricing'));

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/marketing">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/pricing"
          element={
            <SuspenseLayer>
              <PricingPage />
            </SuspenseLayer>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
