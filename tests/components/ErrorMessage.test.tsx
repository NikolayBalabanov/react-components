import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from '../../src/components/ErrorMessage';

describe('ErrorMessage tests', () => {
  it('contains given text', () => {
    const testText = 'testText';
    render(<ErrorMessage content={testText} />);
    const text = screen.getByText(testText);
    expect(text).toBeInTheDocument();
  });
});
