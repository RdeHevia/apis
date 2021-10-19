// Problem description:
// ​
// Step 1: Implement an Iterator class, that takes an array of elements of any type
//              - next() -> return next element
//              - hasNext() -> returns  a boolean value based on whether current element is at the
//                                      last index
// ​
// Step 2: Implement an Iterator of Iterators class
//           * [It([1,2,3)], It([4,5]), It([6])]
//

class Iterator {
  constructor(array) {
    this.array = array;
    this.currentIndex = 0;
    this.ended = false;
  }

  next() {
    if (this.ended) return null;
    const value = this.array[this.currentIndex];
    if (this.hasNext()) {
      this.currentIndex++;
    } else {
      this.ended = true;
    }
    return value;
  }

  hasNext() {
    return this.currentIndex < this.array.length - 1;
  }
}

class ListOfIterators extends Iterator {
  constructor(arrayOfIterators) {
    super(arrayOfIterators);
  }

  next() {
    if (this.ended) return null;
    const currentIterator = this.array[this.currentIndex];
    console.log("current index:", this.currentIndex);
    if (currentIterator.hasNext()) {
      return currentIterator.next();
    } else {
      this.currentIndex += 1;
      const nextIterator = this.array[this.currentIndex];
      return nextIterator.next();
    }
  }
}

let list = new ListOfIterators([
  new Iterator([1, 2, 3]),
  new Iterator([4, 5]),
  new Iterator([6]),
]);
console.log("1)", list.next()); // 1
console.log("2)", list.next()); // 2
console.log(list.next()); // 3
console.log(list.next()); // 4
console.log(list.hasNext()); // true
console.log(list.next()); // 5
console.log(list.next()); // 6
console.log(list.hasNext()); // false
console.log(list.next()); // throws error
