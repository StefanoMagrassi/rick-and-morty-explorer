import {Content, Flex, Heading, Image, View} from '@adobe/react-spectrum';
import type {FC} from 'react';
import type {Character as CharacterSchema} from '../api/character';
import {Episodes} from './Episodes';
import {Location} from './Location';

const ND = 'unknown';

interface CharacterProp {
  data: CharacterSchema;
}

export const Character: FC<CharacterProp> = ({data}) => (
  <View
    borderWidth="thin"
    borderColor="dark"
    paddingTop="size-25"
    paddingBottom="size-25"
    paddingStart="size-250"
    paddingEnd="size-250"
    width="size-6000"
    height="size-4600"
  >
    <Heading>{data.name}</Heading>
    <Content>
      <Flex gap="size-100">
        <Image src={data.image} alt={data.name} width="size-3000" />

        <ul className="data-list">
          <li>
            <strong>Status:</strong> {data.status}
          </li>

          <li>
            <strong>Species:</strong> {data.species || ND}
          </li>

          <li>
            <strong>Type:</strong> {data.type || ND}
          </li>

          <li>
            <strong>Gender:</strong> {data.gender}
          </li>
        </ul>
      </Flex>

      <Flex wrap gap="size-100" marginTop="size-250">
        <Episodes list={data.episode} name={data.name} />

        <Location kind="Origin" name={data.name} data={data.origin} />

        <Location kind="Location" name={data.name} data={data.location} />
      </Flex>
    </Content>
  </View>
);
