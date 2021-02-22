import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { createDishMu, createDishMuVariables } from '../../__api__/createDishMu';

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

interface IFormProps {
  name: string;
  price: number;
  description: string;
  options: object;
  restaurantId: number;
}
export const AddDish = () => {
  const { restaurantId } = useParams<IParam>();
  const [createDishMu, { data }] = useMutation<createDishMu, createDishMuVariables>(CREATE_DISH_MU);
  const { register, handleSubmit, getValues, errors, formState } = useForm({ mode: 'onChange' });
  console.log(restaurantId);
  return <div>AddDish</div>;
};
