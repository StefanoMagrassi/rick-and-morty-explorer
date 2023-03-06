import {render, screen} from '@testing-library/react';
import fetchMock from 'fetch-mock';
import {PAGINATED} from '../../test/_data';
import {App} from '../App';

afterEach(() => {
  fetchMock.reset();
});

test('<App> should render Characters', async () => {
  fetchMock.mock('https://rickandmortyapi.com/api/character', PAGINATED);

  render(<App />);

  await screen.findByText('Rick');

  expect(screen.getByText('Morty')).toBeVisible();
});
