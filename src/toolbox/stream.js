import { proxy } from 'most-proxy';

export const share = (srcStream) => () => {
  const { attach, stream } = proxy();
  attach(srcStream);
  return stream;
};
