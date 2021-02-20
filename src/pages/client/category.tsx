import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Restaurant } from '../../components/restaurant';
import { category, categoryVariables } from '../../__api__/category';
import { Category } from '../../components/category';
const CATEGORY_QUE = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        id
        name
        coverImg
        category {
          name
        }
        address
        isPromoted
      }
      category {
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
  }
`;
interface ICategoryForm {
  slug: string;
}
interface IFormProps {
  searchTerm: string;
}
export const CategoryPage = () => {
  const params = useParams<ICategoryForm>();
  const [page, setPage] = useState(1);
  const history = useHistory();
  const { register, handleSubmit, getValues } = useForm<IFormProps>();

  const { data, loading } = useQuery<category, categoryVariables>(CATEGORY_QUE, {
    variables: {
      input: {
        slug: params.slug,
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
            {data?.category.category?.coverImg ? (
              <Category
                id={data?.category.category.id + ''}
                coverImg={data?.category.category.coverImg}
                name={data?.category.category.name}
              />
            ) : null}
          </div>
          {/* Restaurants */}
          <div className="grid md:grid-cols-3 gap-x-5 gap-y-10 mt-16">
            {data?.category.restaurants?.map((restaurant) => (
              <Restaurant
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                key={restaurant.id}
                id={'' + restaurant.id}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
          <div className="flex justify-center items-center mt-10">
            {page > 1 && (
              <button className="text-2xl font-medium focus:outline-none" onClick={onClickPrevPage}>
                &larr;
              </button>
            )}
            <span className="mx-5">
              Pages {page} of {data?.category.totalPages}
            </span>
            {page !== data?.category.totalPages && (
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
