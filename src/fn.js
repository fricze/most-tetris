export const pipe = (fn, ...fns) => (...args) => fns.reduce((acc, f) => f(acc), fn(...args));
export const partial = (fn, ...args) => fn.bind(null, args);
export const compose = (...fns) => pipe(...fns.reverse());
export const curry = (fn, ...args) =>
  args.length === fn.length ?
  fn(...args) : curry.bind(this, fn, ...args);
export const identity = x => x;
