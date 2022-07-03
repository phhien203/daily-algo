function addAsync(x: number, y: number): Promise<number> {
  console.log("timeout started");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("timeout finished");
      resolve(x + y);
    }, 500);
  });
}

function asyncRunner(g: () => Generator): void {
  console.log("generator initialization");
  const it = g();

  const startTime = Date.now();
  const promise: Promise<unknown> = it.next().value;
  promise.then((value) => {
    const elapsedTime = Date.now() - startTime;
    console.log(`promise resolved ${elapsedTime}ms`);
    it.next(value);
  });

  console.log("runner: attached then to promise");
}

function* main(): any {
  const result = yield addAsync(2, 3);
  console.log("main", result);
}

asyncRunner(main);
