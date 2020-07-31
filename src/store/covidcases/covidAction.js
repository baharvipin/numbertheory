import axios from 'axios';

import ACTIONS from '../../constants/store/covidAction';

const fetchCovidCasesInit = () => {
  return {
    type: ACTIONS.COVID_CASES_FETCH_INIT,
  };
};

const fetchCovidCasesFail = () => {
  return {
    type: ACTIONS.COVID_CASES_FETCH_FAIL,
  };
};

const fetchCovidCasesSuccess = (covidCases) => {
  return {
    type: ACTIONS.COVID_CASES_FETCH_SUCCESS,
    covidCases: covidCases,
  };
};

const invalidateCovidCases = () => {
  return {
    type: ACTIONS.COVID_CASES_INVALIDATE,
  };
};

const fetchCovidCases = (day) => {
  return function (dispatch, getState) {
    const currentState = getState().covidCases;
    if (!currentState.isInvalidated) return null;

    dispatch(fetchCovidCasesInit());
    axios
      .get(`https://disease.sh/v3/covid-19/historical/IN?lastdays=${day}`)
      .then(function (response) {
        dispatch(fetchCovidCasesSuccess(response.data.timeline));
      })
      .catch(function (err) {
        dispatch(fetchCovidCasesFail(err));
      });
  };
};

export default {
  fetchCovidCases,
  invalidateCovidCases,
};
