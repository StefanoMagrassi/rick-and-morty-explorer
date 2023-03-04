import {Provider, lightTheme} from '@adobe/react-spectrum';
import type {FC} from 'react';
import {Characters} from './Characters';
import {ErrorBoundary} from './ErrorBoundary';

export const App: FC = () => (
  <ErrorBoundary>
    <Provider theme={lightTheme} colorScheme="light">
      <Characters />
    </Provider>
  </ErrorBoundary>
);
