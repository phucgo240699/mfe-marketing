import * as React from 'react';
import { Link } from 'react-router';

const PricingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-14">
      <h1 className="text-4xl">Pricing</h1>
      <p className="text-xl mt-8">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book
      </p>
      <div className="flex gap-4 mt-10">
        <Link
          to={'/'}
          className="bg-blue-700 rounded-md px-6 py-1 text-lg text-white shadow-md"
        >
          Landing
        </Link>
      </div>
    </div>
  );
};

export default PricingPage;
