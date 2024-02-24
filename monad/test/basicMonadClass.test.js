'use strict';
const assert = require('assert');
const { it, describe } = require('mocha');
const MonadClass = require('../basicMonadClass');

describe('Test of monadic laws for class syntax', () => {
  const foo = (x) => x + 1;
  const boo = (x) => x - 1;

  const applyfoo = (value) => new MonadClass(foo(value), ['apply foo']);
  const applyboo = (value) => new MonadClass(boo(value), ['apply boo']);

  it('should follow the left identity law', () => {
    // left identity check
    // unit(value).flatMap(f) ≡ f(value)
    assert.deepStrictEqual(
      MonadClass.unit(0).flatMap(applyfoo).resolve(),
      applyfoo(0).resolve()
    );
  });

  it('should follow the right identity law', () => {
    // right identity check
    // monad.flatMap(unit) ≡ monad -> unit is neutral element of flatmap(no changes)
    const unitFoo = (x) => x;
    const applyunitfoo = (value) => new MonadClass(unitFoo(value), []);
    const applyunitfoo2 = (value) => MonadClass.unit(value);
    const applyunitfoo3 = (value) => new MonadClass(value, []);

    assert.deepStrictEqual(
      new MonadClass(0).flatMap(applyunitfoo).resolve(),
      new MonadClass(0).resolve()
    );
    assert.deepStrictEqual(
      new MonadClass(0).flatMap(applyunitfoo2).resolve(),
      new MonadClass(0).resolve()
    );
    assert.deepStrictEqual(
      new MonadClass(0).flatMap(applyunitfoo3).resolve(),
      new MonadClass(0).resolve()
    );
  });

  it('should follow the associativity law', () => {
    // asociativity check
    // monad.flatMap(f).flatMap(g) ≡ monad.flatMap(x => f(x).flatMap(g))
    assert.deepStrictEqual(
      new MonadClass(0).flatMap(applyfoo).flatMap(applyboo).resolve(),
      new MonadClass(0).flatMap((x) => applyfoo(x).flatMap(applyboo)).resolve()
    );
  });

  it('should be able to chain printvalue()', () => {
    assert.deepStrictEqual(
      new MonadClass(0)
        .flatMap(applyfoo)
        .flatMap(applyboo)
        .printValue()
        .resolve(),
      new MonadClass(0).flatMap(applyfoo).flatMap(applyboo).resolve()
    );
  });

  it('should be able to chain printLogs()', () => {
    assert.deepStrictEqual(
      new MonadClass(0)
        .flatMap(applyfoo)
        .flatMap(applyboo)
        .printLogs()
        .resolve(),
      new MonadClass(0).flatMap(applyfoo).flatMap(applyboo).resolve()
    );
  });
});
