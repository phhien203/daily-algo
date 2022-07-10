function deepEquals(valueOne, valueTwo) {
  // check data type
  if (typeof valueOne !== typeof valueTwo) {
    return false;
  }

  // check primitive type
  if (typeof valueOne !== "object") {
    // NaN is special case
    if (Number.isNaN(valueOne) && Number.isNaN(valueTwo)) {
      return true;
    }

    return valueOne === valueTwo;
  }

  // check null type first, because typeof null === 'object'
  if (valueOne === null || valueTwo === null) {
    return valueOne === valueTwo;
  }

  // check same object reference
  if (valueOne === valueTwo) {
    return true;
  }

  // check Array type
  if (Array.isArray(valueOne) && Array.isArray(valueTwo)) {
    if (valueOne.length !== valueTwo.length) {
      return false;
    }

    for (let i = 0; i < valueOne.length; i++) {
      if (!deepEquals(valueOne[i], valueTwo[i])) {
        return false;
      }
    }

    return true;
  }

  // one of two values is object, the other is array
  if (Array.isArray(valueOne) || Array.isArray(valueTwo)) {
    return false;
  }

  // check object
  const valueOneKeys = Object.keys(valueOne);
  const valueTwoKeys = Object.keys(valueTwo);

  if (valueOneKeys.length !== valueTwoKeys.length) {
    return false;
  }

  for (let key of valueOneKeys) {
    if (!valueTwo.hasOwnProperty(key)) {
      return false;
    }

    if (!deepEquals(valueOne[key], valueTwo[key])) {
      return false;
    }
  }

  return true;
}
