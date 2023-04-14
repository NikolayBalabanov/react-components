import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from '../../src/components/Loader';

describe('Loader', () => {
  it('contains emoji 🎥', () => {
    render(<Loader />);
    const loader = screen.getByText('🎥');
    expect(loader).toBeInTheDocument();
  });
});
