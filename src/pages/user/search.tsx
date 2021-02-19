import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory, useLocation } from 'react-router-dom';
import { searchRestaurantQue, searchRestaurantQueVariables } from '../../__api__/searchRestaurantQue';

const SEARCH_RESTAURANTS_QUERY = gql`
  query searchRestaurantQue($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
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
    }
  }
`;

export const Search = () => {
  const location = useLocation();
  const history = useHistory();
  const [callQuery, { data, loading }] = useLazyQuery<searchRestaurantQue, searchRestaurantQueVariables>(
    SEARCH_RESTAURANTS_QUERY
  );
  useEffect(() => {
    const [_, query] = location.search.split('term=');
    if (!query) {
      history.replace('/');
    }
    callQuery({
      variables: {
        input: {
          page: 1,
          query,
        },
      },
    });
  }, [history, location, callQuery]);
  console.log(data);

  return (
    <div>
      <Helmet>
        <title>Search | Suber Eats</title>
      </Helmet>
      Search
    </div>
  );
};
