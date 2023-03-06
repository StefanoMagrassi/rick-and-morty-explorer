import {fireEvent, render, screen} from '@testing-library/react';
import fetchMock from 'fetch-mock';
import {
  ERROR,
  PAGINATED,
  PAGINATED_WITH_NEXT,
  PAGINATED_WITH_PREV
} from '../../test/_data';
import {wrapper} from '../../test/_provider';
import {Characters} from '../Characters';

afterEach(() => {
  fetchMock.reset();
});

test('<Characters> should render a list of Character with navigation buttons', async () => {
  fetchMock.mock('https://rickandmortyapi.com/api/character', PAGINATED);

  render(<Characters />, {wrapper});

  await screen.findByText('Rick');

  expect(screen.getByText('Morty')).toBeVisible();

  expect(screen.getByRole('button', {name: 'Prev'})).toBeDisabled();
  expect(screen.getByRole('button', {name: 'Next'})).toBeDisabled();
});

test('<Characters> should fetch prev/next characters page on relative buttons click', async () => {
  fetchMock.mock(
    'https://rickandmortyapi.com/api/character',
    PAGINATED_WITH_NEXT
  );
  fetchMock.mock(
    'https://rickandmortyapi.com/api/character?page=2',
    PAGINATED_WITH_PREV
  );

  render(<Characters />, {wrapper});

  await screen.findByText('Rick');

  expect(screen.getByText('Morty')).toBeVisible();

  expect(screen.getByRole('button', {name: 'Prev'})).toBeDisabled();

  // --- Next
  fireEvent.click(screen.getByText('Next'));

  await screen.findByText('Morty 2');

  expect(screen.getByRole('button', {name: 'Next'})).toBeDisabled();

  // --- Prev
  fireEvent.click(screen.getByText('Prev'));

  await screen.findByText('Rick');
});

test('<Characters> should render AppError if request fails', async () => {
  fetchMock.mock('https://rickandmortyapi.com/api/character', {throws: ERROR});

  render(<Characters />, {wrapper});

  await screen.findByText('network error');
});
