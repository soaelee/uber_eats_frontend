import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { category, categoryVariables } from '../../__api__/category';

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
export const Category = () => {
  const params = useParams<ICategoryForm>();
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<category, categoryVariables>(CATEGORY_QUE, {
    variables: {
      input: {
        slug: params.slug,
        page,
      },
    },
  });
  return (
    <div>
      <h1>Category</h1>
    </div>
  );
};
