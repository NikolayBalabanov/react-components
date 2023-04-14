import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Select from '../../src/components/Select/Select';
import { selectFieldsMovies } from '../../src/types/selectFieldsMovies';
import store from '../../src/redux/store';
import { EMoviesFilterText } from '../../src/types/EMoviesFilterText';
import App from '../../src/App';

describe('Select tests:', () => {
  it('should be in DOM and available to open it and it closing when click outside', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    const popularFilter = screen.getByText(EMoviesFilterText.popular);
    expect(popularFilter).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(popularFilter);
    const nowPlaying = screen.getByText(EMoviesFilterText.nowPlaying);
    const topRated = screen.getByText(EMoviesFilterText.topRated);
    const upcoming = screen.getByText(EMoviesFilterText.upcoming);
    expect(nowPlaying).toBeInTheDocument();
    expect(topRated).toBeInTheDocument();
    expect(upcoming).toBeInTheDocument();
    const logo = screen.getByRole('heading', { level: 1 });
    await user.click(logo);
    expect(screen.queryByText(EMoviesFilterText.topRated)).not.toBeInTheDocument();
    expect(screen.queryByText(EMoviesFilterText.nowPlaying)).not.toBeInTheDocument();
    expect(screen.queryByText(EMoviesFilterText.upcoming)).not.toBeInTheDocument();
    expect(screen.queryByText(EMoviesFilterText.popular)).toBeInTheDocument();
  });
  it('change filter', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Select selectFields={selectFieldsMovies} />
        </MemoryRouter>
      </Provider>
    );
    const popularFilter = screen.getByText(EMoviesFilterText.popular);
    expect(popularFilter).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(popularFilter);
    const nowPlaying = screen.getByText(EMoviesFilterText.nowPlaying);
    const topRated = screen.getByText(EMoviesFilterText.topRated);
    const upcoming = screen.getByText(EMoviesFilterText.upcoming);
    expect(nowPlaying).toBeInTheDocument();
    expect(topRated).toBeInTheDocument();
    expect(upcoming).toBeInTheDocument();
    await user.click(topRated);
    expect(screen.queryByText(EMoviesFilterText.topRated)).toBeInTheDocument();
    expect(screen.queryByText(EMoviesFilterText.nowPlaying)).not.toBeInTheDocument();
    expect(screen.queryByText(EMoviesFilterText.upcoming)).not.toBeInTheDocument();
    expect(screen.queryByText(EMoviesFilterText.popular)).not.toBeInTheDocument();
  });
});
