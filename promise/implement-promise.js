const PromiseState = {
  Pending: "pending",
  Fulfilled: "fulfilled",
  Rejected: "rejected",
};

class MyPromise {
  state = PromiseState.Pending;
  value = null;
  fulfilledCallbacks = [];
  rejectedCallbacks = [];

  get value() {
    return this.value;
  }

  get state() {
    return this.state;
  }

  constructor(executorFunction) {
    try {
      executorFunction(
        (value) => this.#resolve(value),
        (value) => this.#reject(value)
      );
    } catch (error) {
      this.#reject(error);
    }
  }

  #resolve(value) {
    if (this.state !== PromiseState.Pending) return;

    this.value = value;
    this.state = PromiseState.Fulfilled;
    this.fulfilledCallbacks.forEach((cb) => cb());
  }

  #reject(value) {
    if (this.state !== PromiseState.Pending) return;

    this.value = value;
    this.state = PromiseState.Rejected;
    this.rejectedCallbacks.forEach((cb) => cb());
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const doFulfillment = () => {
        if (!onFulfilled) return resolve(this.value);

        queueMicrotask(() => {
          try {
            const result = onFulfilled(this.value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      };
      const doRejection = () => {
        if (!onRejected) return reject(this.value);

        queueMicrotask(() => {
          try {
            const result = onRejected(this.value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      };

      switch (this.state) {
        case PromiseState.Pending:
          this.fulfilledCallbacks.push(doFulfillment);
          this.rejectedCallbacks.push(doRejection);
          break;
        case PromiseState.Fulfilled:
          doFulfillment();
          break;
        case PromiseState.Rejected:
          doRejection();
          break;
        default:
          throw new Error(`Unknown promise state ${this.state}`);
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}
