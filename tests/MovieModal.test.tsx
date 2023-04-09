import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { vi } from 'vitest';
import MovieModal from '../src/components/MovieModal';
import { IMovie } from '../src/models/movie';
import { IActor } from '../src/models/actor';

vi.mock('axios');

describe('Movie Modal tests:', () => {
  it('Try to open modal window with mocked data', async () => {
    const data = {
      results: [],
    };

    (axios.get as jest.MockedFunction<typeof axios.get<IActor[]>>).mockResolvedValue({
      data,
    } as unknown as AxiosResponse<IActor[]>);
    const mockMovie: IMovie = {
      adult: false,
      backdrop_path: '/5i6SjyDbDWqyun8klUuCxrlFbyw.jpg',
      genre_ids: [18, 28],
      id: 677179,
      original_language: 'en',
      original_title: 'Creed III',
      overview:
        'After dominating the boxing world, Adonis Creed has been thriving in both his career and family life. When a childhood friend and former boxing prodigy, Damien Anderson, resurfaces after serving a long sentence in prison, he is eager to prove that he deserves his shot in the ring. The face-off between former friends is more than just a fight. To settle the score, Adonis must put his future on the line to battle Damien — a fighter who has nothing to lose.',
      popularity: 9575.225,
      poster_path: '/vJU3rXSP9hwUuLeq8IpfsJShLOk.jpg',
      release_date: '2023-03-01',
      title: 'Creed III',
      video: false,
      vote_average: 7.3,
      vote_count: 807,
    };
    render(
      <MemoryRouter initialEntries={['/']}>
        <MovieModal movie={mockMovie} onClose={() => {}} />
      </MemoryRouter>
    );
    expect(screen.getByText('Watch trailer!')).toBeInTheDocument();
  });
});
