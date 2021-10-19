async function runPromises(fns, concurrencyLimit) {
  let queue = [...fns];
  let concurrencyCounter = 0;
  let concurrentPendingPromises = [];

  while (queue.length > 0) {
    console.log(queue.length);
    while (concurrencyCounter < concurrencyLimit) {
      console.log(queue.length, concurrencyCounter);
      const func = queue.pop();
      const promise = func();
      concurrentPendingPromises.push(promise);
      concurrencyCounter += 1;
    }
    const [idx, result] = await Promise.race(
      concurrentPendingPromises.map((promise, idx) =>
        promise.then((result) => [idx, result])
      )
    );
    concurrentPendingPromises.splice(idx, 1);
  }
}

const asyncFuncLong = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 6000);
  });
};

const asyncFuncShort = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

let fns = [
  asyncFuncLong,
  asyncFuncShort,
  asyncFuncLong,
  asyncFuncLong,
  asyncFuncLong,
  asyncFuncLong,
  asyncFuncLong,
  asyncFuncLong,
  asyncFuncLong,
  asyncFuncLong,
  asyncFuncShort,
  asyncFuncShort,
  asyncFuncShort,
  asyncFuncShort,
  asyncFuncShort,
  asyncFuncShort,
  asyncFuncShort,
  asyncFuncShort,
  asyncFuncLong,
  asyncFuncShort,
  asyncFuncShort,
  asyncFuncShort,
];

runPromises(fns, 10).then(() => {
  console.log("runtime", Date.now() - start);
}); // logs approximately 12000
