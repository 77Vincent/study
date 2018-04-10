import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as ducks from 'ducks';
// import { reducer as formReducer } from 'redux-form';

export const rootReducer = combineReducers({
  router: routerReducer,
  // form: formReducer,
  ...Object.keys(ducks).reduce((reducers, name) => ({ ...reducers, [ducks[name].options.store]: ducks[name].reducer }), {})
});
