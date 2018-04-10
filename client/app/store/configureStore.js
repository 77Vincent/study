import { createStore, applyMiddleware, compose } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { rootReducer } from '../rootReducer';

const history = createHistory();
const middleware = routerMiddleware(history);

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, reduxPackMiddleware, middleware),
    ),
  );

  return store;
};

const store = configureStore();

export { store, history };
