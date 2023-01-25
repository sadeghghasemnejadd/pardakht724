import Layout from "layout/AppLayout";
import { Nav, NavItem, Button, TabContent, TabPane } from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import { NavLink, useHistory, useParams } from "react-router-dom";
import classnames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import RolesDetail from "./RolesDetail";
import RolesAccesses from "./RolesAccesses";
import RolesTasks from "./RolesTasks";
import RolesLimits from "./RolesLimits";
import { useSelector, useDispatch } from "react-redux";
import {
  getRole,
  getRolePermissions,
  updateRole,
  updatePermission,
  getRoleTasks,
} from "redux-toolkit/RolesSlice";
import { toast } from "react-toastify";
import Breadcrumb from "components/custom/Breadcrumb";
const Details = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // گرفتن ایدی از url
  const { id } = useParams();
  // گرفتن دیتا ها از ریداکس
  const { loading, role, permissions, tasks, limits, allPermissions } =
    useSelector((store) => store.roles);
  // استیت تب ها
  const [activeTab, setActiveTab] = useState("rolesDetail");
  // ایا زمان ویرایش است؟
  const [isEdit, setIsEdit] = useState(false);
  // دیتا ها برای ذخیره شدن
  const [dataForSave, setDataForSave] = useState({});

  // گرفتن اطلاعات اصلی
  useEffect(() => {
    fetchRole();
  }, []);
  // وقتی تب عوض میشه اطلاعات مربوط به اون تب از دیتابیس گرفته میشه
  useEffect(() => {
    if (activeTab === "rolesAccesses") {
      fetchPermissions();
    } else if (activeTab === "rolesTasks") {
      fetchTasks();
    }
  }, [activeTab]);
  // گرفتن اطلعات اصلی
  const fetchRole = async () => {
    try {
      await dispatch(getRole(id));
    } catch (err) {
      throw err;
    }
  };
  // تابع گرفتن اطلاعات اصلی
  const fetchPermissions = async () => {
    try {
      await dispatch(getRolePermissions(id));
    } catch (err) {
      throw err;
    }
  };
  // تابع گرفتن اطلاعات اصلی
  const fetchTasks = async () => {
    try {
      await dispatch(getRoleTasks(id));
    } catch (err) {
      throw err;
    }
  };
  // تابع هندل کردن ثبت ویرایش
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
  // بردکرامب صحفه
  const match = [
    {
      path: "/",
      text: "کاربران",
    },
    {
      path: "/roles",
      text: "مدیریت نقش ها",
    },
    {
      path: history.location.pathname,
      text: "جزییات نقش",
    },
  ];
  return (
    <Layout>
      {loading && <div className="loading"></div>}
      <Colxx xxs="12" className="pt-1">
        {/* برد کرامب صحفه و عنوان
          ورودی ها:
          title:عنوان 
          list:برد کرامب
          */}
        <Breadcrumb title="جزییات نقش" list={match} />
        {/* navbar صحفه */}
        <Nav tabs className="separator-tabs ml-0 mb-5 col-sm">
          {/* ایتم های نو بار */}
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === "rolesDetail",
                "nav-link": true,
              })}
              location={{}}
              to="#"
              onClick={() => setActiveTab("rolesDetail")}
            >
              جزییات نقش
            </NavLink>
          </NavItem>
          {/* ایتم های نو بار */}
          <NavItem>
            <NavLink
              location={{}}
              to="#"
              className={classnames({
                active: activeTab === "rolesAccesses",
                "nav-link": true,
              })}
              onClick={() => setActiveTab("rolesAccesses")}
            >
              دسترسی نقش
            </NavLink>
          </NavItem>
          {/* ایتم های نو بار */}
          <NavItem>
            <NavLink
              location={{}}
              to="#"
              className={classnames({
                active: activeTab === "rolesTasks",
                "nav-link": true,
              })}
              onClick={() => setActiveTab("rolesTasks")}
            >
              مدیریت وظایف
            </NavLink>
          </NavItem>
          {/* ایتم های نو بار */}
          <NavItem className="mr-auto">
            <NavLink
              location={{}}
              to="#"
              className={classnames({
                active: activeTab === "rolesLimit",
                "nav-link": true,
              })}
              onClick={() => setActiveTab("rolesLimit")}
            >
              محدودیت سفارش
            </NavLink>
          </NavItem>
          {/* دکمه ویرایش یا اضفه کردن دیتا  */}
          {activeTab !== "rolesLimit" ? (
            <Button
              color="primary"
              size="lg"
              className="top-right-button mr-5 mb-3"
              onClick={() => (!isEdit ? setIsEdit(true) : saveHandler())}
            >
              {isEdit ? "ذخیره" : "ویرایش"}
            </Button>
          ) : (
            <Button
              color="primary"
              size="lg"
              className="top-right-button mr-5 mb-3"
            >
              ایجاد محدودیت جدید
            </Button>
          )}
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
          // محتویات تب فعال
          <TabContent activeTab={activeTab}>
            <TabPane tabId="rolesDetail">
              <RolesDetail
                data={role}
                isEdit={isEdit}
                onDataChanged={setDataForSave}
              />
            </TabPane>
            <TabPane tabId="rolesAccesses">
              <RolesAccesses
                data={{ permissions, allPermissions }}
                isEdit={isEdit}
                onDataChanged={setDataForSave}
              />
            </TabPane>
            <TabPane tabId="rolesTasks">
              <RolesTasks
                data={tasks}
                isEdit={isEdit}
                onDataChanged={setDataForSave}
              />
            </TabPane>
            <TabPane tabId="rolesLimit">
              <RolesLimits />
            </TabPane>
          </TabContent>
        )}
      </Colxx>
    </Layout>
  );
};
export default Details;
