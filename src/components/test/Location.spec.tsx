import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react';
import fetchMock from 'fetch-mock';
import {CHARACTERS, EARTH, ERROR, LOCATION, UNKNOWN} from '../../test/_data';
import {wrapper} from '../../test/_provider';
import {Location} from '../Location';

afterEach(() => {
  fetchMock.reset();
});

test('<Location> should render a button which triggers a Dialog with location data', async () => {
  fetchMock
    .mock('https://rickandmortyapi.com/api/location/1', LOCATION)
    .mock('https://rickandmortyapi.com/api/character/1', CHARACTERS[0]);

  render(<Location kind="Origin" name="Rick" data={EARTH} />, {wrapper});

  fireEvent.click(screen.getByText('Origin'));

  await screen.findByText('Rick - Origin');

  const [name, type, dimension, residents] = await screen.findAllByRole(
    'listitem'
  );

  expect(name).toHaveTextContent('Name: Earth (C-137)');
  expect(type).toHaveTextContent('Type: Planet');
  expect(dimension).toHaveTextContent('Dimension: Dimension C-137');
  expect(residents).toHaveTextContent('Residents:Rick');

  await teardown();
});

test('<Location> should render a button which triggers a Dialog with unknown data', async () => {
  render(<Location kind="Origin" name="Rick" data={UNKNOWN} />, {wrapper});

  fireEvent.click(screen.getByText('Origin'));

  await screen.findByText('Rick - Origin');

  const [name] = await screen.findAllByRole('listitem');

  expect(name).toHaveTextContent('Name: unknown');

  await teardown();
});

test('<Location> should render AppError if request fails', async () => {
  fetchMock.mock('https://rickandmortyapi.com/api/location/1', {throws: ERROR});

  render(<Location kind="Origin" name="Rick" data={EARTH} />, {wrapper});

  fireEvent.click(screen.getByText('Origin'));

  await screen.findByText('Rick - Origin');

  await screen.findByText('network error');

  await teardown();
});

// --- Helpers
/**
 * Ensures to close dialog before unmounting in order to avoid warning in console.
 */
const teardown = async (): Promise<void> => {
  fireEvent.click(screen.getByLabelText('Dismiss'));
  await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
};
