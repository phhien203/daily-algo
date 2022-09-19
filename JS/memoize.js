export function memoize(callback, resolver) {
  const cache = new Map();

  function getCacheKey(args) {
    return typeof resolver === "function"
      ? resolver(...args)
      : JSON.stringify(args);
  }

  function memoized(...args) {
    const key = getCacheKey(args);
    if (cache.has(key)) {
      return cache.get(key);
    }

    const returnValue = callback(...args);
    cache.set(key, returnValue);
    return returnValue;
  }

  memoized.has = function (...keys) {
    return cache.has(getCacheKey(keys));
  };

  memoized.clear = function () {
    cache.clear();
  };

  memoized.delete = function (...keys) {
    cache.delete(getCacheKey(keys));
  };

  return memoized;
}
