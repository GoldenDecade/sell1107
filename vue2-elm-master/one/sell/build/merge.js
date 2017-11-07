const merge = require('webpack-merge')
var obj1 = {a: 1, b: 5, c: 4, m: [2, 3, 4, 5], f: {a: {b: 2, i: 4}, b: {s: 4}}},
  obj2 = {a: 2, b: 3, m: [2, 3, 4], f: {a: {b: 3, e: 2}}};
var res = merge(obj1, obj2)
// console.log(res);
/*{ a: 2,
  b: 3,
  c: 4,
  m: [ 2, 3, 4, 5, 2, 3, 4 ],
  f: { a: { b: 3, i: 4, e: 2 }, b: { s: 4 } } }
  */
var obj11 = [1,2,3],
  obj21 = [3,1,5];
var res1 = merge(obj11, obj21)
// console.log(res1);
//{ '0': 3, '1': 1, '2': 5 }

var obj111 = [{a: 1, b: 2}, {c: 3, e: 6, m: 9, n: 1}],
  obj211 = [{c: 2, a : 4}, {c: 4, e: 5, f : 7}];
var res11 = merge(obj111, obj211)
// console.log(res11);
/*{ '0': { a: 4, b: 2, c: 2 },
  '1': { c: 4, e: 5, m: 9, n: 1, f: 7 } }*/


var obj112 = {a: [1,2,3]},
  obj212 = {a: [3,1,5], b: [31,11,51]};
var res12 = merge(obj11, obj21)
console.log(res12);
// { '0': 3, '1': 1, '2': 5 }
