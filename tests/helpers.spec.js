import test from 'ava'

import {
  getPrefix,
  justFnNames,
  noPrefixError,
  shortestWord,
  throwError,
  toSnake,
  toUpper,
} from '../source/helpers'


test('#justFnNames', t => {
  const i = [
    ['number', 1],
    ['string', 'string'],
    ['object', {}],
    ['array', []],
    ['func', f => f],
  ]
  const o = [
    'func',
  ]

  t.deepEqual(i.reduce(justFnNames, []), o)
})

test('#getPrefix', t => {
  const cases = [
    { i: ['userInit', 'userSet', 'userDel'], o: 'user' },
    { i: ['noteInit', 'noteSet', 'noteDel'], o: 'note' },
    { i: ['formInit', 'formSet', 'formDel'], o: 'form' },
  ]

  cases.forEach(({ i, o }) => { t.is(getPrefix(i), o) })
})

test('#getPrefix: no prefix', t => {
  const i = ['in', 'out', 'test']
  const e =
    t.throws(() => getPrefix(i), Error)

  t.is(e.message, noPrefixError)
})

test('#shortestWord', t =>{
  const cases = [
    { i: ['aaa', 'a', 'aa'], o: 'a' },
    { i: ['bbb', 'bbb', 'b', 'bb'], o: 'b' },
    { i: ['c', 'cc', 'cc'], o: 'c' },
    { i: ['d', 'ee'], o: 'd' },
    { i: ['aa', 'bb', 'cc', 'd'], o: 'd' },
  ]

  cases.forEach(({ i, o }) => { t.is(shortestWord(i), o) })
})

test('#throwError', t => {
  const cases = [
    [Error, 'had an error'],
    [ReferenceError, 'had a ref error'],
    [TypeError, 'had a type error'],
  ]

  cases.forEach(([e, m]) => {
    const o =
      t.throws(() => throwError(e, m), e)

    t.is(m, o.message)
  })
})

test('#toUppercase', t =>{
  const cases = [
    { i: 'easy', o: 'EASY' },
    { i: 'weIrdCaSe', o: 'WEIRDCASE' },
    { i: 'ALREADY', o: 'ALREADY' },
    { i: 'BadCasingTwo', o: 'BADCASINGTWO' },
    { i: 'with_under_scores', o: 'WITH_UNDER_SCORES' },
  ]

  cases.forEach(({ i, o }) => { t.is(toUpper(i), o) })
})

test('#toSnakecase', t =>{
  const cases = [
    { i: 'easy', o: 'easy' },
    { i: 'easyTest', o: 'easy_test' },
    { i: 'multiHumpWord', o: 'multi_hump_word' },
    { i: 'BadCasing', o: 'bad_casing' },
    { i: 'BadCasingTwo', o: 'bad_casing_two' },
  ]

  cases.forEach(({ i, o }) => { t.is(toSnake(i), o) })
})
