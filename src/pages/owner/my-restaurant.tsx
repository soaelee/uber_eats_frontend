import { gql, useQuery } from '@apollo/client';
import { data } from 'autoprefixer';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Linking from '../../components/link';
import { Title } from '../../components/title';
import { myRestaurant, myRestaurantVariables } from '../../__api__/myRestaurant';

const MY_RESTAURANT_QUE = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
      ok
      error
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
          price
          photo
          description
          options {
            name
            extra
            choices {
              name
              extra
            }
          }
        }
      }
    }
  }
`;

interface IParams {
  id: string;
}

export const MyRestaurant = () => {
  const { id } = useParams<IParams>();
  const { data } = useQuery<myRestaurant, myRestaurantVariables>(MY_RESTAURANT_QUE, {
    variables: {
      input: {
        id: +id,
      },
    },
  });
  return (
    <div>
      <div
        className="bg-red-500 w-full py-24 bg-cover bg-center"
        style={{ backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})` }}
      ></div>
      <div className="container mt-10">
        {data?.myRestaurant.restaurant?.name && <Title message={data?.myRestaurant.restaurant?.name} />}
        <div className="mt-10">
          <Link to={`/add-dish/${data?.myRestaurant.restaurant?.id}`} className="mr-2 text-white py-3 px-8 bg-gray-800">
            Add Dish &rarr;
          </Link>
          <Link to={``} className="text-white py-3 px-8 bg-lime-700">
            Buy Promotion &rarr;
          </Link>
        </div>
        <div className="mt-8">
          {data?.myRestaurant.restaurant?.menu?.length === 0 ? (
            <>
              <h4 className="text-xl mb-5">Please upload a dish.</h4>
              <Linking to={`/add-dish/${data?.myRestaurant.restaurant?.id}`} message="Create order &rarr;" />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
