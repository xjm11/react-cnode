import createModel from './createModel';
const initialState = {
  isExitVisible: true,
  count: 0,
};

const model = createModel({
  namespace: 'layout',
  state: initialState,
  reducers: {
    hiddenExit: (state) => {
      state.isExitVisible = false;
    },
    visibleExit: (state) => {
      state.isExitVisible = true;
    },
    increment: (state, payload) => {
      return {
        ...state,
        count: state.count + payload,
      };
    },
    dec(state, payload) {
      return {
        ...state,
        count: state.count - payload,
      };
    },
  },
  effects: (dispatch) => ({
    inc: (num) => {
      setTimeout(() => {
        dispatch(model.actions.increment(num));
      }, 1500);
    },
  }),
});
export default model;
