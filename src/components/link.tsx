import React from 'react';
import { Link } from 'react-router-dom';

interface ILinkProps {
  to: string;
  message: string;
}

export const Linking: React.FC<ILinkProps> = ({ to, message }) => {
  return (
    <Link to={to}>
      <span className="text-lime-600 hover:underline">{message}</span>
    </Link>
  );
};

export default Linking;
