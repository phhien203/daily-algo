function balancedBrackets(string) {
  const openBrackets = ["(", "[", "{"];
  const closedBrackets = [")", "]", "}"];
  const matchingPair = {
    "(": ")",
    "[": "]",
    "{": "}",
  };
  const stack = [];

  for (let char of string) {
    if (openBrackets.includes(char)) {
      stack.push(char);
    } else if (closedBrackets.includes(char)) {
      if (stack.length === 0) {
        return false;
      }
      if (matchingPair[stack[stack.length - 1]] === char) {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack.length === 0;
}
