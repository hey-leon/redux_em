/**
 * takes a namespace and a set of operators (core) and returns a reducer
 * that executes the operation when action.type === operator fn() name.
 * @param {String} namespace that the core operators are prepended with
 * @param {Object} core includes all of the reducers operators.
 * @returns {Function} that is a pure reducer.
 */
function createReducer(core) {
  const namespace = extractNamespace(core);

  // error on !core#${namespace}Init
  if (typeof core[`${namespace}Init`] !== 'function') {
    throw new Error(
      `[redux em] core#${namespace}Init must exist and should ` +
      'return the reducers initial state. Please make sure ' +
      'have namespace you core module\'s operators properly. ' +
      'for more information visit ' +
      'https://www.npmjs.com/package/redux-em'
    );
  }


  // the reducer
  return function reducer(state = core[`${namespace}Init`](), { type, data }) {
    if (typeof core[type] !== 'function') {
      return state;
    }
    return core[type](state, data);
  };
}


/**
 * takes a core operator module and returns a matching
 * action creators module.
 */
function createActions(core) {
  const actions = {};

  const createAction =
    fnName => actions[fnName] = data => ({ type: fnName, data });

  Object.keys(core)
        .forEach(createAction);
  
  return actions;
}


/**
 * matches the redux combineReducers helper
 * except it takes an array of action modules.
 */
function combineActions(actions) {
  const combinedActions = {};

  actions.forEach(
    a => Object.assign(combinedActions, a)
  );

  return combinedActions;
}


/**
 * a helper to extract the namespace from the core module
 */
function extractNamespace(core) {
  const fnNames = Object.keys(core)
                        .sort();

  const first = fnNames[0];
  const last =
    fnNames[fnNames.length - 1];

  const length =
    first.length < last.length ? first.length : last.length;
 
  let i = 0;
  while (
    i < length && 
    first.charAt(i) === last.charAt(i)
  ) {
    i++;
  }

  // warn developer if no namespace
  const namespace = first.substring(0, i);
  if (namespace === '') {
    console.warn(
      '[redux em] your core module should be namespaced. for more ' +
      'information visit https://www.npmjs.com/package/redux-em'
    );
  }

  // if only one function in module (will match Init)
  // so we should remove substring Init
  const strippedNamespace = namespace.replace('Init', '');

  return strippedNamespace;
}


/**
 * legacy exports
 */
module.exports = { createReducer, createActions, combineActions };