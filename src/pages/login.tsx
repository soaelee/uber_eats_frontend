import { spawn } from 'child_process';
import React from 'react';
import { useForm } from 'react-hook-form';

interface ILoginForm {
  email: string;
  password: string;
}
export const Login = () => {
  const { register, getValues, errors, handleSubmit } = useForm<ILoginForm>();
  const onSubmit = () => {
    console.log(getValues());
  };
  return (
    <div className="bg-gray-800 h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-lg pb-7 pt-10 rounded-lg text-center">
        <h3 className="text-2xl text-gray-800">Log In</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-5 px-5">
          <input
            ref={register({ required: 'Email is required', minLength: 10 })}
            className="input"
            name="email"
            type="email"
            required
            placeholder="Email"
          />
          {errors.email?.message && <span className="font-medium text-red-500 text-sm">{errors.email?.message}</span>}
          <input
            ref={register({ required: 'Password is required', minLength: 10 })}
            name="password"
            type="password"
            required
            className="input"
            placeholder="Password"
          />
          {errors.password?.message && (
            <span className="text-red-500 font-medium text-sm">{errors.password?.message}</span>
          )}
          {errors.password?.type === 'minLength' && (
            <span className="font-medium text-sm text-red-500">Password musb be more thatn 10 chars</span>
          )}
          <button className="mt-3 btn">Log In</button>
        </form>
      </div>
    </div>
  );
};
