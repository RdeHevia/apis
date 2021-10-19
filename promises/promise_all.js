/*
INPUT: array of promises
OUTPUT: 
  - if all promises success -> returns a single promise that resolves to an array of the results
  - else -> rejected promise
ALGO:
  - return a single promise
  - loop through promises
  - if 
*/

// const myPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('foo');
//   }, 300);
// });

// myPromise
//   .then(handleResolvedA, handleRejectedA)
//   .then(handleResolvedB, handleRejectedB)
//   .then(handleResolvedC, handleRejectedC);

async function promiseAll(arrOfPromises) {
  const resolvedPromises = [];
  for (let idx = 0; idx < arrOfPromises.length; idx++) {
    try {
      const succeddedPromise = await arrOfPromises[idx];
      resolvedPromises.push(succeddedPromise);
    } catch (e) {
      Promise.reject(e);
    }
  }

  return resolvedPromises;
}

// function promiseAll(arrOfPromises) {
//   //   const resolvedPromises = [];
//   //   for (let idx = 0; idx < arrOfPromises.length; idx++) {
//   //     const promise = arrOfPromises[idx];
//   //     promise.then(val => resolvedPromises.push(val)).catch(e => {
//   //       resolvedPromises = e;
//   //     })
//   //   }

//   // return resolvedPromises;

//   return new Promise((resolve, reject) => {
//     // loop through each promise
//     // if any promise rejects, resolve that error (rejected by the single promise)
//     // check if all promises succeed, we resolve all the results in an array
//   });
// }

// Promise.all([
//   // Result: [1, 2, 3]
//   new Promise((resolve) => setTimeout(() => resolve(1), 3000)),
//   new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
//   new Promise((resolve) => setTimeout(() => resolve(3), 1000)),
//   Promise.reject("error"),
// ])
//   .then((arr) => console.log(arr))
//   .catch((err) => console.log(err));

promiseAll([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)),
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)),
  Promise.reject("error"),
])
  .then((arr) => console.log(arr))
  .catch((err) => console.log(err));
