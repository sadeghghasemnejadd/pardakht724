import { all } from 'redux-saga/effects';
import todoSagas from './todo/saga';
import chatSagas from './chat/saga';
import surveyListSagas from './surveyList/saga';
import surveyDetailSagas from './surveyDetail/saga';

export default function* rootSaga() {
  yield all([
    todoSagas(),
    chatSagas(),
    surveyListSagas(),
    surveyDetailSagas(),
  ]);
}
