import { ApolloClient, createHttpLink, InMemoryCache, makeVar, split } from '@apollo/client';
import { LOCALSTORAGE_TOKEN } from './constants';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);

export const isLoggedInVar = makeVar(Boolean(token)); //false
export const authTokenVar = makeVar(token); //null

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      'x-jwt': authTokenVar() || '',
    },
  },
});

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'x-jwt': authTokenVar() || '',
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink, //true
  authLink.concat(httpLink) //false
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          token: {
            read() {
              return authTokenVar();
            },
          },
        },
      },
    },
  }),
});

// local state : graphql server(schema)에는 없지만 app에서는 다루는 field, state
// ex: login, logout state, 다크모드, 음량(volume)

// local state를 cache에 저장하는 방법 : typePolicies

//React variable : local state read and update
// - update: 해당 필드를 갖는 쿼리들이 자동으로 새로고침됨 ( WOW!!!!! COOL!!!! )
