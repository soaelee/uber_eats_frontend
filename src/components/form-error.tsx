import React from 'react';

interface IFormErrorProps {
  errormessage: string;
}
export const FormError: React.FC<IFormErrorProps> = ({ errormessage }) => {
  return <span className="font-medium text-red-500 text-sm">{errormessage}</span>;
};

// export function FormError(errormessage: string) {
// return <span className="font-medium text-red-500 text-sm">{errormessage}</span>;
// }
