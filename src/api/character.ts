import * as D from 'io-ts/Decoder';
import {useEffect} from 'react';
import {type State, get, useRemote, parallel} from './index';
import {paginated} from './paginated';

export interface NameAndUrl extends D.TypeOf<typeof NameAndUrl> {}
const NameAndUrl = D.struct({
  name: D.string,
  url: D.string
});

export interface Character extends D.TypeOf<typeof Character> {}
const Character = D.struct({
  id: D.number,
  name: D.string,
  status: D.literal('Alive', 'Dead', 'unknown'),
  species: D.string,
  type: D.string,
  gender: D.literal('Female', 'Male', 'Genderless', 'unknown'),
  origin: NameAndUrl,
  location: NameAndUrl,
  image: D.string,
  episode: D.array(D.string)
});

interface Characters extends D.TypeOf<typeof Characters> {}
const Characters = paginated(Character);

const getCharacters = get(Characters);
const getCharacter = get(Character);

export const usePaginatedCharacters = (url: string): State<Characters> => {
  const [state, run] = useRemote<Characters>();

  useEffect(() => run(cancel => getCharacters(cancel)(url)), [run, url]);

  return state;
};

export const useCharacters = (urls: string[]): State<readonly Character[]> => {
  const [state, run] = useRemote<readonly Character[]>(); // `readonly` due to `sequenceArray`

  useEffect(
    () => run(cancel => parallel(getCharacter(cancel))(urls)),
    [run, urls]
  );

  return state;
};
