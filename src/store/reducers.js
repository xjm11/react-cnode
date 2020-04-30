import { combineReducers } from 'redux';
import layoutModel from '../pages/layout/Layout.redux';

const rootReducer = combineReducers({
  [layoutModel.namespace]: layoutModel.reducer,
});

export default rootReducer;
