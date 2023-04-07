import { render, screen } from '@testing-library/react';
import React from 'react';
import ContactItem from '../../src/components/ContactItem';

const mockData = {
  id: 1,
  name: 'Unknown User',
  phone: '+3333333333',
  date: ['2023', '03', '24'],
  role: 'Stranger',
  favorite: true,
  gender: 'male',
  photo: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
};

describe('ContactItem content:', () => {
  it('Checking ContactItem content', async () => {
    render(<ContactItem contact={mockData} />);
    expect(screen.getByText(mockData.name)).toBeInTheDocument();
    expect(screen.getByText('Phone: ' + mockData.phone)).toBeInTheDocument();
    expect(screen.getByText('Role: ' + mockData.role)).toBeInTheDocument();
    expect(screen.getByText('Gender: ' + mockData.gender)).toBeInTheDocument();
    expect(screen.getByText('FAVORITE')).toBeInTheDocument();
  });
});
