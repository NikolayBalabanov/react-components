import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieCard from '../../src/components/Movie/MovieCard';
import { mockedDetailMovie, mockedMovieCard } from '../../src/mocks/mockedData';
import { PLACEHOLDER_IMG } from '../../src/utils/consts';

describe('MovieCard.test tests', () => {
  it('contains placeholder', async () => {
    const testMovie = { ...mockedMovieCard, poster_path: '' };
    render(<MovieCard movie={testMovie} />);
    expect(await screen.findByText('Creed III')).toBeInTheDocument();
    expect(await screen.findByText('7.3')).toBeInTheDocument();
    expect(await screen.findByAltText(mockedDetailMovie.title)).toBeInTheDocument();
    expect(await screen.findByAltText(mockedDetailMovie.title)).toHaveAttribute(
      'src',
      PLACEHOLDER_IMG
    );
  });
  it('Loader exists before fetch execute', async () => {
    render(<MovieCard movie={mockedMovieCard} />);
    expect(await screen.findByText('Creed III')).toBeInTheDocument();
    expect(await screen.findByText('7.3')).toBeInTheDocument();
    expect(await screen.findByAltText(mockedDetailMovie.title)).toBeInTheDocument();
    expect(await screen.findByAltText(mockedDetailMovie.title)).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/original' + mockedMovieCard.poster_path
    );
  });
});
