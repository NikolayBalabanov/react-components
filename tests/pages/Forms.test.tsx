import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import Forms from '../../src/pages/Forms';

describe('Forms Page:', () => {
  it('Contains input', async () => {
    render(<Forms />);
    const user = userEvent.setup();
    expect(screen.getByPlaceholderText("Enter contact's name and surname")).toBeInTheDocument();
    const input = screen.getByPlaceholderText("Enter contact's name and surname");
    const text = 'someText';
    await user.type(input, text);
    expect(input).toHaveValue(text);
  });
  it('Try to fill the form incorrectly...', async () => {
    render(<Forms />);
    const user = userEvent.setup();
    // expect(screen.getByPlaceholderText("Enter contact's name and surname")).toBeInTheDocument();
    const phoneNumber = 'someText1';
    const invalidName = 'someText2';
    const nameInput = screen.getByPlaceholderText("Enter contact's name and surname");
    const phoneInput = screen.getByPlaceholderText("Enter contact's phone");
    const genderInput = screen.getByLabelText('Male');
    const submitButton = screen.getByRole('button');
    await user.type(nameInput, invalidName);
    await user.type(phoneInput, phoneNumber);
    await user.click(genderInput);
    expect(genderInput).toBeChecked();
    expect(submitButton).toHaveTextContent('Submit');
    await user.click(submitButton);
    expect(
      screen.getByText('Аt least 2 words starting with a capital letter are expected')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Must start with "+", contain only digits and be no shorter than 9 digits')
    ).toBeInTheDocument();
  });
  it('Try to fill the form correctly...', async () => {
    render(<Forms />);
    const user = userEvent.setup();
    // expect(screen.getByPlaceholderText("Enter contact's name and surname")).toBeInTheDocument();
    const phoneNumber = '+375292221453';
    const validName = 'Some Name';
    const nameInput = screen.getByPlaceholderText("Enter contact's name and surname");
    const phoneInput = screen.getByPlaceholderText("Enter contact's phone");
    const genderInput = screen.getByLabelText('Male');
    const submitButton = screen.getByRole('button');
    await user.type(nameInput, validName);
    await user.type(phoneInput, phoneNumber);
    await user.click(genderInput);
    expect(genderInput).toBeChecked();
    expect(submitButton).toHaveTextContent('Submit');
    // await user.click(submitButton);
    // expect(screen.getByText('The data has been saved!')).toBeInTheDocument();
    // const okButton = screen.getByText('OK');
    // await user.click(okButton);
  });
});
