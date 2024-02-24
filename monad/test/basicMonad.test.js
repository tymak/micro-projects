'use strict';
const assert = require('assert');
const Monad = require('../basicMonad');

describe('Test of monadic laws for functional syntax', () => {
  const foo = (x) => x + 1;
  const boo = (x) => x - 1;

  const applyfoo = (value) => Monad(foo(value), ['apply foo']);
  const applyboo = (value) => Monad(boo(value), ['apply boo']);

  it('should follow the left identity law', () => {
    // left identity check
    // unit(value).flatMap(f) ≡ f(value)
    assert.deepStrictEqual(
      Monad.unit(0).flatMap(applyfoo).resolve(),
      applyfoo(0).resolve()
    );
  });

  it('should follow the right identity law', () => {
    // right identity check
    // monad.flatMap(unit) ≡ monad -> unit is neutral element of flatmap(no changes)
    const unitFoo = (x) => x;
    const applyunitfoo = (value) => Monad(unitFoo(value), []);
    const applyunitfoo2 = (value) => Monad.unit(value);
    const applyunitfoo3 = (value) => Monad(value, []);

    assert.deepStrictEqual(
      Monad(0).flatMap(applyunitfoo).resolve(),
      Monad(0).resolve()
    );

    assert.deepStrictEqual(
      Monad(0).flatMap(applyunitfoo2).resolve(),
      Monad(0).resolve()
    );

    assert.deepStrictEqual(
      Monad(0).flatMap(applyunitfoo3).resolve(),
      Monad(0).resolve()
    );
  });

  it('should follow the associativity law', () => {
    // asociativity check
    // monad.flatMap(f).flatMap(g) ≡ monad.flatMap(x => f(x).flatMap(g))
    assert.deepStrictEqual(
      Monad(0).flatMap(applyfoo).flatMap(applyboo).resolve(),
      Monad(0)
        .flatMap((x) => applyfoo(x).flatMap(applyboo))
        .resolve()
    );
  });

  it('should be able to chain printvalue()', () => {
    assert.deepStrictEqual(
      Monad(0).flatMap(applyfoo).flatMap(applyboo).resolve(),
      Monad(0).flatMap(applyfoo).flatMap(applyboo).printValue().resolve()
    );
  });

  it('should be able to chain printLogs()', () => {
    assert.deepStrictEqual(
      Monad(0).flatMap(applyfoo).flatMap(applyboo).resolve(),
      Monad(0).flatMap(applyfoo).flatMap(applyboo).printLogs().resolve()
    );
  });
});
