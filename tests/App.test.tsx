import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../src/App';

describe('App component tests:', () => {
  it('should have logo: "Searcher"', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const message = screen.getByRole('heading', { level: 1 });
    expect(message).toHaveTextContent('Searcher');
  });
  it('Renders about page if user click at about link', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const user = userEvent.setup();
    expect(screen.getByPlaceholderText('Search a movie...')).toBeInTheDocument();
    await user.click(screen.getByText(/about/));
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/About page/);
  });
  it('Renders forms page if user click at forms link', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
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
