import { combineReducers } from 'redux';
import { BannerReducer } from '../routes/layout/Layout.redux';

const rootReducer = combineReducers({
  banner: BannerReducer,
});

export default rootReducer;
