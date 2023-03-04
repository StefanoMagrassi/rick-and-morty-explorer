import {ProgressCircle} from '@adobe/react-spectrum';
import type {ReactNode} from 'react';
import {State} from '../api';
import {AppError} from './AppError';

interface RemoteProps<A> {
  state: State<A>;
  children: (data: A) => ReactNode;
}

export function Remote<A>({state, children}: RemoteProps<A>): JSX.Element {
  switch (state.type) {
    case 'Still':
    case 'Loading':
      return <ProgressCircle aria-label="Loading…" isIndeterminate />;

    case 'Error':
      return <AppError error={state.error.error} />;

    case 'Data':
      return <>{children(state.data)}</>;
  }
}
