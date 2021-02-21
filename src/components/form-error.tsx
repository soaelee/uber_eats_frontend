import React from 'react';

interface IFormErrorProps {
  errormessage: string;
}
export const FormError: React.FC<IFormErrorProps> = ({ errormessage }) => {
  return (
    <span role="alert" className="font-medium text-red-500 text-sm">
      {errormessage}
    </span>
  );
};

// export function FormError(errormessage: string) {
// return <span className="font-medium text-red-500 text-sm">{errormessage}</span>;
// }

// React.FC는 child만을 자식으로 갖기에 props를 지정해줘야한다
