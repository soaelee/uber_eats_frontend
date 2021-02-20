import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { restaurantQue, restaurantQueVariables } from '../../__api__/restaurantQue';

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
  console.log(data);
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
    </div>
  );
};
