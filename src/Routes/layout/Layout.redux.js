export const namespace = 'banner';

const REQUEST = `${namespace}/request_data`;
const HIDDEN = `${namespace}/hidden_data`;
const VISIBLE = `${namespace}/visible_data`;

const initialState = {
  isExitVisible: true,
};

export const actions = {
  requestData: () => {
    return { type: REQUEST, payload: true };
  },
  hiddenExit: (token, info) => {
    return { type: HIDDEN, payload: token, info: info };
  },
  visibleExit: (token, info) => {
    return { type: VISIBLE, payload: token, info: info };
  },
};

export const BannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST: {
      return {
        ...state,
        isExitVisible: true,
      };
    }
    case HIDDEN: {
      return {
        ...state,
        isExitVisible: false,
      };
    }
    case VISIBLE: {
      return {
        ...state,
        isExitVisible: true,
      };
    }
    default:
      return state;
  }
};
