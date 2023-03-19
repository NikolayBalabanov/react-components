import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import Product from '../../src/components/Product';

const testData = {
  id: 1,
  title: 'iPhone 9',
  description: 'An apple mobile which is nothing like apple',
  price: 549,
  discountPercentage: 12.96,
  rating: 4.69,
  stock: 94,
  brand: 'Apple',
  category: 'smartphones',
  thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
  images: [
    'https://i.dummyjson.com/data/products/1/1.jpg',
    'https://i.dummyjson.com/data/products/1/2.jpg',
    'https://i.dummyjson.com/data/products/1/3.jpg',
    'https://i.dummyjson.com/data/products/1/4.jpg',
    'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
  ],
};
describe('Product tests:', () => {
  it('should render Product component and check its content', async () => {
    render(<Product product={testData} />);
    expect(screen.getByText(testData.title));
    const user = userEvent.setup();
    const descrButton = screen.getByText('Show Details');
    await user.click(descrButton);
    expect(screen.getByText(testData.description));
  });
});
