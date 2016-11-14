export const Const = value => ({
  map: () => Const(value),
  valueOf: () => value
});

export const Just = value => ({
  map: fn => fn(value),
  valueOf: () => value
});
