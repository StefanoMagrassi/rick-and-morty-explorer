import {Err} from '@contactlab/appy';
import type {Character} from '../api/character';
import type {Episode} from '../api/episode';
import {Loc} from '../api/location';
import type {Paginated} from '../api/paginated';

export const CHARACTERS: Character[] = [
  {
    id: 1,
    name: 'Rick',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {name: 'Earth', url: 'https://rickandmortyapi.com/api/location/1'},
    location: {
      name: 'Earth',
      url: 'https://rickandmortyapi.com/api/location/1'
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/1']
  },
  {
    id: 2,
    name: 'Morty',
    status: 'unknown',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {name: 'Earth', url: 'https://rickandmortyapi.com/api/location/1'},
    location: {
      name: 'Earth',
      url: 'https://rickandmortyapi.com/api/location/1'
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/1']
  }
];

export const PAGINATED: Paginated<Character> = {
  info: {count: 2, next: null, pages: 1, prev: null},
  results: CHARACTERS
};

export const EPISODES: Episode[] = [
  {id: 1, name: 'First episode'},
  {id: 2, name: 'Second episode'}
];

export const LOCATION: Loc = {
  dimension: 'Dimension C-137',
  id: 1,
  name: 'Earth (C-137)',
  residents: ['https://rickandmortyapi.com/api/character/1'],
  type: 'Planet'
};

export const ERROR = new TypeError('network error');

export const ERR = (path: string): Err => ({
  type: 'RequestError',
  error: ERROR,
  input: [`https://rickandmortyapi.com/api/${path}`, {}]
});
