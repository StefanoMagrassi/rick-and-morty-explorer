import {
  ActionButton,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Heading
} from '@adobe/react-spectrum';
import * as ROArr from 'fp-ts/ReadonlyArray';
import {type FC} from 'react';
import {useEpisodes} from '../api/episode';
import {Remote} from './Remote';

interface EpisodesProps {
  name: string;
  list: string[];
}

export const Episodes: FC<EpisodesProps> = ({name, list}) => (
  <DialogTrigger isDismissable>
    <ActionButton>Episodes</ActionButton>

    <Dialog>
      <Heading>{name} - Episodes</Heading>
      <Divider />
      <Content>
        <RemoteData list={list} />
      </Content>
    </Dialog>
  </DialogTrigger>
);

interface RemoteDataProps {
  list: string[];
}

const RemoteData: FC<RemoteDataProps> = ({list}) => {
  const state = useEpisodes(list);

  return (
    <Remote state={state}>
      {data => (
        <ul className="data-list">
          {ROArr.Functor.map(data, episode => (
            <li key={episode.id}>{episode.name}</li>
          ))}
        </ul>
      )}
    </Remote>
  );
};
