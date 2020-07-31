import ACTIONS from '../../constants/store/covidAction';

const initialState = {
  isInvalidated: true,
};
const covidReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.COVID_CASES_FETCH_INIT:
      return {
        ...state,
        isFetching: true,
        isInvalidated: false,
      };
      break;
    case ACTIONS.COVID_CASES_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        covidCases: action.covidCases,
      };
      break;
    case ACTIONS.COVID_CASES_FETCH_FAIL:
      return {
        ...state,
        isFetching: false,
      };
      break;
    case ACTIONS.COVID_CASES_INVALIDATE:
      return {
        ...state,
        isInvalidated: true,
      };
      break;
    default:
      return state;
  }
};

export default covidReducer;
