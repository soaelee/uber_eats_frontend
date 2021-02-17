import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { LoggedOutRouter } from './routers/logged-out-router';

//@client: graphql server가 아닌 cache에 요청
const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`
function App() {
  const {data} = useQuery(IS_LOGGED_IN);
  console.log(data);
  return <LoggedOutRouter/>;
}

export default App;
