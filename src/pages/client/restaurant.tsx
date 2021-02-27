import { gql, useQuery, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Dish } from '../../components/dish';
import { restaurantQue, restaurantQueVariables } from '../../__api__/restaurantQue';
import { createOrderMu, createOrderMuVariables } from '../../__api__/createOrderMu';
import { CreateOrderItemInput } from '../../__api__/globalTypes';
import { DishOption } from '../../components/dish-option';

const CREATE_ORDER_MU = gql`
  mutation createOrderMu($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
      orderId
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
  const history = useHistory();
  const params = useParams<IPramsProps>();
  const { data, loading } = useQuery<restaurantQue, restaurantQueVariables>(RESTAURANT_QUE, {
    variables: {
      input: {
        restaurantId: +params.id,
      },
    },
  });
  const onCompleted = (data: createOrderMu) => {
    const {
      createOrder: { ok, orderId },
    } = data;
    if (ok) {
      alert('Created Order');
      history.push(`/orders/${orderId}`);
    }
  };
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
  const [createOrderMu, { loading: placingOrder }] = useMutation<createOrderMu, createOrderMuVariables>(
    CREATE_ORDER_MU,
    { onCompleted }
  );
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

  const addOptionToItem = (dishId: number, optionName: string) => {
    if (!isSelected(dishId)) {
      return;
    }
    const prevOrder = getItem(dishId);
    if (prevOrder) {
      const hasOption = Boolean(prevOrder?.options?.find((opt) => opt.name === optionName));
      if (!hasOption) {
        removeFromOrder(dishId);
        setOrderItems((cur) => [{ dishId, options: [{ name: optionName }, ...prevOrder.options!] }, ...cur]);
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
    return false;
  };
  const removeOptionFromitem = (dishId: number, optionName: string) => {
    if (!isSelected(dishId)) {
      return;
    }
    const prevOrder = getItem(dishId);
    if (prevOrder) {
      removeFromOrder(dishId);
      setOrderItems((cur) => [
        {
          dishId,
          options: prevOrder.options?.filter((option) => option.name !== optionName),
        },
        ...cur,
      ]);
      return;
    }
  };
  const triggerCancelOrder = () => {
    setOrderStarted(false);
    setOrderItems([]);
  };
  const triggerConfirmOrder = () => {
    if (placingOrder) {
      return;
    }
    if (orderItems.length === 0) {
      alert("Can't place empty order");
      return;
    }
    const ok = window.confirm('You are about to place an order');
    if (ok) {
      createOrderMu({
        variables: {
          input: {
            restaurantId: +params.id,
            items: orderItems,
          },
        },
      });
    }
  };
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
        {!orderStarted && (
          <button onClick={triggerStartOrder} className="btn px-10">
            Start Order
          </button>
        )}
        {orderStarted && (
          <div className="flex items-center">
            <button onClick={triggerConfirmOrder} className="mr-3 btn px-10">
              Confirm Order
            </button>
            <button onClick={triggerCancelOrder} className="btn bg-black hover:bg-black px-10">
              Cancel Order
            </button>
          </div>
        )}
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
                <DishOption
                  key={index}
                  addOptionToItem={addOptionToItem}
                  removeOptionFromItem={removeOptionFromitem}
                  dishId={dish.id}
                  option={option}
                  isSelected={isOptionSelected(dish.id, option.name)}
                />
              ))}
            </Dish>
          ))}
        </div>
      </div>
    </div>
  );
};
