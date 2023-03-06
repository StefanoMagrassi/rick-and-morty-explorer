/* eslint-disable no-console */

import {render, screen} from '@testing-library/react';
import {type FC} from 'react';
import {ErrorBoundary} from '../ErrorBoundary';

// switch off logging to avoid `console` pollution
const oriConsole = console.error;

beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = oriConsole;
});

test('<ErrorBoundary> should render children when they do not throw errors', () => {
  render(
    <ErrorBoundary>
      <ChildNotThrows />
    </ErrorBoundary>
  );

  expect(screen.getByText('This is a component')).toBeVisible();
});

test('<ErrorBoundary> should render AppError when children throw errors', () => {
  render(
    <ErrorBoundary>
      <ChildThrows />
    </ErrorBoundary>
  );

  expect(screen.getByText('something went wrong')).toBeVisible();
});

// --- Helpers
const ChildThrows: FC = () => {
  throw new Error('something went wrong');
};

const ChildNotThrows: FC = () => <>This is a component</>;
