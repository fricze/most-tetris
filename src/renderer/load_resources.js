import { loader } from 'pixi.js';
import { reduceObj } from 'toolbox/object';
import { blocks } from 'data/blocks';

const assetsPath = '../assets/';

const loadResources = () => {
  blocks.reduce(
    // load every shape with proper image and return loader
    // to handle 'load' event
    (loader, { name, imgSrcObj }) => reduceObj(
      imgSrcObj,
      (loader, { key: imgRotation, value: imgSrc }) => loader.add(
        name.concat('_').concat(imgRotation), assetsPath.concat(imgSrc)
      ),
      loader
    ),
    loader
    // reduce goes through all images, loads them
    // and returns loader, so one can subscribe to
    // 'load' event on it
  );

  return new Promise(
    (resolve, reject) =>
      loader.load((pixiLoader, resources) => resolve(resources))
  );
};

export default loadResources;
