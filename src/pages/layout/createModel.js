const createModel = ({ namespace, state: initialState, reducers, effects: propEffects }) => {
  const actions = {};
  const handlers = Object.entries(reducers).reduce((all, [key, fn]) => {
    const type = `${namespace}/${key}`;
    actions[key] = (payload) => {
      return {
        type,
        payload,
      };
    };
    return {
      ...all,
      [type]: fn,
    };
  }, {});
  const reducer = (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      const fn = handlers[action.type];
      return fn(state, action.payload);
    }
    return state;
  };

  let effects = {};
  if (propEffects) {
    const effectKeys = Object.keys(propEffects());
    effects = effectKeys.reduce((all, key) => {
      return { ...all, [key]: (...params) => (dispatch) => propEffects(dispatch)[key](...params) };
    }, {});
  }

  return {
    namespace,
    actions,
    reducer,
    effects,
    dispatches: {
      ...actions,
      ...effects,
    },
  };
};

export default createModel;
