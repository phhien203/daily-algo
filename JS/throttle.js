function throttle(callback, delay) {
  let timerId;
  let lastCallTimeMs = 0;

  function throttled(...args) {
    const currentTimeMs = Date.now();
    const timeSinceLastCall = currentTimeMs - lastCallTimeMs;
    const delayRemaining = delay - timeSinceLastCall;

    if (delayRemaining <= 0) {
      lastCallTimeMs = currentTimeMs;
      callback.apply(this, args);
    } else {
      clearTimeout(timerId);

      timerId = setTimeout(() => {
        lastCallTimeMs = Date.now();
        callback.apply(this, args);
      }, delayRemaining);
    }
  }

  throttled.cancel = function () {
    clearTimeout(timerId);
  };

  return throttled;
}
