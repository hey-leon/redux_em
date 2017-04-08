# Redux_EM - Redux Easy Mode (redux-em).

# Breaking Changes to API in 2.0
In an effort to adopt a common method of resolution of
es dependencies the import api of this package is changed.
see how to import for more details.

## concept
This package exposes an api that extends the standard
redux offering. redux-em provides a more opinionated
and simplified style of writing redux logic.

## advantages
- no more maintaining reducers or actions they are created for you.
- no need to test reducers or actions.
- a more opinionated api enforcing standards.

## api
- ```createReducer: StateUpdaters => Reducer```
- ```createActions: StateUpdaters => ActionCreators```
- ```combineActions: ActionCreators[] => ActionCreators```

## how to install
```sh
npm i -S redux-em
```

## how to import
The recommended import is the es version if you are using webpack 2:

```javascript
import { createReducer } from 'redux-em/es'
```

For for legacy imports:
```javascript
import { createReducer } from 'redux-em'

// or

const { createReducer } = require('redux-em')
```
## usage

**step one**: create your module structure

```
//
// an example module called user
//

 user/
  |- index.js // where the actions and reducer will be exposed from
  |- core.js // state updater definitions
  |- spec.js  // state updater spec/tests

```

**step two**: create your state updater functions (core module).

user/core.js

```javascript
import { Map, fromJS } from 'immutable'

// initialises the user state
export function userInit() {
  return new Map()
}

// sets the user state
export function userSet(state, { user }) {
  return fromJS(user)
}

// merges part of the user state
export function userMergeIn(state, { field, value }) {
  const path = typeof field !== Array
    ? [field]
    :  field

  return state.mergeIn(path, value)
}

```
**step three**: use the api to generate your reducer and actions.

user/index.js
```javascript
import { createReducer, createActions } from 'redux-em/es'
import * core from './core'


// user reducer
export const userReducer = createReducer(core)

/**
 * usage example:
 *
 *  import { createStore } from 'redux'
 *  import { userReducer } from './user'
 *
 *  const store = createStore(userReducer)
 */


// user actions
export const userActions = createActions(core)

/**
 * example usage:
 *
 *  import { userActions } from './user'
 *  import store from './store'
 *
 *  const user = {
 *    randomUserData: 'foobar',
 *  };
 *
 *  store.dispatch(
 *    userActions.userSet({ user })
 *  );
 */

```

**step four**: profit


## advanced api

as your project grows it is likely you will have a large amount of reducers
and actions. to manage the reducers, redux provides a helper called
combineReducers. this combines the reducers to create an index reducer.
redux-em gives a similar api, combineActions. This function takes an Array
of action modules and creates an index action module. this makes it
easier to include large action sets

```javascript
import { combineActions }  from 'redux-em/es'
import { settingsActions } from './settings'
import { randomActions }   from './random'
import { userActions }     from './user'


const actions = [
  settingsActions,
  randomActions,
  userActions,
]


export default combineActions(actions)
```





