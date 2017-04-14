import type { Module, FuncMap, Reducer } from './types'
import {
  compose,
  getPrefix,
  justFnNames,
  throwError,
  toSnake,
  toUpper,
} from './helpers'


export const createReducer: (m: Module) => Func =
  m => {
    const ns = getPrefix(Object.entries(m).reduce(justFnNames, []))

    if (!(m[`${ns}Init`] instanceof Function)) {
      return throwError(
        Error,
        `[redux em] ${ns}Init() must exist and should ` +
        'return the reducers initial state. Please make sure ' +
        'you have namespaced your updaters properly. ' +
        'for more information visit ' +
        'https://www.npmjs.com/package/redux-em'
      )
    }

    return (state = m[`${ns}Init`](), { updater, data }): Reducer =>
      m[updater] instanceof Function
        ? m[updater](state, data)
        : state
  }


export const createActions: (m: Module) => FuncMap =
  core => Object
    .entries(core)
    .reduce(justFnNames, [])
    .reduce((us, u) => ({
      ...us,
      [u]: data => ({
        type: `app/${compose(toSnake, toUpper)(u)}`,
        updater: u,
        data,
      }),
    }), {})


export const combineActions: (acs: FuncMap[]) => FuncMap =
  acs => acs.reduce(
    (acms={}, acm) => Object.assign(acms, acm)
  )
