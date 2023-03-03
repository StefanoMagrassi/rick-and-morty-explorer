import {Provider, lightTheme} from '@adobe/react-spectrum';
import type {FC} from 'react';

export const App: FC = () => (
  <Provider theme={lightTheme} colorScheme="light">
    <h1>Hello world!</h1>
  </Provider>
);
