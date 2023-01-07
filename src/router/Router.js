import { Switch, BrowserRouter as Router } from "react-router-dom";

import useRouterList from "./useRouterList";
import AdminRoutes from "./AdminRoutes";
import AuthRoutes from "./AuthRoutes";

export default function ({ token }) {
  const [publicRoutes, privateRoutes] = useRouterList();

  const renderPublicRoutes = publicRoutes.map((r, index) => {
    return (
      <AuthRoutes exact key={index} path={r.path}>
        {r.component}
      </AuthRoutes>
    );
  });

  const renderPrivateRoutes = privateRoutes.map((route, index) => (
    <AdminRoutes exact key={index} path={route.path}>
      {route.component}
    </AdminRoutes>
  ));

  return (
    <Router>
      <Switch>
        {renderPublicRoutes}
        {renderPrivateRoutes}
      </Switch>
    </Router>
  );
}
