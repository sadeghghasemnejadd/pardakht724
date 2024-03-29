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
import Details from "pages/Dashboard/roles/Details";
import AddRoles from "pages/Dashboard/roles/AddRolesDetails";
import AddRolePermissions from "pages/Dashboard/roles/AddRolePermissions";
import AddRolesTasks from "pages/Dashboard/roles/AddRolesTasks";
import Permissions from "pages/Dashboard/permissions/permissions";
import Tasks from "pages/Dashboard/tasks/Tasks";
import Currencies from "pages/Dashboard/currencies/currencies";
import ExchangeRate from "pages/Dashboard/currencies/exchangeRate";
import Histories from "pages/Dashboard/currencies/histories";
import PayMethods from "pages/Dashboard/payMethod/payMethode";
import BaseServices from "pages/Dashboard/base_services/BaseServices";
import ServiceCategories from "pages/Dashboard/service-categories/Service-categories";
import Services from "pages/Dashboard/service-categories/services";
import MainServices from "pages/Dashboard/services/Services";
import ServicesDetail from "pages/Dashboard/services/ServicesDetail";
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
  ////////////////////////
  {
    component: <Roles />,
    path: "/roles",
  },
  {
    component: <Details />,
    path: "/roles/:id",
  },
  {
    component: <AddRoles />,
    path: "/roles/addrole/details",
  },
  {
    component: <AddRolePermissions />,
    path: "/roles/addrole/:id/permissions",
  },
  {
    component: <AddRolesTasks />,
    path: "/roles/addrole/:id/tasks",
  },
  ////////////////////////////
  {
    component: <Permissions />,
    path: "/permissions",
  },
  ////////////////////////////
  {
    component: <Tasks />,
    path: "/tasks",
  },
  ////////////////////////////
  {
    component: <Currencies />,
    path: "/currencies",
  },
  {
    component: <ExchangeRate />,
    path: "/currencies/:id/exchange-rates",
  },
  {
    component: <Histories />,
    path: "/currencies/:id/histories",
  },
  /////////////////////////////
  {
    component: <PayMethods />,
    path: "/pay-methods",
  },
  /////////////////////////////
  {
    component: <BaseServices />,
    path: "/base-services",
  },
  /////////////////////////////
  {
    component: <ServiceCategories />,
    path: "/service-categories",
  },
  {
    component: <Services />,
    path: "/service-categories/:id/services",
  },
  /////////////////////////////
  {
    component: <MainServices />,
    path: "/services",
  },
  {
    component: <ServicesDetail />,
    path: "/services/:id",
  },
];

export default function useRouterList() {
  const [privateRoutes, setPrivateRoutes] = useState(defaultPrivateRoutes);
  const [publicRoutes, setPublicRoutes] = useState(defaultPublicRoutes);

  return [publicRoutes, privateRoutes];
}
