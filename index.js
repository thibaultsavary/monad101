// @ts-check
class Monad {
  constructor(...items) {
    this._items = items
  }

  static get [Symbol.species]() { return this }

  static of(...values) {
    const This = this[Symbol.species]
    return new This(...values)
  }
  static from(values) {
    const This = this[Symbol.species]
    return new This(...values)
  }

  map(fn) {
    const This = this.constructor[Symbol.species]
    return new This(this._items.map(fn))
  }
  filter(fn) {
    const This = this.constructor[Symbol.species]
    return new This(this._items.filter(fn))
  }
  reduce(fn) {
    const This = this.constructor[Symbol.species]
    return new This(this._items.reduce(fn))
  }

  flatten() {
    const This = this.constructor[Symbol.species]
    return This.of(...this._items.reduce((items, x, i) => x instanceof This ? [...items, ...x._items] : [...items, x], []))
  }

  keys() {
    const This = this[Symbol.species]
    return new This([...this._items.keys()])
  }
  entries() {
    const This = this[Symbol.species]
    return new This([...this._items.entries()])
  }

  do(fn) {
    [...this._items].forEach(fn)
    return this
  }
}

Monad.of(Monad.from(['hello world']), 1, 2, 3, 5)
  .flatten()
  .do(x => console.log(x))