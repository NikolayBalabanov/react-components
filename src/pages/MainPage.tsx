import { Product } from '../components/Product';
import React, { useEffect, useRef, useState } from 'react';
import data from '../assets/data.json';

export const MainPage = () => {
  const [value, setValue] = useState<string>('');
  const inputValue = useRef('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const savedValue = localStorage.getItem('input') ?? '';
    setValue(savedValue);
    return function cleanup() {
      localStorage.setItem('input', inputValue.current);
    };
  }, []);

  useEffect(() => {
    inputValue.current = value;
  }, [value]);
  return (
    <div className="container mx-auto max-w-2xl pt-5">
      <div>
        <input
          className="border rounded py-2 px-4 mb-2 w-full"
          type="text"
          value={value}
          onChange={(e) => handleChange(e)}
          placeholder="Store search"
        />
      </div>
      <div>
        <ul>
          {data.products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};
