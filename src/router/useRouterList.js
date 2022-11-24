import { useState } from "react";

import Home from "pages/Dashboard/Home";
import CurrencyList from "pages/Dashboard/CurrencyList";
import Login from "pages/Auth/Login";
import Users from "pages/Dashboard/Users/Users";
import User from "pages/Dashboard/Users/User";
import UpdatePassword from "pages/Profile/UpdatePassword";
import UpgradeUserLevel from "pages/Profile/UpgradeUserLevel";
import NationalId from "pages/Dashboard/Users/NationalId";
import Selfie from "pages/Dashboard/Users/Selfie";
import Agreement from "pages/Dashboard/Users/Agreement";
import Roles from "pages/Dashboard/roles/Roles";
// لیست صفحات عمومی و آزاد
const defaultPublicRoutes = [
  {
    component: <Login />,
    path: "/auth/login",
  },
];

// لیست صفحاتی که نیاز به دسترسی دارند
const defaultPrivateRoutes = [
  {
    component: <Home />,
    path: "/",
  },
  {
    component: <CurrencyList />,
    path: "/currency-list",
  },
  {
    component: <Users />,
    path: "/users",
  },
  {
    component: <User />,
    path: "/users/:id",
  },
  {
    component: <UpdatePassword />,
    path: "/profile/update-password",
  },
  {
    component: <UpgradeUserLevel />,
    path: "/profile/upgrade-user-level",
  },
  {
    component: <NationalId />,
    path: "/users/:id/national-id",
  },
  {
    component: <Selfie />,
    path: "/users/:id/selfie-agreement",
  },
  {
    component: <Agreement />,
    path: "/users/:id/agreement",
  },
  {
    component: <Roles />,
    path: "/roles",
  },
];

export default function useRouterList() {
  const [privateRoutes, setPrivateRoutes] = useState(defaultPrivateRoutes);
  const [publicRoutes, setPublicRoutes] = useState(defaultPublicRoutes);

  return [publicRoutes, privateRoutes];
}
