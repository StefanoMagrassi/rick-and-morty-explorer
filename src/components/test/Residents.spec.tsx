import {render, screen} from '@testing-library/react';
import fetchMock from 'fetch-mock';
import {CHARACTERS, ERROR} from '../../test/_data';
import {Residents} from '../Residents';

afterEach(() => {
  fetchMock.reset();
});

test('<Residents> should fetch characters from provided urls list and render them', async () => {
  fetchMock
    .mock('https://rickandmortyapi.com/api/character/1', CHARACTERS[0])
    .mock('https://rickandmortyapi.com/api/character/2', CHARACTERS[1]);

  render(
    <Residents
      list={[
        'https://rickandmortyapi.com/api/character/1',
        'https://rickandmortyapi.com/api/character/2'
      ]}
    />
  );

  await screen.findByText('Rick');

  expect(screen.getByText('Morty')).toBeVisible();
});

test('<Residents> should render AppError if at least one request fails', async () => {
  fetchMock
    .mock('https://rickandmortyapi.com/api/character/1', CHARACTERS[0])
    .mock('https://rickandmortyapi.com/api/character/2', {throws: ERROR});

  render(
    <Residents
      list={[
        'https://rickandmortyapi.com/api/character/1',
        'https://rickandmortyapi.com/api/character/2'
      ]}
    />
  );

  await screen.findByText('network error');
});
