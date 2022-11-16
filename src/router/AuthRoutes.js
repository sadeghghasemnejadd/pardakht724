import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";

export default function AuthRoutes({ children, ...rest }) {
  const location = useLocation();
  // const token = false;

  const { me } = useSelector(store => store.auth)

  return (
    <Route {...rest}>
      {!me ? (
        children
      ) : (
        <Redirect
          to={{ pathname: "/", state: { from: location } }}
        />
      )}
    </Route>
  );
}
