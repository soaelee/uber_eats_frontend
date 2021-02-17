import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read(){
              return Boolean(localStorage.getItem("token"))
            }
          }
        }
      }
    }
  })
})


// local state : graphql server(schema)에는 없지만 app에서는 다루는 field, state
// ex: login, logout state, 다크모드, 음량(volume)

// local state를 cache에 저장하는 방법 : typePolicies