import {render, screen} from '@testing-library/react';
import fetchMock from 'fetch-mock';
import type {FC} from 'react';
import {useLocation} from '../location';
import {LOCATION} from './_data';

afterEach(() => {
  fetchMock.reset();
});

test('useLocation() should fetch location data from provided url', async () => {
  fetchMock.mock(URL, LOCATION);

  render(<Tester />);

  expect(screen.getByText('loading...')).toBeVisible();

  await screen.findByText('Earth (C-137)');
});

// --- Helpers
const URL = 'https://rickandmortyapi.com/api/location/1';

const Tester: FC = () => {
  const state = useLocation(URL);

  switch (state.type) {
    case 'Still':
    case 'Loading':
      return <div>loading...</div>;

    case 'Error':
      return <div>Error: {state.error.error.message}</div>;

    case 'Data':
      return <div>{state.data.name}</div>;
  }
};
