import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '../../components/button';
import { FormError } from '../../components/form-error';
import { Title } from '../../components/title';
import { createDishMu, createDishMuVariables } from '../../__api__/createDishMu';
import { MY_RESTAURANT_QUE } from './my-restaurant';

const CREATE_DISH_MU = gql`
  mutation createDishMu($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

interface IParam {
  restaurantId: string;
}

interface IForm {
  name: string;
  price: string;
  description: string;
  [key: string]: string;
}
export const AddDish = () => {
  const [optionsNumber, setOptionsNumber] = useState<number[]>([]);
  const { restaurantId } = useParams<IParam>();
  const history = useHistory();
  const [createDishMu, { data, loading }] = useMutation<createDishMu, createDishMuVariables>(CREATE_DISH_MU, {
    refetchQueries: [{ query: MY_RESTAURANT_QUE, variables: { input: { id: +restaurantId } } }],
  });
  const { register, handleSubmit, getValues, formState } = useForm<IForm>({ mode: 'onChange' });
  const onSubmit = () => {
    const { name, price, description, ...rest } = getValues();
    const optionObjs = optionsNumber.map((id) => ({
      name: rest[`${id}-optionName`],
      extra: +rest[`${id}-optionExtra`],
    }));
    console.log(rest);
    createDishMu({
      variables: {
        input: {
          name,
          description,
          price: +price,
          restaurantId: +restaurantId,
          options: optionObjs,
        },
      },
    });
    history.goBack();
  };
  const onAddOptionClick = () => {
    setOptionsNumber((current) => [Date.now(), ...current]);
  };
  const onDeleteClick = (index: number) => {
    console.log(index);
    setOptionsNumber((current) => current.filter((id) => id !== index));
  };
  return (
    <div className="container flex flex-col items-center mt-52">
      <Helmet>Add Dish | Suber Eats</Helmet>
      <Title message="Add Dish" />
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 w-full max-w-screen-sm my-5">
        <input
          className="input"
          type="text"
          name="name"
          placeholder="Name"
          ref={register({ required: 'Name is required' })}
        />
        <input
          className="input"
          type="number"
          name="price"
          min={0}
          placeholder="Price"
          ref={register({ required: 'Price is required' })}
        />
        <input
          className="input"
          type="text"
          name="description"
          placeholder="Description"
          ref={register({ required: 'Name is required' })}
        />
        <div className="my-10">
          <h4 className="font-medium mb-3 text-lg">Dish Options</h4>
          <span onClick={onAddOptionClick} className="cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5">
            Add Dish Option
          </span>
          {optionsNumber.length !== 0 &&
            optionsNumber.map((id) => (
              <div key={id} className="mt-5">
                <input
                  ref={register}
                  name={`${id}-optionName`}
                  className="py-2 px-2 focus:outline-none focus:border-gray-600 border-2"
                  type="text"
                  placeholder="Option Name"
                />
                <input
                  ref={register}
                  name={`${id}-optionExtra`}
                  className="py-2 px-2 focus:outline-none focus:border-gray-600 border-2"
                  type="number"
                  placeholder="Option Extra"
                />
                <span
                  className="cursor-pointer text-white bg-red-500 ml-3 py-3 px-4 mt-5 "
                  onClick={() => onDeleteClick(id)}
                >
                  Delete Option
                </span>
              </div>
            ))}
        </div>
        <Button loading={loading} canClick={formState.isValid} actionText="Create Dish" />
        {data?.createDish.error && <FormError errormessage={data.createDish.error} />}
      </form>
    </div>
  );
};

// Array.from((new Array(num)).map((ele, i) => ())
// {optionsNumber !== 0 &&
//   Array.from(new Array(optionsNumber)).map((_, index) => (
//     <div key={index} className="mt-5">
//       <input
//         ref={register}
//         name={`${index}-optionName`}
//         className="py-2 px-2 focus:outline-none focus:border-gray-600 border-2"
//         type="text"
//         placeholder="Option Name"
//       />
//     </div>
// ))}
