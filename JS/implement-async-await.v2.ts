function addAsync(x: number, y: number): Promise<number> {
  console.log("timeout started");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("timeout finished");
      resolve(x + y);
      // reject();
    }, 500);
  });
}

function asyncRunner(g: () => Generator): void {
  console.log("generator initialization");
  const it = g();
  let iterationCounter = 0;

  function iterate(value: unknown): void {
    const yielded = it.next(value);
    console.log("iteration start", iterationCounter);
    iterationCounter++;
    const startTime = Date.now();

    if (yielded.done) {
      console.log("generator ended");
      return;
    }

    const promise: Promise<unknown> = Promise.resolve(yielded.value);

    promise
      .then((value) => {
        const elapsedTime = Date.now() - startTime;
        console.log(`promise resolved ${elapsedTime}ms`);
        iterate(value);
      })
      .catch((err) => {
        const elapsedTime = Date.now() - startTime;
        console.log(`promise resolved ${elapsedTime}ms`);
        it.throw(err);
      });

    console.log("runner: attached then to promise");
  }

  iterate(undefined);
}

function* main(): any {
  try {
    const result = yield addAsync(2, 3);
    console.log("main", result);
    const result2 = yield addAsync(10, -1);
    console.log("main2", result2);
  } catch (err) {
    console.log("error handling in main");
  }
}

asyncRunner(main);
