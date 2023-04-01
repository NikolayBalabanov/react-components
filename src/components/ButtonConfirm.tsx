import React, { FC } from 'react';

interface IButtonConfirmProps {
  text: string;
  callback: () => void;
}

const ButtonConfirm: FC<IButtonConfirmProps> = ({ callback, text }) => {
  return (
    <button
      type="button"
      className="mb-[10px] px-4 py-1 self-center rounded-lg border-none bg-gray-400 hover:bg-gray-600 outline-none"
      onClick={callback}
    >
      {text}
    </button>
  );
};

export default ButtonConfirm;
