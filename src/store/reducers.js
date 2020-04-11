import { combineReducers } from 'redux';
import { BannerReducer } from '../Routes/layout/Layout.redux';

const rootReducer = combineReducers({
  banner: BannerReducer,
});

export default rootReducer;
