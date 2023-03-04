import {
  ActionButton,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Heading
} from '@adobe/react-spectrum';
import {type FC} from 'react';
import type {NameAndUrl} from '../api/character';
import {useLocation} from '../api/location';
import {Remote} from './Remote';
import {Residents} from './Residents';

interface LocationProps {
  kind: string;
  name: string;
  data: NameAndUrl;
}

export const Location: FC<LocationProps> = ({kind, name, data}) => (
  <DialogTrigger isDismissable>
    <ActionButton>{kind}</ActionButton>

    <Dialog>
      <Heading>
        {name} - {kind}
      </Heading>
      <Divider />
      <Content>
        {data.url ? (
          <RemoteData url={data.url} />
        ) : (
          <UnknownData name={data.name} />
        )}
      </Content>
    </Dialog>
  </DialogTrigger>
);

interface RemoteDataProps extends Pick<NameAndUrl, 'url'> {}

const RemoteData: FC<RemoteDataProps> = ({url}) => {
  const state = useLocation(url);

  return (
    <Remote state={state}>
      {data => (
        <ul className="data-list">
          <li>
            <strong>Name:</strong> {data.name}
          </li>

          <li>
            <strong>Type:</strong> {data.type}
          </li>

          <li>
            <strong>Dimension:</strong> {data.dimension}
          </li>

          <li>
            <strong>Residents:</strong>
            <Residents list={data.residents} />
          </li>
        </ul>
      )}
    </Remote>
  );
};

interface UnknownDataProps extends Pick<NameAndUrl, 'name'> {}

const UnknownData: FC<UnknownDataProps> = ({name}) => (
  <ul className="data-list">
    <li>
      <strong>Name:</strong> {name}
    </li>
  </ul>
);
