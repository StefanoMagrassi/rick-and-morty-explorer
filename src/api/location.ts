import * as D from 'io-ts/Decoder';
import {useEffect} from 'react';
import {type State, get, useRemote} from './index';

interface Loc extends D.TypeOf<typeof Loc> {}
const Loc = D.struct({
  id: D.number,
  name: D.string,
  type: D.string,
  dimension: D.string,
  residents: D.array(D.string)
});

const getLocation = get(Loc);

export const useLocation = (url: string): State<Loc> => {
  const [state, run] = useRemote<Loc>();

  useEffect(() => run(cancel => getLocation(cancel)(url)), [run, url]);

  return state;
};
