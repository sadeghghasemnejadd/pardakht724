import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { store } from "redux-toolkit/store";

const App = React.lazy(() => import("./App"));

const Main = () => {
  return (
    <Provider store={store}>
      {/* <Provider store={configureStore()}> */}
      <Suspense fallback={<div className="loading" />}>
        <Router>
          <App />
          <ToastContainer />
        </Router>
      </Suspense>
      {/* </Provider> */}
    </Provider>
  );
};

ReactDOM.render(<Main />, document.getElementById("root"));

reportWebVitals();
