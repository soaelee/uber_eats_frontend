import React from 'react';
import { restaurantQue_restaurant_restaurant_menu_options } from '../__api__/restaurantQue';

interface IDishProps {
  id?: number;
  name: string;
  description: string;
  price: number;
  isCustomer?: boolean;
  orderStarted?: boolean;
  addItemToOrder?: (dishId: number) => void;
  removeFromOrder?: (dishId: number) => void;
  isSelected?: boolean;
  options?: restaurantQue_restaurant_restaurant_menu_options[] | null;
}
export const Dish: React.FC<IDishProps> = ({
  id = 0,
  name,
  description,
  price,
  isCustomer = false,
  options,
  orderStarted = false,
  addItemToOrder,
  removeFromOrder,
  isSelected = false,
  children: dishOptions,
}) => {
  const onClick = () => {
    if (orderStarted) {
      if (!isSelected && addItemToOrder) {
        return addItemToOrder(id);
      }
      if (isSelected && removeFromOrder) {
        return removeFromOrder(id);
      }
    }
  };
  return (
    <div
      className={`px-8 py-4 border cursor-pointer  transition-all ${
        isSelected ? 'border-gray-800' : ' hover:border-gray-800'
      }`}
    >
      <div className="mb-5">
        <h3 className="text-lg font-medium flex justify-between items-center">
          {name}{' '}
          {orderStarted && (
            <button className="btn px-5 rounded py-2" onClick={onClick}>
              {isSelected ? 'Remove' : 'Add'}
            </button>
          )}
        </h3>
        <h4 className="font-medium">{description}</h4>
      </div>
      <span>${price}</span>
      {isCustomer && options?.length !== 0 && (
        <div>
          <h5 className="mt-8 mb-3 font-medium">Dish Options:</h5>
          {dishOptions}
        </div>
      )}
    </div>
  );
};
