import React, { Fragment, useEffect } from "react";
import Router from "./router/Router";

import { NotificationContainer } from "./components/common/react-notifications";

import { useDispatch, useSelector } from "react-redux";
import { myself } from "redux-toolkit/AuthSlice";

const App = () => {
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

export default App;
