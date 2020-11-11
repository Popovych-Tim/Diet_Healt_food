// filter

const names = ['Ivan', 'Anna', 'Ira', 'Sergei', 'Voldemort'];

const shortNames = names.filter((name) => {
   return(name.length < 5);
});
console.log(shortNames);

// map

let answ = ['IvaN', 'AnnA', 'igOr'];

let result = answ.map(item => {
   return item.toLowerCase();
// const result = answ.map(item => item.toLowerCase());
}); 
console.log(result);

answ = answ.map(item => item.toLowerCase());

// every/some

const arr1 = [1, 'abc', 'query'],
      arr2 = [1,2,3,4,5],
      arr3 = ['abc', 'query', 'login/pass'];

console.log(arr1.some(item => typeof(item) === 'number')); // true
console.log(arr3.some(item => typeof(item) === 'number')); // false
console.log(arr1.every(item => typeof(item) === 'number')); // false
console.log(arr2.every(item => typeof(item) === 'number')); // true

// reduce

const abc = [4, 5, 1, 6, 3, 2];
                  //  0        4
                  //  4        5
                  //  9        1
                  //  10       6
let res = abc.reduce((sum, current) => sum + current);
console.log(res); 

const list = ['apple', 'plum', 'cucumber'];
const newList = list.reduce((sum, curr) => `${sum}, ${curr}`);
console.log(newList);

let abcWithArgument = [4, 5, 1, 6, 3, 2];
abcWithArgument = abcWithArgument.reduce((sum, curr) => sum + curr, 5);
console.log(abcWithArgument);

// PRIMER

const family = {
   ivan: 'persone',
   anna: 'persone',
   cat: 'animal',
   dog: 'animal'
};

const human = Object.entries(family)
   .filter(item => item[1] === 'persone')
   .map(item => item[0]);

console.log(human);

