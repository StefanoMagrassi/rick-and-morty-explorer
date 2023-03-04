import * as O from 'fp-ts/Option';
import {pipe} from 'fp-ts/function';
import {type ReactNode, Component} from 'react';
import {AppError} from './AppError';

interface ErrorBoundaryProps {
  children: ReactNode;
}

type ErrorBoundaryState = O.Option<Error>;

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return O.some(error);
  }

  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = O.none;
  }

  render(): ReactNode {
    const {children} = this.props;

    return pipe(
      this.state,
      O.match(
        () => children,
        error => <AppError error={error} />
      )
    );
  }
}
