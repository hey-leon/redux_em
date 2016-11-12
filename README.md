# Redux_EM - Redux Easy Mode (redux-em).

## concept
This package exposes an api that extends the standard 
redux offering. redux-em provides a more opinionated
and simplified style of writing redux logic.

## advantages
- no more maintaining reducers or or actions they are created for you.
- no need to test reducers or actions.
- a more opinionated api enforcing standards.

## api
- ```createReducer(coreModule: Object) : Function```
- ```createActions(coreModule: Object) : Object```
- ```combineActions(actionModules: Array) : Object```

## how to install
```sh
npm i -S redux-em
```

## how to import
the default import uses native imports (to support tree-shaking):
```javascript
import { createReducer } from 'redux-em';
```

or for legacy importing:
```javascript
import { createReducer } form 'redux-em/legacy';

// or

const { createReducer } = require('redux-em/legacy');
```
## usage

**step one**: create your module structure

```
/**
 * an example module called user
 */

 user/
  |- index.js // where the actions and reducer will be exposed from
  |- core/
      |- index.js // state operator definitions
      |- spec.js  // state operator spec/tests

```

**step two**: create your state operator functions (coreModule).

user/core/index.js

```javascript
/**
 * @module user core operators
 */
import { Map, fromJS } from 'immutable';

// initialises the user state
export function userInit() {
  return new Map();
}

// sets the user state
export function userSet(state, { user }) {
  return fromJS(user);
}

// merges part of the user state
export function userMergeIn(state, { field, value }) {
  const path =
    typeof field !== Array ? [field] : field;

  return state.mergeIn(path, value);
}

```
**step three**: use the api to generate your reducer and actions.

user/index.js
```javascript
/**
 * @module user reducer & actions
 */
import { createReducer, createActions } from 'redux-em';
import * core from './core';


// user reducer
export const userReducer = createReducer(core);

/**
 * an example using the reducer would be:
 *  
 *  import { userReducer } form './user';
 *  import { createStore } from 'redux';
 *  
 *  const store = createStore(userReducer);
 */


// user actions
export const userActions = createActions(core);

/**
 * an example of using the actions would be:
 * 
 *  import { userActions } from './user';
 *  import store from './store';
 *  
 *  const user = {
 *    randomUserData: 'foobar',
 *  };
 *  
 *  store.dispatch(
 *    userActions.userSet({ user });
 *  );
 */

```

**step four**: profit


## advanced api

as your project grows it is likely you will have a large amount of reducers
and actions. to manage the reducers, redux provides a helper called
combineReducers. this combines the reducers to created an index reducer.
redux-em gives a similar api combineActions. This function takes an Array
of action modules and creates an index action module.

```javascript
import { combineActions } from 'redux-em';

import { settingsActions } from './settings';
import { randomActions } from './random'; 
import { userActions } from './user';


const actions = [
  settingsActions,
  randomActions,
  userActions,
];


export default combineActions(actions);
```





