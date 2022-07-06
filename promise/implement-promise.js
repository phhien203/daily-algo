const PromiseState = {
  pending: "pending",
  fulfilled: "fulfilled",
  rejected: "rejected",
};

class MyPromise {
  #state = PromiseState.pending;
  #value = null;
  #fulfilledCallbacks = [];
  #rejectedCallbacks = [];

  get value() {
    return this.#value;
  }

  get state() {
    return this.#state;
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
    if (this.#state !== PromiseState.pending) return;

    this.#value = value;
    this.#state = PromiseState.fulfilled;
    this.#fulfilledCallbacks.forEach((cb) => cb());
  }

  #reject(value) {
    if (this.#state !== PromiseState.pending) return;

    this.#value = value;
    this.#state = PromiseState.rejected;
    this.#rejectedCallbacks.forEach((cb) => cb());
  }

  finally(callback) {
    return new MyPromise((resolve, reject) => {
      const doFulfillment = () => {
        if (!callback) return;

        queueMicrotask(() => {
          try {
            callback();
            resolve(this.#value);
          } catch (error) {
            reject(error);
          }
        });
      };

      const doRejection = () => {
        if (!callback) return;

        queueMicrotask(() => {
          try {
            callback();
            reject(this.#value);
          } catch (error) {
            reject(error);
          }
        });
      };

      switch (this.#state) {
        case PromiseState.pending:
          this.#fulfilledCallbacks.push(doFulfillment);
          this.#rejectedCallbacks.push(doRejection);
          break;
        case PromiseState.fulfilled:
          doFulfillment();
          break;
        case PromiseState.rejected:
          doRejection();
          break;
        default:
          throw new Error(`Unknown promise state ${this.#state}`);
      }
    });
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const doFulfillment = () => {
        if (!onFulfilled) return resolve(this.#value);

        queueMicrotask(() => {
          try {
            const result = onFulfilled(this.#value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      };
      const doRejection = () => {
        if (!onRejected) return reject(this.#value);

        queueMicrotask(() => {
          try {
            const result = onRejected(this.#value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      };

      switch (this.#state) {
        case PromiseState.pending:
          this.#fulfilledCallbacks.push(doFulfillment);
          this.#rejectedCallbacks.push(doRejection);
          break;
        case PromiseState.fulfilled:
          doFulfillment();
          break;
        case PromiseState.rejected:
          doRejection();
          break;
        default:
          throw new Error(`Unknown promise state ${this.#state}`);
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

MyPromise.resolve = function (value) {
  return new MyPromise((resolve) => resolve(value));
};

MyPromise.reject = function (value) {
  return new MyPromise((_, reject) => reject(value));
};
