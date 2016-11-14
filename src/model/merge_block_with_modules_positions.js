import getEachModulePosition from 'model/get_each_module_position';
import { moduleSize } from 'data/dimensions';

const mergeBlockWithModulesPositions = block => ({
  ...block,
  modulesPositions: getEachModulePosition({
    block,
    moduleSize
  })
});

export default mergeBlockWithModulesPositions;
