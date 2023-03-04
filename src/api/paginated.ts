import * as D from 'io-ts/Decoder';
import type {Decoder} from './types';

export interface Info extends D.TypeOf<typeof Info> {}
const Info = D.struct({
  count: D.number,
  pages: D.number,
  next: D.nullable(D.string),
  prev: D.nullable(D.string)
});

interface Paginated<A> {
  info: Info;
  results: A[];
}

export const paginated = <A>(d: Decoder<A>): Decoder<Paginated<A>> =>
  D.struct({
    info: Info,
    results: D.array(d)
  });
