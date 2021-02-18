import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';
import { loginMutation, loginMutationVariables } from '../__api__/loginMutation';

// const LOGIN_MUTATION = gql`
//   mutation loginMutation($email: String!, $password: String!) {
//     login(input: { email: $email, password: $password }) {
//       ok
//       error
//       token
//     }
//   }
// `;

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}
export const Login = () => {
  const { register, getValues, errors, handleSubmit } = useForm<ILoginForm>();
  const [loginMutation, { loading, error, data }] = useMutation<loginMutation, loginMutationVariables>(LOGIN_MUTATION);
  const onSubmit = () => {
    const { email, password } = getValues();
    loginMutation({
      variables: {
        loginInput: {
          email,
          password,
        },
      },
    });
  };
  return (
    <div className="bg-gray-800 h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-lg pb-7 pt-10 rounded-lg text-center">
        <h3 className="text-2xl text-gray-800">Log In</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-5 px-5">
          <input
            ref={register({ required: 'Email is required' })}
            className="input"
            name="email"
            type="email"
            required
            placeholder="Email"
          />
          {errors.email?.message && <FormError errormessage={errors.email?.message} />}
          <input
            ref={register({ required: 'Password is required', minLength: 7 })}
            name="password"
            type="password"
            required
            className="input"
            placeholder="Password"
          />
          {errors.password?.message && <FormError errormessage={errors.password?.message} />}
          {errors.password?.type === 'minLength' && <FormError errormessage={'Password musb be more thatn 7 chars'} />}
          <button className="mt-3 btn">Log In</button>
        </form>
      </div>
    </div>
  );
};
