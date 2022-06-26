// Implement Function.prototype.call, Function.prototype.apply,
// Function.prototype.bind without calling build-in call, apply, bind methods
Function.prototype.myCall = function (thisContext, ...args) {
  const symbol = Symbol();
  thisContext[symbol] = this; // `this` is original function

  const returnValue = thisContext[symbol](...args);
  delete thisContext[symbol];

  return returnValue;
};

Function.prototype.myApply = function (thisContext, args = []) {
  return this.myCall(thisContext, ...args);
};

Function.prototype.myBind = function (thisContext, ...args) {
  return (...otherArgs) => this.myApply(thisContext, [...args, ...otherArgs]);
};
