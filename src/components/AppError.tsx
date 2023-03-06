import {Heading, IllustratedMessage} from '@adobe/react-spectrum';
import ErrorIcon from '@spectrum-icons/illustrations/Error';
import type {FC} from 'react';

interface AppErrorProps {
  error: Error;
}

export const AppError: FC<AppErrorProps> = ({error}) => (
  <IllustratedMessage>
    <ErrorIcon aria-label="Error icon" />
    <Heading>{error.message}</Heading>
  </IllustratedMessage>
);
