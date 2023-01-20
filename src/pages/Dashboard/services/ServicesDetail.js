import Layout from "layout/AppLayout";
import { Nav, NavItem, Button, TabContent, TabPane } from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import { NavLink, useHistory, useParams } from "react-router-dom";
import classnames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCurrencies,
  getService,
  getServicesCategories,
  getServicesPlans,
  searchCategories,
  searchPlans,
} from "redux-toolkit/ServicesSlice";
import { toast } from "react-toastify";
import Breadcrumb from "components/custom/Breadcrumb";
import ServicesDetails from "./ServicesDetails";
import ServicesPlans from "./ServicesPlans";
import ServicesCategories from "./ServicesCategories";
import HeaderLayout from "containers/ui/headerLayout";
const ServicesDetail = () => {
  const { id } = useParams();
  const { loading, service, plans, currencies, categories } = useSelector(
    (store) => store.services
  );
  const [activeTab, setActiveTab] = useState("serviceDetail");
  const [isEdit, setIsEdit] = useState(false);
  const [dataForSave, setDataForSave] = useState({});
  const [addModal, setAddModal] = useState(false);
  const searchInputRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    fetchService();
  }, [fetchService]);
  useEffect(() => {
    if (activeTab === "servicePlan") {
      fetchPlans();
    }
    if (activeTab === "serviceCategories") {
      fetchCategories();
    }
  }, [activeTab]);
  const fetchService = async () => {
    try {
      await dispatch(getService(id));
    } catch (err) {
      throw err;
    }
  };
  const fetchPlans = async () => {
    try {
      await dispatch(getServicesPlans(id));
      await dispatch(getAllCurrencies());
    } catch (err) {
      throw err;
    }
  };
  const fetchCategories = async () => {
    try {
      await dispatch(getServicesCategories(id));
    } catch (err) {
      throw err;
    }
  };
  const saveHandler = async () => {
    try {
      // در حال تکمیل
    } catch (err) {
      throw err;
    }
  };
  const searchPlanHandler = async (e) => {
    e.preventDefault();

    try {
      const searchInput = searchInputRef.current?.value;
      const searchQuery = `?search_in=name:${searchInput}`;
      await dispatch(searchPlans({ id, query: searchQuery }));
    } catch (err) {
      throw err;
    }
  };
  const searchCatgoriesHandler = async (e) => {
    e.preventDefault();

    try {
      const searchInput = searchInputRef.current?.value;
      const searchQuery = `?search_in=name:${searchInput}`;
      await dispatch(searchCategories({ id, query: searchQuery }));
    } catch (err) {
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
      path: "/services",
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
        {activeTab === "servicePlan" || activeTab === "serviceCategories" ? (
          <HeaderLayout
            title="جزییات سرویس"
            onSearch={
              activeTab === "servicePlan"
                ? searchPlanHandler
                : searchCatgoriesHandler
            }
            hasSearch={true}
            searchInputRef={searchInputRef}
            searchOptions={[
              {
                id: 0,
                name: "سرچ در نام",
              },
            ]}
            match={match}
            hasAddButton={false}
            hasBorderBottom={false}
          />
        ) : (
          <Breadcrumb title="جزییات سرویس" list={match} />
        )}

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
          {activeTab === "servicePlan" || activeTab === "serviceCategories" ? (
            <Button
              color="primary"
              size="lg"
              className="ml-auto mb-3"
              onClick={() => setAddModal(true)}
            >
              {activeTab === "servicePlan"
                ? "افزودن پلن جدید"
                : activeTab === "serviceCategories" && "افزودن دسته بندی جدید"}
            </Button>
          ) : (
            <Button
              color="primary"
              size="lg"
              className="ml-auto mb-3"
              onClick={() => (!isEdit ? setIsEdit(true) : saveHandler())}
            >
              {isEdit ? "ذخیره" : "ویرایش"}
            </Button>
          )}

          {isEdit && (
            <Button
              color="primary"
              size="lg"
              className="ml-auto mb-3"
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
              <ServicesDetails
                data={service}
                isEdit={isEdit}
                onDataChanged={setDataForSave}
              />
            </TabPane>
            <TabPane tabId="servicePlan">
              <ServicesPlans
                plans={plans}
                fetchPlans={fetchPlans}
                addModal={addModal}
                setModal={setAddModal}
                currencies={currencies}
              />
            </TabPane>
            <TabPane tabId="serviceFields">
              <p>فیلد ها</p>
            </TabPane>
            <TabPane tabId="serviceCategories">
              <ServicesCategories
                categories={categories}
                fetchCategories={fetchCategories}
                addModal={addModal}
                setModal={setAddModal}
              />
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
export default ServicesDetail;
