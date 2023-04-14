import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import MovieModal from '../../src/components/MovieModal';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../../src/redux/store';
import { BIG_IMG } from '../../src/utils/consts';
import { mockedDetailMovie } from '../../src/mocks/mockedData';

describe('Movie Modal tests:', () => {
  it('Try to open modal window with mocked data', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <MovieModal movieId={677179} onClose={() => {}} />
        </MemoryRouter>
      </Provider>
    );
    await waitFor(() => expect(screen.getByText('🎥')));
    expect(screen.getByText('Watch trailer!')).toBeInTheDocument();
    const movieImg = screen.getByAltText(mockedDetailMovie.title);
    expect(movieImg).toBeInTheDocument();
    expect(movieImg).toHaveAttribute('src', BIG_IMG + mockedDetailMovie.poster_path);
    const modal = screen.getByTestId('modal');
    const modalContent = screen.getByTestId('modalContent');
    expect(modal).toBeInTheDocument();
    expect(modalContent).toBeInTheDocument();
    expect(modal).toHaveClass('opacity-0');
    expect(modalContent).toHaveClass('-translate-y-10');
    await waitFor(() => expect(modal).not.toHaveClass('opacity-0'));
    expect(modalContent).not.toHaveClass('-translate-y-10');
    const user = userEvent.setup();
    const modalClose = screen.getByTestId('modalClose');
    expect(modalClose).toBeInTheDocument();
    await user.click(modalClose);
    expect(modal).toHaveClass('opacity-0');
    expect(modalContent).toHaveClass('-translate-y-10');
  });
});
