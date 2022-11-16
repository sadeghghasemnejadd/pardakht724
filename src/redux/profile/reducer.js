import { actionTypes } from "./actions";
const initState = {
  user: null,
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.SET_USER_PROFILE:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}
