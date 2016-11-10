import { mapObj } from 'toolbox/object';

const mergeBlockWithResources = (blocks, resources) => blocks.map(
  block => mapObj(
    block.imgSrcObj,
    (_, rotationKey) => resources[block.name.concat('_').concat(rotationKey)]
  )
);

export default mergeBlockWithResources;
