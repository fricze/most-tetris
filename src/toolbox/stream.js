import { proxy } from 'most-proxy';

const _share = (srcStream, { attach, stream }) => () => {
  attach(srcStream);
  return stream;
};
export const share = srcStream => _share(srcStream, proxy());
