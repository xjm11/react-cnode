import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const configureStore = initialState => {
  const middlewares = [thunk];

  const storeEnhancer = applyMiddleware(...middlewares);
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(storeEnhancer)
      : composeWithDevTools(storeEnhancer);

  const store = createStore(rootReducer, initialState, enhancer);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
};

export default configureStore();
