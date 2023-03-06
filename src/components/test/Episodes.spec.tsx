import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react';
import fetchMock from 'fetch-mock';
import {EPISODES, ERROR} from '../../test/_data';
import {wrapper} from '../../test/_provider';
import {Episodes} from '../Episodes';

afterEach(() => {
  fetchMock.reset();
});

test('<Episodes> should render a button which triggers a Dialog with episodes data', async () => {
  fetchMock
    .mock('https://rickandmortyapi.com/api/episode/1', EPISODES[0])
    .mock('https://rickandmortyapi.com/api/episode/2', EPISODES[1]);

  render(
    <Episodes
      name="Rick"
      list={[
        'https://rickandmortyapi.com/api/episode/1',
        'https://rickandmortyapi.com/api/episode/2'
      ]}
    />,
    {wrapper}
  );

  fireEvent.click(screen.getByText('Episodes'));

  await screen.findByText('Rick - Episodes');

  const [first, second] = await screen.findAllByRole('listitem');

  expect(first).toHaveTextContent('First episode');
  expect(second).toHaveTextContent('Second episode');

  await teardown();
});

test('<Episodes> should render AppError if at least one request fails', async () => {
  fetchMock
    .mock('https://rickandmortyapi.com/api/episode/1', EPISODES[0])
    .mock('https://rickandmortyapi.com/api/episode/2', {throws: ERROR});

  render(
    <Episodes
      name="Rick"
      list={[
        'https://rickandmortyapi.com/api/episode/1',
        'https://rickandmortyapi.com/api/episode/2'
      ]}
    />,
    {wrapper}
  );

  fireEvent.click(screen.getByText('Episodes'));

  await screen.findByText('Rick - Episodes');

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
