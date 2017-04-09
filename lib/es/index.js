var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * @param {{ [k: string]: Function }} state updaters
 * @returns {Function} that is a pure reducer.
 */
export const createReducer = updaters => {
  const ns = extractNamespace(updaters);

  // error on !core#${ns}Init
  if (!(updaters[`${ns}Init`] instanceof Function)) {
    throw new Error(`[redux em] core#${ns}Init must exist and should ` + 'return the reducers initial state. Please make sure ' + 'you have namespaced your updaters properly. ' + 'for more information visit ' + 'https://www.npmjs.com/package/redux-em');
  }

  return (state = updaters[`${ns}Init`](), { type, data }) => updaters[type] instanceof Function ? updaters[type](state, data) : state;
};

/**
 * @param {{ [k: string]: Function }} state updaters
 * @returns {{ [k: string]: Function }} of ActionCreators
 */
export const createActions = updaters => Object.keys(updaters).reduce((acs, u) => _extends({}, acs, {
  [u]: data => ({ type: u, data })
}), {});

/**
 * @param {{ [k: string]: Function }[]} state updaters
 * @returns {{ [k: string]: Function }} of ActionCreators
 */
export const combineActions = acs => acs.reduce((acs, acm) => Object.assign(acs, acm), {});

/**
 * a helper to extract the namespace from the core module
 */
function extractNamespace(core) {
  const fnames = Object.keys(core).sort();

  const f = fnames[0];
  const l = fnames[fnames.length - 1];

  const length = f.length < l.length ? f.length : l.length;

  let i = 0;
  while (i < length && f.charAt(i) === l.charAt(i)) {
    i++;
  }

  // warn developer if no namespace
  const namespace = f.substring(0, i);
  if (namespace === '') {
    throw new Error('[redux em] your core module should be namespaced. for more ' + 'information visit https://www.npmjs.com/package/redux-em');
  }

  // if only one function in module (will match Init)
  // so we should remove substring Init
  const strippedNamespace = namespace.replace('Init', '');

  return strippedNamespace;
}