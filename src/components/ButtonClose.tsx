import React, { FC } from 'react';

interface IButtonCloseProps {
  callback: () => void;
}

const ButtonClose: FC<IButtonCloseProps> = ({ callback }) => {
  return (
    <button
      type="button"
      data-testid="modalClose"
      className="close-btn top-[12px] text-gray-400 right-[12px] hover:text-gray-300 focus:text-gray-600 focus:outline-none hover:scale-105 focus:scale-105"
      onClick={callback}
    ></button>
  );
};

export default ButtonClose;
