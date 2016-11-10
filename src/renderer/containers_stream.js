import { just } from 'most';
import { Container } from 'pixi.js';

export const addContainersToBaseContainer = (containers, baseContainer) => containers.forEach(
  container => {
    if (!baseContainer.children.includes(container)) {
      baseContainer.addChild(container);
    }
  }
);

const containers$ = just({
  stageContainer: new Container(),
  stackedBlocksContainer: new Container(),
  activeBlockContainer: new Container()
});

export default containers$;
