import type { Module, FuncMap, Reducer } from './types'
import {
  compose,
  getPrefix,
  justFnNames,
  throwError,
  toSnakecase,
  toUppercase,
} from './helpers'


export const createReducer: (m: Module) => Func =
  m => {
    const ns = getPrefix(Object.entries(m).reduce(justFnNames))

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

    return (state = m[`${ns}Init`](), { meta, data }): Reducer =>
      m[meta.updater] instanceof Function
        ? m[meta.updater](state, data)
        : state
  }


export const createActions: (m: Module) => FuncMap =
  core => Object
    .entries(core)
    .reduce(justFnNames, [])
    .reduce((us, u) => ({
      ...us,
      [u]: data => ({
        type: `app/${compose(toSnakecase, toUppercase)(u)}`,
        meta: { updater: u },
        data,
      }),
    }), {})


export const combineActions: (acs: FuncMap[]) => FuncMap =
  acs => acs.reduce(
    (acms={}, acm) => Object.assign(acms, acm)
  )
