import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Actor from '../../src/components/Actor';

describe('Movie Modal tests:', () => {
  it('Try to open modal window with mocked data', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Actor imgPath="" name="Jim Carry" />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    expect(screen.getByAltText('Jim Carry')).toBeInTheDocument();
  });
});
