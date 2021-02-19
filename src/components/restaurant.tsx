import React from 'react';

interface IRestaurantProps {
  coverImg: string;
  name: string;
  categoryName?: string;
  id: string;
}
export const Restaurant: React.FC<IRestaurantProps> = ({ coverImg, name, categoryName, id }) => {
  return (
    <div className="flex flex-col">
      <div className="bg-red-500 py-28 bg-cover bg-center mb-2" style={{ backgroundImage: `url(${coverImg})` }}></div>
      <h3 className="text-xl font-medium">{name}</h3>
      <span className="border-t mt-2 py-2 text-sm opacity-50 border-gray-200">{categoryName}</span>
    </div>
  );
};

//css
//container => grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 mt-16
