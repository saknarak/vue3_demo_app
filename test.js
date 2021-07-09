function calc1(a, b, c, d, e) {
  return a + b + c + d + e
}

function calc2(obj) {
  return obj.a + obj.b + obj.c + obj.d + obj.e
}

function calc3({ a, b, c, d, e}) {
  return a + b + c + d + e
}

let obj = { id: 1, name: 2, age: 3 }
let { id, name } = obj
console.log('id=', id, 'name=', name)
