// Credit: https://dev.to/gsarciotto/implementing-async-await-55f
function addAsync(
  x: number,
  y: number,
  callback: (result: number) => unknown
): void {
  setTimeout(() => {
    console.log("timeout finished");
    callback(x + y);
  }, 500);
  console.log("timeout started");
}

function asyncWrapper(f: Function, ...args: unknown[]): void {
  const startTime = Date.now();

  f(...args, (result: unknown) => {
    const elapsedTime = Date.now() - startTime;
    console.log(`async completed: ${elapsedTime}ms`);
    iterator.next(result);
  });

  console.log("wrapper end");
}

function* main(): any {
  console.log("generator initialization");
  const result = yield asyncWrapper(addAsync, 2, 3);
  console.log(`main ${result}`);
}

const iterator = main();
iterator.next();
