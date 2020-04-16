import { combineReducers } from 'redux';
import { BannerReducer } from '../pages/layout/Layout.redux';

const rootReducer = combineReducers({
  banner: BannerReducer,
});

export default rootReducer;
