import {lightTheme, Provider} from '@adobe/react-spectrum';
import {RenderOptions} from '@testing-library/react';

type Wrapper = Exclude<RenderOptions['wrapper'], undefined>;

export const wrapper: Wrapper = props => (
  <Provider theme={lightTheme}>{props.children}</Provider>
);
