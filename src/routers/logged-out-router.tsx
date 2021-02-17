import React from 'react';
import { useForm } from 'react-hook-form';
import { isLoggedInVar } from '../apollo';

interface IForm {
  email: string;
  password: string;
}

export const LoggedOutRouter = () => {
  const { register, watch, handleSubmit, errors } = useForm<IForm>();
  const onSubmit = () => {
    console.log(watch());
  };
  const onInvalid = () => {
    console.log('can not create account');
  };

  return (
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div>
          <input
            ref={register({
              required: 'This is required',
              pattern: /^[A-Za-z0-9._%+-]+@gmail.com$/,
            })}
            name="email"
            placeholder="email"
          />
          {errors.email?.message && <span className="font-light text-sm text-red-600">{errors.email?.message}</span>}
          {errors.email?.type === 'pattern' && (
            <span className="font-light text-sm text-red-600">Only gmail allowed</span>
          )}
        </div>
        <div>
          <input ref={register({ required: true })} name="password" placeholder="password" />
        </div>
        <button className="bg-yellow-300">Submit</button>
      </form>
    </div>
  );
};

// local-only-field를 업데이트하는 주체! not app but here
