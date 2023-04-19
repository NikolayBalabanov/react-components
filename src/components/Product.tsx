import React, { FC, useState } from 'react';

interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface IProductProps {
  product: IProduct;
}

export const Product: FC<IProductProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const btnBgClassName = isOpen ? 'bg-yellow-400' : 'bg-blue-400';
  const btnClasses = ['py-2 px-4 boder rounded', btnBgClassName];
  return (
    <div className="h-full justify-between border py-2 px-4 rounded flex flex-col items-center mb-2">
      <img className="w-3/6" src={product.thumbnail} alt={product.title} />
      <p>{product.title}</p>
      <p className="font-bold">{product.price} $</p>
      <button className={btnClasses.join(' ')} onClick={() => setIsOpen(!isOpen)} type="button">
        {isOpen ? 'Hide Details' : 'Show Details'}
      </button>
      {isOpen && (
        <div>
          <p>{product.description}</p>
          <p>
            Rate:<span style={{ fontWeight: 'bold' }}>{product.rating}</span>
          </p>
        </div>
      )}
    </div>
  );
};
