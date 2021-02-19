import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Category } from '../../components/category';
import { Restaurant } from '../../components/restaurant';
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

interface IFormProps {
  searchTerm: string;
}

export const Restaurants = () => {
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const [page, setPage] = useState(1);
  const history = useHistory();
  const { data, loading } = useQuery<restaurantsPageQuery, restaurantsPageQueryVariables>(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });

  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    console.log(searchTerm);
    history.push({
      pathname: '/search',
      search: `?term=${searchTerm}`,
    });
  };
  const onClickNextPage = () => {
    setPage((page) => page + 1);
  };

  const onClickPrevPage = () => {
    setPage((page) => page - 1);
  };
  return (
    <div>
      <Helmet>
        <title>Home | Suber Eats</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        className="bg-gray-800 w-full py-40 flex items-center justify-center"
      >
        <input
          ref={register({ required: true, min: 2 })}
          type="Search"
          name="searchTerm"
          className="input rounded-md border-0 w-6/12 md:w-4/12 lg:w-3/12"
          placeholder="Search Restaurants..."
        />
      </form>
      {!loading && (
        <div className="container mt-10 pb-20">
          {/* Categories */}
          <div className="flex justify-around max-w-screen-sm mx-auto">
            {data?.allCategories.categories?.map((category) => {
              if (category.coverImg) {
                return (
                  <Category key={category.id} id={category.id + ''} coverImg={category.coverImg} name={category.name} />
                );
              }
            })}
          </div>
          {/* Restaurants */}
          <div className="grid md:grid-cols-3 gap-x-5 gap-y-10 mt-16">
            {data?.restaurants.results?.map((restaurant) => {
              return (
                <Restaurant
                  coverImg={restaurant.coverImg}
                  name={restaurant.name}
                  key={restaurant.id}
                  id={'' + restaurant.id}
                  categoryName={restaurant.category?.name}
                />
              );
            })}
          </div>
          <div className="flex justify-center items-center mt-10">
            {page > 1 && (
              <button className="text-2xl font-medium focus:outline-none" onClick={onClickPrevPage}>
                &larr;
              </button>
            )}
            <span className="mx-5">
              Pages {page} of {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages && (
              <button className="text-2xl font-medium focus:outline-none" onClick={onClickNextPage}>
                &rarr;
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
