import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { MainPage } from '../../src/pages/MainPage';
import { Mock } from 'vitest';
import { setImmediate } from 'timers';
import App from '../../src/App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { IMovie } from 'models/movie';

vi.mock('axios');

describe('Main Page:', () => {
  it('Contains input', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    expect(screen.getByPlaceholderText('Search a movie...')).toBeInTheDocument();
    const input = screen.getByPlaceholderText('Search a movie...');
    const text = 'someText';
    await user.type(input, text);
    expect(input).toHaveValue(text);
  });
});

describe('Main Page with data:', () => {
  it('Loader exists before fetch execute', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    const loader = screen.getByText('🎥');
    expect(loader).not.toBe(null);
  });
  it('Try to find movies cards after loading...', async () => {
    const data = {
      results: [
        {
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
        },
        {
          adult: false,
          backdrop_path: '/ovM06PdF3M8wvKb06i4sjW3xoww.jpg',
          genre_ids: [878, 12, 28],
          id: 76600,
          original_language: 'en',
          original_title: 'Avatar: The Way of Water',
          overview:
            'Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.',
          popularity: 8358.734,
          poster_path: '/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
          release_date: '2022-12-14',
          title: 'Avatar: The Way of Water',
          video: false,
          vote_average: 7.8,
          vote_count: 6748,
        },
      ],
    };

    (axios.get as jest.MockedFunction<typeof axios.get<IMovie[]>>).mockResolvedValue({
      data,
    } as unknown as AxiosResponse<IMovie[]>);

    const { findByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(await findByText('Creed III')).toBeInTheDocument();
  });
});
