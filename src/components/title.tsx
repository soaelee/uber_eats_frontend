import React from 'react';

interface ITitleProps {
  message: string;
}
export const Title: React.FC<ITitleProps> = ({ message }) => {
  return <h2 className="font-semibole text-2xl mb-3">{message}</h2>;
};
