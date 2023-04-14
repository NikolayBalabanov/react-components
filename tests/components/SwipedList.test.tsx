import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import store from '../../src/redux/store';
import { EMoviesFilterText } from '../../src/types/EMoviesFilterText';
import App from '../../src/App';
import { SwipedList } from '../../src/components/SwipedList';
import ActorCard from '../../src/components/ActorCard';
import { mockedActor } from '../../src/mocks/mockedData';
import { IMovieActor } from '../../src/models/actor';
import MoviesService from '../../src/API/MoviesService';

const mockedChildren: IMovieActor[] = [...Array(3).fill(mockedActor)];
const mockedNodes = mockedChildren.map((actor, index) => (
  <ActorCard key={index} imgPath={actor.profile_path} name={actor.name} />
));

describe('SwipedList tests:', () => {
  it('should render given children', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <SwipedList>{mockedNodes}</SwipedList>
        </MemoryRouter>
      </Provider>
    );
    const actorCards = screen.getAllByText(mockedActor.name);
    expect(actorCards.length).toBe(3);
    expect(screen.getAllByText(mockedActor.name).length).toBe(3);
  });
});
