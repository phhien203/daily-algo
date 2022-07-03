function promisify(callback) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      callback.call(this, ...args, function handleErrorAndValue(err, value) {
        if (err == null) {
          resolve(value);
        } else {
          reject(err);
        }
      });
    });
  };
}

function addAsync(x, y, callback) {
  setTimeout(() => {
    console.log("timed out");
    const result = x + y;

    if (typeof result !== "number") {
      callback(new Error("Not a number"), null);
    } else {
      callback(null, result);
    }
  }, 1000);
  console.log("start timeout");
}

// const addAsyncPromisified = promisify(addAsync);
// const promise = addAsyncPromisified(1, "haha");
// promise.then(
//   (value) => {
//     console.log(`result: ${value}`);
//   },
//   (err) => {
//     console.log(`error occurs: ${err}`);
//   }
// );

function sayHelloAsync(str, callback) {
  setTimeout(() => {
    console.log("timed out");
    if (typeof str !== "string") {
      callback(new Error("Not a string"));
    } else {
      callback(null, `${str}, my name is ${this.name}`);
    }
  }, 500);
  console.log("start timeout");
}

const employee = {
  name: "Antonio",
  sayHello: promisify(sayHelloAsync),
};

employee.sayHello("hi there").then(
  (value) => {
    console.log(value);
  },
  (err) => {
    console.error(err);
  }
);
