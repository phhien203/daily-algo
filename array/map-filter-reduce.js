Array.prototype.myMap = function (callback) {
  const newArray = [];

  for (let i = 0; i < this.length; i++) {
    newArray.push(callback(this[i], i, this));
  }

  return newArray;
};

Array.prototype.myFilter = function (callback) {
  const newArray = [];

  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this) === true) {
      newArray.push(this[i]);
    }
  }

  return newArray;
};

Array.prototype.myReduce = function (callback, initialValue) {
  if (!this.length) return initialValue;

  const hasInitialValue = initialValue !== undefined;
  let acc = hasInitialValue ? initialValue : this[0];

  for (let i = hasInitialValue ? 0 : 1; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }

  return acc;
};
