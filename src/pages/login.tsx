import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';
import { loginMu, loginMuVariables } from '../__api__/loginMu';
import logo from '../images/logo.png';
import { Button } from '../components/button';
import { Link } from 'react-router-dom';

const LOGIN_MUTATION = gql`
  mutation loginMu($input: LoginInput!) {
    login(input: $input) {
      ok
      error
      token
    }
  }
`;
// output : data{login{token, error, ok}}

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, getValues, errors, handleSubmit, formState } = useForm<ILoginForm>({
    mode: 'onChange',
  });

  const onCompleted = (data: loginMu) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      console.log(token);
    }
  };
  const [loginMu, { data: isLogin, loading }] = useMutation<loginMu, loginMuVariables>(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (!loading) {
      //mutation을 한번만 호출
      const { email, password } = getValues();
      loginMu({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
    }
  };
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <img src={logo} alt="logo" className="w-52 mb-10" />
        <h4 className="w-full text-left text-3xl font-medium">Welcome back</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-5 w-full mb-5">
          <input
            ref={register({ required: 'Email is required' })}
            name="email"
            type="email"
            required
            placeholder="Email"
            className="input"
          />
          {errors.email?.message && <FormError errormessage={errors.email?.message} />}
          <input
            ref={register({ required: 'Password is required', minLength: 3 })}
            name="password"
            type="password"
            required
            className="input"
            placeholder="Password"
          />
          {errors.password?.message && <FormError errormessage={errors.password?.message} />}
          {errors.password?.type === 'minLength' && <FormError errormessage={'Password musb be more thatn 3 chars'} />}
          <Button canClick={formState.isValid} actionText="Log in" loading={loading} />
          {isLogin?.login.error && <FormError errormessage={isLogin.login.error} />}
        </form>
        <div>
          New to Suber?{' '}
          <Link to="/signup" className="text-lime-600 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
