import { combineReducers } from "redux";
import settings from "./settings/reducer";
import menu from "./menu/reducer";
import todoApp from "./todo/reducer";
import chatApp from "./chat/reducer";
import surveyListApp from "./surveyList/reducer";
import surveyDetailApp from "./surveyDetail/reducer";
import profile from "./profile/reducer";
import users from "./users/reducer";

const reducers = combineReducers({
  menu,
  settings,
  todoApp,
  chatApp,
  surveyListApp,
  surveyDetailApp,
  profile,
  users,
});

export default reducers;
