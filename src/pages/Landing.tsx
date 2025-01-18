import * as React from 'react';
import { NavLink } from 'react-router';

const LandingPage: React.FC = () => {
  const items: {
    heading: string;
    description: string;
    imageUrl: string;
  }[] = [
    {
      heading: 'What is Lorem Ipsum?',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      imageUrl:
        'https://icons.iconarchive.com/icons/itzikgur/my-seven/256/Fruits-Persimmon-icon.png',
    },
    {
      heading: 'What is Lorem Ipsum?',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      imageUrl:
        'https://icons.iconarchive.com/icons/iconarchive/flat-fruit-soft/256/Avocado-Flat-icon.png',
    },
    {
      heading: 'What is Lorem Ipsum?',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      imageUrl:
        'https://icons.iconarchive.com/icons/iconarchive/flat-fruit-soft/256/Apple-Red-Flat-icon.png',
    },
    {
      heading: 'What is Lorem Ipsum?',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      imageUrl:
        'https://icons.iconarchive.com/icons/iconarchive/flat-fruit-soft/256/Papaya-Flat-icon.png',
    },
    {
      heading: 'What is Lorem Ipsum?',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      imageUrl:
        'https://icons.iconarchive.com/icons/iconarchive/flat-fruit-soft/256/Grape-Flat-icon.png',
    },
    {
      heading: 'What is Lorem Ipsum?',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      imageUrl:
        'https://icons.iconarchive.com/icons/iconarchive/flat-fruit-soft/256/Coconut-Flat-icon.png',
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center p-14">
      <h1 className="text-4xl">Home Page</h1>
      <p className="text-xl mt-8">
        Something short and leading about the collection below - its contents,
        the creator, etc. Make it short and sweet, but not too short so folks do
        not simply skip over it entirely
      </p>
      <div className="flex gap-4 mt-10">
        <NavLink
          to={'/pricing'}
          className="bg-blue-700 hover:bg-blue-500 rounded-md px-6 py-1 text-lg text-white shadow-md"
        >
          Pricing
        </NavLink>
      </div>
      <div className="mt-14 grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-6">
        {items.map((item, index) => (
          <div key={index} className="rounded-lg shadow-lg">
            <div className="w-full flex justify-center">
              <img
                src={item.imageUrl}
                alt="thumbnail"
                className="object-contain"
              />
            </div>
            <div className="p-6">
              <h4>{item.heading}</h4>
              <p>{item.description}</p>
              <div className="flex gap-4 mt-4">
                <button className="bg-blue-700 hover:bg-blue-500 rounded-md px-6 py-1 text-lg text-white shadow-md">
                  View
                </button>
                <button className="text-blue-700 hover:text-blue-500">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
