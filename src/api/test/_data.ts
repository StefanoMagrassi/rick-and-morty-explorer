import type {Character} from '../character';
import type {Episode} from '../episode';
import {Loc} from '../location';
import type {Paginated} from '../paginated';

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
