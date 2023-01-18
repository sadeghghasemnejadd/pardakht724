import Layout from "layout/AppLayout";
import { Nav, NavItem, Button, TabContent, TabPane } from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import { NavLink, useHistory, useParams } from "react-router-dom";
import classnames from "classnames";
import React, { useEffect, useRef, useState } from "react";
// import RolesDetail from "./RolesDetail";
// import RolesAccesses from "./RolesAccesses";
// import RolesTasks from "./RolesTasks";
// import RolesLimits from "./RolesLimits";
import { useSelector, useDispatch } from "react-redux";
// import {
//   getRole,
//   getRolePermissions,
//   updateRole,
//   updatePermission,
//   getRoleTasks,
// } from "redux-toolkit/RolesSlice";
import { toast } from "react-toastify";
import Breadcrumb from "components/custom/Breadcrumb";
const Details = () => {
  const { id } = useParams();
  // const { loading } =
  //   useSelector((store) => store.roles);
  const [activeTab, setActiveTab] = useState("serviceDetail");
  const [isEdit, setIsEdit] = useState(false);
  const [dataForSave, setDataForSave] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    fetchService();
  }, []);
  // useEffect(() => {
  //   if (activeTab === "rolesAccesses") {
  //     fetchPermissions();
  //   } else if (activeTab === "rolesTasks") {
  //     fetchTasks();
  //   }
  // }, [activeTab]);

  const fetchService = async () => {
    try {
      await dispatch(getService(id));
    } catch (err) {
      throw err;
    }
  };

  const saveHandler = async () => {
    try {
      const res =
        activeTab === "rolesDetail"
          ? await dispatch(
              updateRole({
                updatePath: `/roles/${id}`,
                updateData: dataForSave,
              })
            )
          : await dispatch(
              updatePermission({
                updatePath: `/roles/${id}/permissions`,
                updateData: dataForSave,
              })
            );
      if (res.payload.status === "ok") {
        toast.success("نقش با موفقیت آپدیت شد");
        setIsEdit(false);
        setDataForSave({});
      }
    } catch (err) {
      toast.error("آپدیت نقش با خطا مواجه شد");
      throw err;
    }
  };
  const history = useHistory();
  const match = [
    {
      path: "/",
      text: "خدمات",
    },
    {
      path: "/roles",
      text: "سرویس ها",
    },
    {
      path: history.location.pathname,
      text: "جزییات سرویس",
    },
  ];
  return (
    <Layout>
      {loading && <div className="loading"></div>}
      <Colxx xxs="12" className="pt-1">
        <Breadcrumb title="جزییات سرویس" list={match} />
        <Nav tabs className="separator-tabs ml-0 mb-5 col-sm">
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "serviceDetail",
                "nav-link": true,
              })}
              location={{}}
              to="#"
              onClick={() => setActiveTab("serviceDetail")}
            >
              جزییات سرویس
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "servicePlan",
                "nav-link": true,
              })}
              location={{}}
              to="#"
              onClick={() => setActiveTab("servicePlan")}
            >
              پلن ها
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "serviceFields",
                "nav-link": true,
              })}
              location={{}}
              to="#"
              onClick={() => setActiveTab("serviceFields")}
            >
              فیلد ها
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "serviceCategories",
                "nav-link": true,
              })}
              location={{}}
              to="#"
              onClick={() => setActiveTab("serviceCategories")}
            >
              دسته بندی
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "serviceCurrency",
                "nav-link": true,
              })}
              location={{}}
              to="#"
              onClick={() => setActiveTab("serviceCurrency")}
            >
              ارز ها
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "servicePayMethode",
                "nav-link": true,
              })}
              location={{}}
              to="#"
              onClick={() => setActiveTab("servicePayMethode")}
            >
              روش های پرداخت
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "serviceLimits",
                "nav-link": true,
              })}
              location={{}}
              to="#"
              onClick={() => setActiveTab("serviceLimits")}
            >
              محدودیت نقش ها
            </NavLink>
          </NavItem>

          <Button
            color="primary"
            size="lg"
            className="top-right-button mr-5 mb-3"
            onClick={() => (!isEdit ? setIsEdit(true) : saveHandler())}
          >
            {isEdit ? "ذخیره" : "ویرایش"}
          </Button>

          {isEdit && (
            <Button
              color="primary"
              size="lg"
              className="top-right-button mr-5 mb-3"
              onClick={() => {
                setIsEdit(false);
              }}
            >
              لغو
            </Button>
          )}
        </Nav>
        {!loading && (
          <TabContent activeTab={activeTab}>
            <TabPane tabId="serviceDetail">
              <p>جزییات سرویس</p>
            </TabPane>
            <TabPane tabId="servicePlan">
              <p>پلن ها</p>
            </TabPane>
            <TabPane tabId="serviceFields">
              <p>فیلد ها</p>
            </TabPane>
            <TabPane tabId="serviceCategories">
              <p>دسته بندی ها</p>
            </TabPane>
            <TabPane tabId="serviceCurrency">
              <p>ارز ها</p>
            </TabPane>
            <TabPane tabId="servicePayMethode">
              <p>روش های پرداخت</p>
            </TabPane>
            <TabPane tabId="serviceLimits">
              <p>محدودیت نقش ها</p>
            </TabPane>
          </TabContent>
        )}
      </Colxx>
    </Layout>
  );
};
export default Details;
