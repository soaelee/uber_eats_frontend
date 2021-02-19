import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';
import logo from '../images/logo.png';
import { Button } from '../components/button';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { signupMu, signupMuVariables } from '../__api__/signupMu';
import { UserRole } from '../__api__/globalTypes';
import Linking from '../components/link';
import { Title } from '../components/title';

const SIGNUP_MUTATION = gql`
  mutation signupMu($input: CreateAccountInput!) {
    createAccount(input: $input) {
      ok
      error
    }
  }
`;
// output : data{createAccount{error, ok}}

interface ISignupForm {
  email: string;
  password: string;
  role: UserRole;
}

export const Signup = () => {
  const history = useHistory();
  const { register, getValues, errors, handleSubmit, formState } = useForm<ISignupForm>({
    mode: 'onChange',
    defaultValues: {
      role: UserRole.Client,
    },
  });

  const onCompleted = (data: signupMu) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      //redirect user
      alert('Account created! Log in now!');
      history.push('/');
    }
  };
  const [signupMu, { data: isSignup, loading }] = useMutation<signupMu, signupMuVariables>(SIGNUP_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (!loading) {
      //mutation을 한번만 호출
      const { email, password, role } = getValues();
      signupMu({
        variables: {
          input: {
            email,
            password,
            role,
          },
        },
      });
    }
  };
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Signup | Suber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <img src={logo} alt="logo" className="w-52 mb-10" />
        <Title message="Let's get started" />
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-5 w-full mb-5">
          <input
            ref={register({
              required: 'Email is required',
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            name="email"
            type="email"
            required
            placeholder="Email"
            className="input"
          />
          {errors.email?.message && <FormError errormessage={errors.email?.message} />}
          {errors.email?.type === 'pattern' && <FormError errormessage="Please enter a valid email" />}
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
          <select ref={register({ required: true })} name="role" className="input">
            {Object.keys(UserRole).map((role, i) => (
              <option key={i}>{role}</option>
            ))}
          </select>
          <Button canClick={formState.isValid} actionText="Sign up" loading={loading} />
          {isSignup?.createAccount.error && <FormError errormessage={isSignup.createAccount.error} />}
        </form>
        <div>
          Already have an account? <Linking to={'/'} message="Log in now" />
        </div>
      </div>
    </div>
  );
};
