import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import MainPage from '../../src/pages/MainPage';

describe('Main Page:', () => {
  it('Contains input', async () => {
    render(<MainPage />);
    const user = userEvent.setup();
    expect(screen.getByPlaceholderText('Store search')).toBeInTheDocument();
    const input = screen.getByPlaceholderText('Store search');
    const text = 'someText';
    await user.type(input, text);
    expect(input).toHaveValue(text);
  });
});
