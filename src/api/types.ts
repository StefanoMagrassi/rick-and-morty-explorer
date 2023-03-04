import * as appy from '@contactlab/appy';
import * as RTE from 'fp-ts/ReaderTaskEither';
import * as TE from 'fp-ts/TaskEither';
import * as D from 'io-ts/Decoder';

export interface Decoder<A> extends D.Decoder<unknown, A> {}

export interface Request<A> extends TE.TaskEither<appy.Err, A> {}

export interface Req<A>
  extends RTE.ReaderTaskEither<appy.ReqInput, appy.Err, A> {}
