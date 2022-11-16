import { configureStore, MiddlewareArray } from '@reduxjs/toolkit'
// import createSagaMiddleware from "redux-saga";
// import sagas from 'redux/sagas';

import settings from "redux/settings/reducer";
import menu from "redux/menu/reducer";
import todoApp from "redux/todo/reducer";
import chatApp from "redux/chat/reducer";
import surveyListApp from "redux/surveyList/reducer";
import surveyDetailApp from "redux/surveyDetail/reducer";
import profile from "redux/profile/reducer";
import users from "redux/users/reducer";

import AuthSlice from './AuthSlice'
import ProfileSlice from './ProfileSlice';


// let sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
    user_profile: ProfileSlice,
        menu,
        settings,
        todoApp,
        chatApp,
        surveyListApp,
        surveyDetailApp,
        profile,
        users,
    },
    devTools: process.env.NODE_ENV === 'development',
    // middleware: new MiddlewareArray().concat(sagaMiddleware)
})

// sagaMiddleware.run(sagas);
