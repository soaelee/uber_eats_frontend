import React from 'react';
import { Link } from 'react-router-dom';

interface IRestaurantProps {
  coverImg: string;
  name: string;
  categoryName?: string;
  id: string;
  to?: string;
}
export const Restaurant: React.FC<IRestaurantProps> = ({ coverImg, name, categoryName, id, to }) => {
  return (
    <Link to={to ? `/my-restaurant/${id}` : `/restaurants/${id}`}>
      <div className="flex flex-col">
        <div className="bg-red-500 py-28 bg-cover bg-center mb-2" style={{ backgroundImage: `url(${coverImg})` }}></div>
        <h3 className="text-xl font-medium">{name}</h3>
        <span className="border-t mt-2 py-2 text-sm opacity-50 border-gray-200">{categoryName}</span>
      </div>
    </Link>
  );
};

//css
//container => grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 mt-16
