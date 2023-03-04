import * as appy from '@contactlab/appy';
import {withCancel} from '@contactlab/appy/combinators/abort';
import {
  Decoder as AppyDecoder,
  toDecoder,
  withDecoder
} from '@contactlab/appy/combinators/decoder';
import * as Arr from 'fp-ts/Array';
import * as E from 'fp-ts/Either';
import * as RTE from 'fp-ts/ReaderTaskEither';
import * as TE from 'fp-ts/TaskEither';
import {pipe} from 'fp-ts/function';
import * as D from 'io-ts/Decoder';
import {EffectCallback, useCallback, useState} from 'react';
import {Decoder, Req, Request} from './types';

// --- Apis
const fromIots = <A>(d: D.Decoder<unknown, A>): AppyDecoder<A> =>
  toDecoder(d.decode, e => new Error(D.draw(e)));

export const get =
  <A>(d: Decoder<A>) =>
  (cancel: AbortController): Req<A> =>
    pipe(
      appy.get,
      withDecoder(fromIots(d)),
      withCancel(cancel),
      RTE.map(r => r.data)
    );

export const parallel =
  <A>(r: Req<A>) =>
  (urls: string[]): Request<readonly A[]> =>
    pipe(
      urls,
      Arr.map(url => r(url)),
      TE.sequenceArray
    );

// --- Hook
export type State<A> = Still | Loading | Error | Data<A>;

interface Still {
  type: 'Still';
}

interface Loading {
  type: 'Loading';
}

interface Error {
  type: 'Error';
  error: appy.Err;
}

interface Data<A> {
  type: 'Data';
  data: A;
}

type Cleanup = Exclude<ReturnType<EffectCallback>, void>;

type Disposable<A> = (cancel: AbortController) => Request<A>;

type Run<A> = (r: Disposable<A>) => Cleanup;

export const useRemote = <A>(): [State<A>, Run<A>] => {
  const [state, setState] = useState<State<A>>({type: 'Still'});

  const run: Run<A> = useCallback(r => {
    const cancel = new AbortController();

    setState({type: 'Loading'});

    r(cancel)().then(result =>
      cancel.signal.aborted
        ? undefined // bypass
        : pipe(
            result,
            E.match(
              e => setState({type: 'Error', error: e}),
              data => setState({type: 'Data', data})
            )
          )
    );

    return () => {
      cancel.abort();
    };
  }, []);

  return [state, run];
};
