import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Linking from '../../components/link';
import { Restaurant } from '../../components/restaurant';
import { Title } from '../../components/title';
import { myRestaurants } from '../../__api__/myRestaurants';

export const MY_RESTAURANTS_QUE = gql`
  query myRestaurants {
    myRestaurants {
      ok
      error
      restaurants {
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
    }
  }
`;

export const MyRestaurants = () => {
  const { data, loading } = useQuery<myRestaurants>(MY_RESTAURANTS_QUE);

  return (
    <div>
      <Helmet>My Restaurants | Suber-Eats</Helmet>
      <div className="container">
        <Title message="My Restaurants" />
        {data?.myRestaurants.ok && data?.myRestaurants.restaurants?.length === 0 ? (
          <>
            <h4 className="text-xl mb-5">You have no restaurants.</h4>
            <Linking to="/add-restaurant" message="Create one &rarr;" />
          </>
        ) : (
          <div>
            <div className="grid md:grid-cols-3 gap-x-5 gap-y-10 mt-16">
              {data?.myRestaurants.restaurants?.map((restaurant) => {
                return (
                  <Restaurant
                    to="owner"
                    coverImg={restaurant.coverImg}
                    name={restaurant.name}
                    key={restaurant.id}
                    id={'' + restaurant.id}
                    categoryName={restaurant.category?.name}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
