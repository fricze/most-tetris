export const keys = Object.keys;

export const reduceObj = (obj, reduceFn, firstAcumulator) => keys(obj).reduce(
  (acc, objKey) => reduceFn(acc, { key: objKey, value: obj[objKey] }),
  firstAcumulator
);

export const mapObj = (obj, mapFn) => reduceObj(
  obj, (acc, { key, value }) => {
    acc[key] = mapFn(value, key);
    return acc;
  },
  {}
);
