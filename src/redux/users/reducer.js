import { actionTypes } from "./actions";

const initState = {
  sortData: null,
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.UPDATE_SORT_DATA:
      return {
        ...state,
        sortData: { ...state.sortData, ...action.payload },
      };

    default:
      return state;
  }
}
