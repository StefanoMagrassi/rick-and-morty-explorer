import * as Arr from 'fp-ts/Array';
import * as S from 'fp-ts/string';
import * as D from 'io-ts/Decoder';
import {useCustomCompareEffect} from 'react-use';
import {type State, get, useRemote, parallel} from './index';

const arrS = Arr.getEq(S.Eq);

export interface Episode extends D.TypeOf<typeof Episode> {}
const Episode = D.struct({
  id: D.number,
  name: D.string
});

const getEpisode = get(Episode);

export const useEpisodes = (urls: string[]): State<readonly Episode[]> => {
  const [state, run] = useRemote<readonly Episode[]>(); // `readonly` due to `sequenceArray`

  useCustomCompareEffect(
    () => run(cancel => parallel(getEpisode(cancel))(urls)),
    [run, urls] as const,
    (prev, next) => arrS.equals(prev[1], next[1])
  );

  return state;
};
