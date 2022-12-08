import Layout from "layout/AppLayout";
import { Nav, NavItem, Button, TabContent, TabPane } from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import { NavLink, useParams } from "react-router-dom";
import classnames from "classnames";
import React, { useEffect, useState } from "react";
import RolesDetail from "./RolesDetail";
import { useSelector, useDispatch } from "react-redux";
import { getRole, updateRole } from "redux-toolkit/RolesSlice";
import { toast } from "react-toastify";
const Details = () => {
  const { id } = useParams();
  const { loading, role } = useSelector((store) => store.roles);
  const [activeTab, setActiveTab] = useState("rolesDetail");
  const [isEdit, setIsEdit] = useState(false);
  const [dataForSave, setDataForSave] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    fetchRole();
  }, [fetchRole]);

  const fetchRole = async () => {
    try {
      await dispatch(getRole(id));
    } catch (err) {
      throw err;
    }
  };
  const saveHandler = async () => {
    try {
      const res = await dispatch(updateRole({ id, updateData: dataForSave }));
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
  return (
    <Layout>
      {loading && <div className="loading"></div>}
      <Colxx xxs="12">
        <h1>
          <span className="align-middle d-inline-block pt-1">جزییات نقش</span>
        </h1>
        <Nav tabs className="separator-tabs ml-0 mb-5">
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
          <NavItem>
            <NavLink
              location={{}}
              to="#"
              className={classnames({
                active: activeTab === "results",
                "nav-link": true,
              })}
              onClick={() => setActiveTab("results")}
            >
              دسترسی نقش
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              location={{}}
              to="#"
              className={classnames({
                active: activeTab === "results",
                "nav-link": true,
              })}
              onClick={() => setActiveTab("results")}
            >
              مدیریت وظایف
            </NavLink>
          </NavItem>
          <NavItem className="mr-auto">
            <NavLink
              location={{}}
              to="#"
              className={classnames({
                active: activeTab === "results",
                "nav-link": true,
              })}
              onClick={() => setActiveTab("results")}
            >
              محدودیت سفارش
            </NavLink>
          </NavItem>
          <Button
            color="primary"
            size="lg"
            className="top-right-button mr-5"
            onClick={() => (!isEdit ? setIsEdit(true) : saveHandler())}
          >
            {isEdit ? "ذخیره" : "ویرایش"}
          </Button>
        </Nav>
        {!loading && (
          <TabContent activeTab={activeTab}>
            <TabPane tabId="rolesDetail">
              <RolesDetail
                data={role}
                isEdit={isEdit}
                onDataChanged={setDataForSave}
              />
            </TabPane>
            {/* <TabPane tabId="results">
            <Row></Row>
          </TabPane> */}
          </TabContent>
        )}
      </Colxx>
    </Layout>
  );
};
export default Details;
