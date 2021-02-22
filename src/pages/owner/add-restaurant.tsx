import { gql, useApolloClient, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/button';
import { FormError } from '../../components/form-error';
import { Title } from '../../components/title';
import { createRestaurantMu, createRestaurantMuVariables } from '../../__api__/createRestaurantMu';
import { MyRestaurant, MY_RESTAURANTS_QUE } from './my-restaurant';

const CREATE_RESTAURANT_MU = gql`
  mutation createRestaurantMu($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      error
      restaurantId
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
  file: FileList;
}
//input : name, coverImg, address, categoryName
export const AddRestaurant = () => {
  const client = useApolloClient();
  const history = useHistory();
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const onCompleted = (data: createRestaurantMu) => {
    const {
      createRestaurant: { ok, restaurantId },
    } = data;
    if (ok) {
      setUploading(false);

      //fake restaurant (cache)
      const queryRes = client.readQuery({ query: MY_RESTAURANTS_QUE });
      const { name, categoryName, address } = getValues();
      client.writeQuery({
        query: MY_RESTAURANTS_QUE,
        data: {
          myRestaurants: {
            ...queryRes.myRestaurants,
            restaurants: [
              {
                address,
                category: {
                  name: categoryName,
                  __typename: 'Category',
                },
                coverImg: imageUrl,
                id: restaurantId,
                isPromoted: false,
                name,
                __typename: 'Restaurant',
              },
              ...queryRes.myRestaurants.restaurants,
            ],
          },
        },
      });
      history.push('/');
    }
  };
  const [createRestaurantMu, { data }] = useMutation<createRestaurantMu, createRestaurantMuVariables>(
    CREATE_RESTAURANT_MU,
    { onCompleted }
  );
  const onSubmit = async () => {
    try {
      setUploading(true);
      const { file, name, categoryName, address } = getValues();
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append('file', actualFile);
      const { url: coverImg } = await (
        await fetch('http://localhost:4000/uploads/', {
          method: 'POST',
          body: formBody,
        })
      ).json();
      setImageUrl(coverImg);
      createRestaurantMu({
        variables: {
          input: {
            name,
            categoryName,
            address,
            coverImg,
          },
        },
      });
      console.log(coverImg);
    } catch (e) {
      console.log(e);
    }
  };
  const { handleSubmit, getValues, register, errors, formState } = useForm<IFormProps>({
    mode: 'onChange',
  });

  return (
    <div>
      <Helmet>Add Restaurant | Suber-Eats</Helmet>
      <div className="container text-center">
        <Title message="Add Restaurant" />
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-5 w-full mb-5 max-w-screen-sm mx-auto">
          <input
            type="text"
            name="name"
            ref={register({ required: 'Name is required' })}
            className="input"
            placeholder="Name"
          />
          {errors?.name?.message && <FormError errormessage={errors.name.message} />}
          <input
            type="text"
            name="address"
            ref={register({ required: 'Address is required' })}
            className="input"
            placeholder="Address"
          />
          {errors?.address?.message && <FormError errormessage={errors.address.message} />}
          <input
            type="text"
            name="categoryName"
            ref={register({ required: 'Category is required' })}
            className="input"
            placeholder="Category Name"
          />
          {errors?.categoryName?.message && <FormError errormessage={errors.categoryName.message} />}
          <div>
            <input
              className="border-0"
              type="file"
              accept="image/"
              name="file"
              ref={register({ required: 'Cover image is required' })}
            />
          </div>
          <Button canClick={formState.isValid} actionText="Create" loading={uploading} />
          {data?.createRestaurant.error && <FormError errormessage={data.createRestaurant.error} />}
        </form>
      </div>
    </div>
  );
};
