import React from 'react';
import { render, screen } from '@testing-library/react';
import EmptyResult from '../../src/components/EmptyResult';

describe('EmptyResult', () => {
  it('contains text and gif', () => {
    render(<EmptyResult />);
    const emptyText = screen.getByText('Hmm... Result is empty. Try to serach something else!');
    expect(emptyText).toBeInTheDocument();
    const emptyGif = screen.getByRole('img');
    expect(emptyGif).toBeInTheDocument();
    expect(emptyGif).toHaveAttribute(
      'src',
      'https://media1.giphy.com/media/g01ZnwAUvutuK8GIQn/giphy.gif'
    );
  });
});
