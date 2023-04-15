import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ActorCard from '../../src/components/Actor/ActorCard';
import { PLACEHOLDER_IMG, SMALL_IMG } from '../../src/utils/consts';

describe('Movie Modal tests:', () => {
  it('Try to open modal window with mocked data', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ActorCard imgPath="" name="Jim Carry" />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    expect(screen.getByAltText('Jim Carry')).toBeInTheDocument();
    const actorImg = screen.getByRole('img');
    expect(actorImg).toBeInTheDocument();
    expect(actorImg).toHaveAttribute('src', PLACEHOLDER_IMG);
  });
  it('Check plaseholder logic', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ActorCard imgPath="123" name="Jim Carry" />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    expect(screen.getByAltText('Jim Carry')).toBeInTheDocument();
    const actorImg = screen.getByRole('img');
    expect(actorImg).toBeInTheDocument();
    expect(actorImg).toHaveAttribute('src', SMALL_IMG + 123);
  });
});
