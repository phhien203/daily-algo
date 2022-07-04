// The fastest settle promise wins
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then(resolve).catch(reject);
    });
  });
};

Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    let totalRejected = 0;

    promises.forEach((promise) => {
      promise.then(resolve).catch(() => {
        totalRejected += 1;
        if (totalRejected === promises.length) {
          reject("all promises are rejected");
        }
      });
    });
  });
};

Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    let totalResolved = 0;
    const results = [];

    promises.forEach((promise, i) => {
      promise
        .then((value) => {
          results[i] = value;
          totalResolved += 1;

          if (totalResolved === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
};

Promise.myAllSettled = function (promises) {
  return new Promise((resolve) => {
    const results = [];
    let totalSettled = 0;

    promises.forEach((promise, i) => {
      promise
        .then((value) => {
          results[i] = { status: "fulfilled", value };
        })
        .catch((error) => {
          results[i] = { status: "rejected", error };
        })
        .finally(() => {
          totalSettled += 1;
          if (totalSettled === promises.length) {
            resolve(results);
          }
        });
    });
  });
};
