import { ApolloClient, gql, useApolloClient, useMutation } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/button';
import { FormError } from '../../components/form-error';
import { Title } from '../../components/title';
import { useMe } from '../../hooks/useMe';
import { editProfile, editProfileVariables } from '../../__api__/editProfile';

const EDIT_PROFILE_MU = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IEditProfileForm {
  email?: string;
  password?: string;
}
export const EditProfile = () => {
  const client = useApolloClient();
  const history = useHistory();
  const onCompleted = (data: editProfile) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok && user) {
      //update the cache (email, verified) vs refetch
      const {
        me: { email: prevE, id },
      } = user;
      const { email: newE } = getValues();
      if (prevE !== newE) {
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EditedUser on User {
              email
              verified
            }
          `,
          data: {
            verified: false,
            email: newE,
          },
        });
        //await refreshUSer();
        history.push('/');
        console.log('completed');
      }
    }
  };
  const { data: user, refetch: refreshUSer } = useMe();
  const [editProfileMu, { loading }] = useMutation<editProfile, editProfileVariables>(EDIT_PROFILE_MU, {
    onCompleted,
  });
  const onSubmit = () => {
    const { email, password } = getValues();
    if (!loading) {
      editProfileMu({
        variables: {
          input: {
            email,
            ...(password !== '' && { password }),
          },
        },
      });
    }
  };

  const { handleSubmit, register, getValues, errors, formState } = useForm<IEditProfileForm>({
    mode: 'onChange',
    defaultValues: {
      email: user?.me.email,
    },
  });
  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <Helmet>
        <title>Edit profile | Suber Eats</title>
      </Helmet>
      <Title message="Edit Profile" />
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-3 w-full mb-5 max-w-screen-sm ">
        <input
          ref={register({
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          className="input"
          type="email"
          name="email"
          placeholder="Email"
        />
        {errors.email?.type === 'pattern' && <FormError errormessage="Please enter a valid email" />}
        <input ref={register()} className="input" type="password" name="password" placeholder="Password" />
        <Button canClick={formState.isValid} loading={loading} actionText="Save Profile" />
      </form>
    </div>
  );
};
