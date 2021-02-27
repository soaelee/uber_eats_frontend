import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { getOrderQu, getOrderQuVariables } from '../../__api__/getOrderQu';

const GET_ORDER = gql`
  query getOrderQu($input: GetOrderInput!) {
    getOrder(input: $input) {
      ok
      error
      order {
        id
        createdAt
        updateAt
        customer {
          email
        }
        driver {
          email
        }
        restaurant {
          name
        }
        total
        status
      }
    }
  }
`;
interface IParams {
  id: string;
}
export const Order = () => {
  const { id } = useParams<IParams>();
  const { data } = useQuery<getOrderQu, getOrderQuVariables>(GET_ORDER, {
    variables: {
      input: {
        id: +id,
      },
    },
  });
  return (
    <div className="container mt-32 flex justify-center ">
      <Helmet>
        <title>Order #{id} | Suber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm justify-center border border-gray-800 flex flex-col">
        <h4 className="bg-gray-800 w-full py-5 text-white text-center text-xl">Order #{id}</h4>
        <h5 className="p-5 py-10 text-3xl text-center">${data?.getOrder.order?.total}</h5>
        <div className="p-6 text-xl grid gap-6">
          <div className="border-t pt-5 border-gray-700">
            Prepared By: <span className="font-medium">{data?.getOrder.order?.restaurant?.name}</span>
          </div>
          <div className="border-t pt-5 border-gray-700 ">
            Deliver To: <span className="font-medium">{data?.getOrder.order?.customer?.email}</span>
          </div>
          <div className="border-t border-b py-5 border-gray-700">
            Driver: <span className="font-medium">{data?.getOrder.order?.driver?.email || 'Not yet.'}</span>
          </div>
        </div>
        <span className=" text-center mt-5 mb-3  text-2xl text-lime-600">Status: {data?.getOrder.order?.status}</span>
      </div>
    </div>
  );
};
