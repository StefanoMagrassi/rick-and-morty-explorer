import * as ROArr from 'fp-ts/ReadonlyArray';
import {type FC} from 'react';
import {useCharacters} from '../api/character';
import {Remote} from './Remote';

interface ResidentsProps {
  list: string[];
}

export const Residents: FC<ResidentsProps> = ({list}) => {
  const state = useCharacters(list);

  return (
    <Remote state={state}>
      {data => (
        <ul className="data-list">
          {ROArr.Functor.map(data, r => (
            <li key={r.id}>{r.name}</li>
          ))}
        </ul>
      )}
    </Remote>
  );
};
