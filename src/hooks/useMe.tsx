import { gql, useQuery } from '@apollo/client';
import { meQuery } from '../__api__/meQuery';

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const useMe = () => {
  return useQuery<meQuery>(ME_QUERY);
  // data, error, loading
  // id, email, role, verified 정보 가져올 수 있음
};

// cache를 먼저 사용하기 때문에, 여러 컴포넌트에서 불러도
// 네트워크에서는 한번만 부르게 된다.
