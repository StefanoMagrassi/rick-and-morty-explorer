import {isLeft, right} from 'fp-ts/Either';
import * as D from 'io-ts/Decoder';
import {Paginated, paginated} from '../paginated';

const LIST = ['foo', 'bar'];

const PAGINATED: Paginated<string> = {
  info: {count: 2, next: null, pages: 1, prev: null},
  results: LIST
};

test('paginated() should return a Decoder for paginated resource', () => {
  const decoder = paginated(D.string);

  expect(decoder.decode(PAGINATED)).toEqual(right(PAGINATED));

  expect(isLeft(decoder.decode(LIST))).toBe(true);
});
