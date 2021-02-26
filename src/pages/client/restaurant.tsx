import { gql, useQuery, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Dish } from '../../components/dish';
import { restaurantQue, restaurantQueVariables } from '../../__api__/restaurantQue';
import { createOrderMu, createOrderMuVariables } from '../../__api__/createOrderMu';
import { CreateOrderItemInput } from '../../__api__/globalTypes';

const CREATE_ORDER_MU = gql`
  mutation createOrderMu($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
    }
  }
`;

const RESTAURANT_QUE = gql`
  query restaurantQue($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      restaurant {
        id
        name
        coverImg
        category {
          name
          slug
        }
        address
        isPromoted
        menu {
          id
          name
          photo
          price
          options {
            name
            extra
          }
          description
        }
      }
      error
    }
  }
`;
interface IPramsProps {
  id: string;
}
export const Restaurant = () => {
  const params = useParams<IPramsProps>();
  const { data, loading } = useQuery<restaurantQue, restaurantQueVariables>(RESTAURANT_QUE, {
    variables: {
      input: {
        restaurantId: +params.id,
      },
    },
  });
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
  const [createOrderMu] = useMutation<createOrderMu, createOrderMuVariables>(CREATE_ORDER_MU);
  const [orderStarted, setOrderStarted] = useState(false);
  const isSelected = (dishId: number) => {
    return Boolean(orderItems.find((order) => order.dishId === dishId));
  };
  const triggerStartOrder = () => {
    setOrderStarted(true);
  };
  const addItemToOrder = (dishId: number) => {
    setOrderItems((cur) => [{ dishId, options: [] }, ...cur]);
  };
  const removeFromOrder = (dishId: number) => {
    setOrderItems((cur) => cur.filter((item) => item.dishId !== dishId));
  };

  const getItem = (dishId: number) => {
    return orderItems.find((order) => order.dishId === dishId);
  };

  const addOptionToItem = (dishId: number, option: any) => {
    if (!isSelected(dishId)) {
      return;
    }
    const prevOrder = getItem(dishId);
    if (prevOrder) {
      const hasOption = Boolean(prevOrder?.options?.find((opt) => opt.name === option.name));
      if (!hasOption) {
        removeFromOrder(dishId);
        setOrderItems((cur) => [{ dishId, options: [option, ...prevOrder.options!] }, ...cur]);
      }
    }
  };
  const getOptionFromItem = (item: CreateOrderItemInput, optionName: string) => {
    return item.options?.find((option) => option.name === optionName);
  };
  const isOptionSelected = (dishId: number, optionName: string) => {
    const item = getItem(dishId);
    if (item) {
      return Boolean(getOptionFromItem(item, optionName));
    }
  };
  console.log(orderItems);
  return (
    <div>
      <div
        className="bg-gray-800 py-32 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${data?.restaurant.restaurant?.coverImg})` }}
      >
        <div className="bg-white w-2/5 pl-4 lg:w-2/5 lg:pl-20 py-8">
          <h4 className="text-2xl mb-3">{data?.restaurant.restaurant?.name}</h4>
          <Link to={`/category/${data?.restaurant.restaurant?.category?.slug}`}>
            <h5 className="text-sm font-light mb-2">{data?.restaurant.restaurant?.category?.name}</h5>
          </Link>
          <h6 className="text-sm font-light">{data?.restaurant.restaurant?.address}</h6>
        </div>
      </div>
      <div className="container pb-32 flex flex-col items-end mt-20">
        <button onClick={triggerStartOrder} className="btn px-10">
          {orderStarted ? 'Ordering' : 'Start Order'}
        </button>
        <div className="w-full grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
          {data?.restaurant.restaurant?.menu.map((dish, index) => (
            <Dish
              isSelected={isSelected(dish.id)}
              id={dish.id}
              orderStarted={orderStarted}
              key={index}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              isCustomer={true}
              options={dish.options}
              addItemToOrder={addItemToOrder}
              removeFromOrder={removeFromOrder}
            >
              {dish.options?.map((option, index) => (
                <span
                  onClick={() =>
                    addOptionToItem
                      ? addOptionToItem(dish.id, {
                          name: option.name,
                        })
                      : null
                  }
                  className={`flex border items-center ${
                    isOptionSelected(dish.id, option.name) ? 'border-gray-800' : ''
                  }`}
                  key={index}
                >
                  <h6 className="mr-2">{option.name}</h6>
                  <h6 className="text-sm opacity-75">(${option.extra})</h6>
                </span>
              ))}
            </Dish>
          ))}
        </div>
      </div>
    </div>
  );
};
