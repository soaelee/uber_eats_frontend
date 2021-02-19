import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { useMe } from '../hooks/useMe';
import logo from '../images/logo.png';

export const Header: React.FC = () => {
  const { data } = useMe();

  return (
    <>
      {!data?.me.verified && (
        <div className="p-3 text-center text-base text-white bg-red-400">
          <span>Please verify your email</span>
        </div>
      )}
      <header className="w-full py-4">
        <div className="w-full px-5 xl:px-0 max-w-screen-2-xl mx-auto flex justify-between items-center">
          <Link to="/">
            <img src={logo} className="w-36" alt="logo" />
          </Link>
          <span className="text-xs">
            <Link to="/user/my-profile">
              <FontAwesomeIcon icon={faUser} className="text-xl" />
              <h1>{data?.me.email}</h1>
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
