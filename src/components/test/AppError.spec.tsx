import {render, screen} from '@testing-library/react';
import {ERROR} from '../../test/_data';
import {AppError} from '../AppError';

test('<AppError> should render the error icon and provided error message', () => {
  render(<AppError error={ERROR} />);

  expect(screen.getByLabelText('Error icon')).toBeVisible();

  expect(screen.getByText('network error')).toBeVisible();
});
