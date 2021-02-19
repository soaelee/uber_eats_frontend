import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { restaurantsPageQuery, restaurantsPageQueryVariables } from '../../__api__/restaurantsPageQuery';

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImg
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

export const Restaurants = () => {
  const { data, loading } = useQuery<restaurantsPageQuery, restaurantsPageQueryVariables>(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });
  console.log(data);
  return (
    <div>
      <Helmet>
        <title>Restaurants | Suber Eats</title>
      </Helmet>
      <form className="bg-gray-800 w-full py-40 flex items-center justify-center">
        <input
          type="Search"
          className="input rounded-md border-0 w-6/12 md:w-4/12 lg:w-3/12"
          placeholder="Search Restaurants..."
        />
      </form>
      {!loading && (
        <div className="container mt-10">
          <div className="flex justify-around max-w-screen-sm mx-auto">
            {data?.allCategories.categories?.map((category) => (
              <div className="flex flex-col items-center cursor-pointer">
                <div
                  className="w-14 h-14 bg-cover rounded-full hover:opacity-70"
                  style={{ backgroundImage: `url(${category.coverImg})` }}
                ></div>
                <span className="mt-2 text-sm font-medium">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
