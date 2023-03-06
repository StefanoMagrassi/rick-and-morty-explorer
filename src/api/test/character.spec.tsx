import {render, screen} from '@testing-library/react';
import fetchMock from 'fetch-mock';
import * as Arr from 'fp-ts/ReadonlyArray';
import type {FC} from 'react';
import {CHARACTERS, PAGINATED} from '../../test/_data';
import {useCharacters, usePaginatedCharacters} from '../character';

afterEach(() => {
  fetchMock.reset();
});

test('useCharacters() should fetch characters from provided urls list', async () => {
  fetchMock
    .mock('https://rickandmortyapi.com/api/character/1', CHARACTERS[0])
    .mock('https://rickandmortyapi.com/api/character/2', CHARACTERS[1]);

  render(<Tester />);

  expect(screen.getByText('loading...')).toBeVisible();

  await screen.findByText('Rick');

  expect(screen.getByText('Morty')).toBeVisible();
});

test('useCharacters() should fail if at least one request fails', async () => {
  fetchMock
    .mock('https://rickandmortyapi.com/api/character/1', CHARACTERS[0])
    .mock('https://rickandmortyapi.com/api/character/2', {
      throws: new TypeError('network error')
    });

  render(<Tester />);

  expect(screen.getByText('loading...')).toBeVisible();

  await screen.findByText('Error: network error');
});

test('usePaginatedCharacters() should fetch paginated characters from provided url', async () => {
  fetchMock.mock(PAGINATED_URL, PAGINATED);

  render(<TesterPaginated />);

  expect(screen.getByText('loading...')).toBeVisible();

  await screen.findByText('total: 2');

  expect(screen.getByText('Rick')).toBeVisible();
  expect(screen.getByText('Morty')).toBeVisible();
});

// --- Helpers
const PAGINATED_URL = 'https://rickandmortyapi.com/api/character';

const Tester: FC = () => {
  const state = useCharacters([
    'https://rickandmortyapi.com/api/character/1',
    'https://rickandmortyapi.com/api/character/2'
  ]);

  switch (state.type) {
    case 'Still':
    case 'Loading':
      return <div>loading...</div>;

    case 'Error':
      return <div>Error: {state.error.error.message}</div>;

    case 'Data':
      return (
        <>
          {Arr.Functor.map(state.data, c => (
            <div key={c.id}>{c.name}</div>
          ))}
        </>
      );
  }
};

const TesterPaginated: FC = () => {
  const state = usePaginatedCharacters(PAGINATED_URL);

  switch (state.type) {
    case 'Still':
    case 'Loading':
      return <div>loading...</div>;

    case 'Error':
      return <div>Error: {state.error.error.message}</div>;

    case 'Data':
      return (
        <>
          <div>total: {state.data.info.count}</div>
          {Arr.Functor.map(state.data.results, c => (
            <div key={c.id}>{c.name}</div>
          ))}
        </>
      );
  }
};
