import React from 'react';

interface IDishProps {
  name: string;
  description: string;
  price: number;
}
export const Dish: React.FC<IDishProps> = ({ name, description, price }) => {
  return (
    <div className="border hover:border-gray-800 transition-all py-4 px-8">
      <div className="mb-5">
        <h3 className="text-lg font-medium">{name}</h3>
        <h4 className="font-medium ">{description}</h4>
      </div>
      <span>${price}</span>
    </div>
  );
};
