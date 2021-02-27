import React from 'react';

interface IDishOptionProps {
  addOptionToItem: (id: number, option: any) => void;
  removeOptionFromItem: (id: number, optionName: string) => void;
  dishId: number;
  option: any;
  isSelected: boolean;
}
export const DishOption: React.FC<IDishOptionProps> = ({
  addOptionToItem,
  removeOptionFromItem,
  dishId,
  option,
  isSelected,
}) => {
  const onClick = () => {
    if (!isSelected) {
      addOptionToItem(dishId, option.name);
    } else {
      removeOptionFromItem(dishId, option.name);
    }
  };
  return (
    <span onClick={onClick} className={`border px-2 py-1 ${isSelected ? 'border-gray-800' : 'hover:border-gray-800'}`}>
      <span className="mr-2">{option.name}</span>
      {option.extra && <span className="text-sm opacity-75">(${option.extra})</span>}
    </span>
  );
};
