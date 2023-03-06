import {render, screen} from '@testing-library/react';
import fetchMock from 'fetch-mock';
import {isLeft, right} from 'fp-ts/Either';
import * as D from 'io-ts/Decoder';
import {useEffect, type FC} from 'react';
import {ERROR} from '../../test/_data';
import {get, parallel, useRemote} from '../index';

afterEach(() => {
  fetchMock.reset();
});

const FooBar = D.string;

test('get() should return a Req with decoder and cancellation', async () => {
  fetchMock.mock('http://localhost/api/test', '"foo bar"');

  const cancel = new AbortController();
  const getFooBar = get(FooBar)(cancel);

  const result = await getFooBar('http://localhost/api/test')();

  expect(result).toEqual(right('foo bar'));

  cancel.abort();

  const resultAborted = await getFooBar('http://localhost/api/test')();

  expect(isLeft(resultAborted)).toBe(true);
});

test('get() should convert decoder error into Error', async () => {
  fetchMock.mock('http://localhost/api/test', '{}');

  const getFooBar = get(FooBar)(new AbortController());

  const result = await getFooBar('http://localhost/api/test')();

  expect(isLeft(result)).toBe(true);
  expect((result as any).left.error).toEqual(
    new Error('cannot decode {}, should be string')
  );
});

test('parallel() should run parallel requests', async () => {
  fetchMock
    .mock('http://localhost/api/test1', '"foo bar 1"')
    .mock('http://localhost/api/test2', '"foo bar 2"');

  const getFooBar = get(FooBar)(new AbortController());

  const result = await parallel(getFooBar)([
    'http://localhost/api/test1',
    'http://localhost/api/test2'
  ])();

  expect(result).toEqual(right(['foo bar 1', 'foo bar 2']));
});

test('useRemote() should run request and track state - OK', async () => {
  fetchMock.mock('http://localhost/api/test', '"foo bar"');

  render(<Tester />);

  expect(screen.getByLabelText('loading')).toBeVisible();

  await screen.findByLabelText('data');

  expect(screen.getByText('foo bar')).toBeVisible();
});

test('useRemote() should run request and track state - KO', async () => {
  fetchMock.mock('http://localhost/api/test', {throws: ERROR});

  render(<Tester />);

  expect(screen.getByLabelText('loading')).toBeVisible();

  await screen.findByLabelText('error');

  expect(screen.getByText('network error')).toBeVisible();
});

test('useRemote() should cancel request when effect is cleaned up', async () => {
  fetchMock.mock('http://localhost/api/test', '"foo bar"');

  const {unmount} = render(<Tester />);

  expect(screen.getByLabelText('loading')).toBeVisible();

  unmount();

  expect(screen.queryByLabelText('error')).not.toBeInTheDocument();
  expect(screen.queryByLabelText('data')).not.toBeInTheDocument();
});

// --- Helpers
const Tester: FC = () => {
  const [state, run] = useRemote<string>();

  useEffect(
    () => run(cancel => get(FooBar)(cancel)('http://localhost/api/test')),
    [run]
  );

  switch (state.type) {
    case 'Still':
    case 'Loading':
      return <div aria-label="loading"></div>;

    case 'Error':
      return <div aria-label="error">{state.error.error.message}</div>;

    case 'Data':
      return <div aria-label="data">{state.data}</div>;
  }
};
