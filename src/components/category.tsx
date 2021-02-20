import React from 'react';

interface ICategoryProps {
  id?: string;
  coverImg: string;
  name: string;
}
export const Category: React.FC<ICategoryProps> = ({ id, coverImg, name }) => {
  return (
    <div className="flex flex-col items-center cursor-pointer group">
      <div
        className="w-14 h-14 bg-cover rounded-full group-hover:opacity-70"
        style={{ backgroundImage: `url(${coverImg})` }}
      ></div>
      <span className="mt-2 text-sm font-medium">{name}</span>
    </div>
  );
};
