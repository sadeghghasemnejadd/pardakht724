import React, { Fragment, useEffect } from "react";
import Router from "./router/Router";

import AppLocale from "./lang";
import { NotificationContainer } from "./components/common/react-notifications";

import { connect, useDispatch, useSelector } from "react-redux";
import { myself } from "redux-toolkit/AuthSlice";

const App = ({ locale }) => {
  const currentAppLocale = AppLocale[locale];

  const { mainLoading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myself());
  }, []);

  return (
    <div className="h-100">
      {mainLoading ? (
        <div className="loading" />
      ) : (
        <Fragment>
          <NotificationContainer />
          <Router />
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return { locale };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
