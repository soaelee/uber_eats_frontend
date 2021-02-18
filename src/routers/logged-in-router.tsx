import React from 'react';
import { isLoggedInVar } from '../apollo';
import { LOCALSTORAGE_TOKEN } from '../constants';

export const LoggedInRouter = () => {
  const onClick = () => {
    isLoggedInVar(false);
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
  };

  return (
    <div>
      <h1>Logged In</h1>
      <button onClick={onClick}>click to logout</button>
    </div>
  );
};
