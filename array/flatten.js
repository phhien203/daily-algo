export function flatten(value) {
  // check primitive types
  if (typeof value !== "object" || value == null) {
    return value;
  }

  if (Array.isArray(value)) {
    return flattenArray(value);
  }

  return flattenObject(value);
}

function flattenArray(arr) {
  return arr.reduce((acc, cur) => {
    return acc.concat(flatten(cur));
  }, []);
}

function flattenObject(obj) {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    const isObject =
      typeof value === "object" && value !== null && !Array.isArray(value);
    const flattenedValue = flatten(value);

    if (isObject) {
      Object.assign(result, flattenedValue);
    } else {
      result[key] = flattenedValue;
    }
  }

  return result;
}
