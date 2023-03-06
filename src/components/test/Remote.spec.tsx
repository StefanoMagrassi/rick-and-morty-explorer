import {render, screen} from '@testing-library/react';
import {ERR} from '../../test/_data';
import {Remote} from '../Remote';

test('<Remote> should render loader when state is `Still`', () => {
  render(<Remote state={{type: 'Still'}}>{() => 'foo'}</Remote>);

  expect(screen.getByLabelText('Loading…')).toBeVisible();
});

test('<Remote> should render loader when state is `Loading`', () => {
  render(<Remote state={{type: 'Loading'}}>{() => 'foo'}</Remote>);

  expect(screen.getByLabelText('Loading…')).toBeVisible();
});

test('<Remote> should render an AppError when state is `Error`', () => {
  render(
    <Remote state={{type: 'Error', error: ERR('character')}}>
      {() => 'foo'}
    </Remote>
  );

  expect(screen.getByText('network error')).toBeVisible();
});

test('<Remote> should render children when state is `Data`', () => {
  render(
    <Remote state={{type: 'Data', data: 'Foo bar'}}>
      {data => <>{data}</>}
    </Remote>
  );

  expect(screen.getByText('Foo bar')).toBeVisible();
});
