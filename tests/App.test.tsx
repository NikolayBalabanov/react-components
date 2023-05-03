import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../src/App';
import { Provider } from 'react-redux';
import store from '../src/redux/store';

describe('App component tests:', () => {
  it('should have logo: "Searcher"', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    const message = screen.getByRole('heading', { level: 1 });
    expect(message).toHaveTextContent('Searcher');
  });
  it('Renders about page if user click at about link', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    const user = userEvent.setup();
    expect(screen.getByPlaceholderText('Search a movie...')).toBeInTheDocument();
    await user.click(screen.getByText(/about/));
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/About page/);
  });
  it('Renders forms page if user click at forms link', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    const user = userEvent.setup();
    expect(screen.getByPlaceholderText('Search a movie...')).toBeInTheDocument();
    await user.click(screen.getByText(/forms/));
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /Here you can add your contacts info/
    );
  });
  it('Renders never page if invalid path', async () => {
    render(
      <MemoryRouter initialEntries={['/myFavoritePage']}>
        <App />
      </MemoryRouter>
    );
    const message = screen.getByRole('heading', { level: 2 });
    expect(message).toHaveTextContent(`404 — page doesn't exist`);
  });
});
