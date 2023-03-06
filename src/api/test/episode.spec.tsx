import {render, screen} from '@testing-library/react';
import fetchMock from 'fetch-mock';
import * as Arr from 'fp-ts/ReadonlyArray';
import type {FC} from 'react';
import {EPISODES, ERROR} from '../../test/_data';
import {useEpisodes} from '../episode';

afterEach(() => {
  fetchMock.reset();
});

test('useEpisodes() should fetch episodes from provided urls list', async () => {
  fetchMock
    .mock('https://rickandmortyapi.com/api/episode/1', EPISODES[0])
    .mock('https://rickandmortyapi.com/api/episode/2', EPISODES[1]);

  render(<Tester />);

  expect(screen.getByText('loading...')).toBeVisible();

  await screen.findByText('First episode');

  expect(screen.getByText('Second episode')).toBeVisible();
});

test('useEpisodes() should fail if at least one request fails', async () => {
  fetchMock
    .mock('https://rickandmortyapi.com/api/episode/1', EPISODES[0])
    .mock('https://rickandmortyapi.com/api/episode/2', {throws: ERROR});

  render(<Tester />);

  expect(screen.getByText('loading...')).toBeVisible();

  await screen.findByText('Error: network error');
});

// --- Helpers
const Tester: FC = () => {
  const state = useEpisodes([
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2'
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
