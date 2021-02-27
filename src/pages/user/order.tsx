import { gql, useQuery } from '@apollo/client';
import React from 'react';
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
  console.log(data);
  console.log(id);
  return (
    <div>
      <span>Order</span>
    </div>
  );
};
