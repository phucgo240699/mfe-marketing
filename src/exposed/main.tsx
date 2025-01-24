import './index.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { SuspenseLayer } from '@/components/SuspenseLayer';
import { NotFoundPage } from '@/pages/notFound';

const LandingPage = React.lazy(() => import('@/pages/landing'));
const PricingPage = React.lazy(() => import('@/pages/pricing'));

const App: React.FC = () => {
  return (
    <SuspenseLayer>
      <BrowserRouter>
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </SuspenseLayer>
  );
};

export default App;
