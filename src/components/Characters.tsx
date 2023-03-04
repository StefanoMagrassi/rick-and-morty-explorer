import {Button, Flex, View} from '@adobe/react-spectrum';
import * as Arr from 'fp-ts/Array';
import {type FC, useState} from 'react';
import {usePaginatedCharacters} from '../api/character';
import type {Info} from '../api/paginated';
import {Character} from './Character';
import {Remote} from './Remote';

export const Characters: FC = () => {
  const [url, setUrl] = useState('https://rickandmortyapi.com/api/character');

  const state = usePaginatedCharacters(url);

  return (
    <Remote state={state}>
      {({info, results}) => (
        <View>
          <Flex gap="size-100" wrap>
            {Arr.Functor.map(results, c => (
              <Character key={c.id} data={c} />
            ))}
          </Flex>

          <Navigation info={info} onClick={setUrl} />
        </View>
      )}
    </Remote>
  );
};

interface NavigationProps {
  info: Info;
  onClick: (s: string) => void;
}

const Navigation: FC<NavigationProps> = ({info, onClick}) => {
  const {next, prev} = info;

  return (
    <Flex gap="size-100" justifyContent="center" marginTop="size-250">
      <Button
        variant="primary"
        isDisabled={prev === null}
        onPress={prev ? () => onClick(prev) : undefined}
      >
        Prev
      </Button>

      <Button
        variant="primary"
        isDisabled={next === null}
        onPress={next ? () => onClick(next) : undefined}
      >
        Next
      </Button>
    </Flex>
  );
};
