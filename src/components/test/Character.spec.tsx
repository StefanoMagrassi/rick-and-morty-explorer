import {render, screen} from '@testing-library/react';
import {CHARACTERS} from '../../test/_data';
import {wrapper} from '../../test/_provider';
import {Character} from '../Character';

test('<Character> should render character image and data and Episodes, Origin and Location button', () => {
  render(<Character data={CHARACTERS[0]} />, {wrapper});

  expect(screen.getByText('Rick')).toBeVisible();

  expect(screen.getByRole('img')).toHaveAttribute(
    'src',
    'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
  );

  const [status, species, type, gender] = screen.getAllByRole('listitem');

  expect(status).toHaveTextContent('Status: Alive');
  expect(species).toHaveTextContent('Species: Human');
  expect(type).toHaveTextContent('Type: unknown');
  expect(gender).toHaveTextContent('Gender: Male');

  expect(screen.getByRole('button', {name: 'Episodes'})).toBeVisible();
  expect(screen.getByRole('button', {name: 'Origin'})).toBeVisible();
  expect(screen.getByRole('button', {name: 'Location'})).toBeVisible();
});

test('<Character> should handle empty data', () => {
  render(<Character data={{...CHARACTERS[0], species: ''}} />, {
    wrapper
  });

  const [status, species, type, gender] = screen.getAllByRole('listitem');

  expect(status).toHaveTextContent('Status: Alive');
  expect(species).toHaveTextContent('Species: unknown');
  expect(type).toHaveTextContent('Type: unknown');
  expect(gender).toHaveTextContent('Gender: Male');
});
