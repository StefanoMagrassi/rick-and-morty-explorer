import * as D from 'io-ts/Decoder';
import {useEffect} from 'react';
import {type State, get, useRemote, parallel} from './index';

interface Episode extends D.TypeOf<typeof Episode> {}
const Episode = D.struct({
  id: D.number,
  name: D.string
});

const getEpisode = get(Episode);

export const useEpisodes = (urls: string[]): State<readonly Episode[]> => {
  const [state, run] = useRemote<readonly Episode[]>(); // `readonly` due to `sequenceArray`

  useEffect(
    () => run(cancel => parallel(getEpisode(cancel))(urls)),
    [run, urls]
  );

  return state;
};
