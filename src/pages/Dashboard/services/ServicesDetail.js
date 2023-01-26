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
  getServicesCurrencies,
  getServicesPayMethods,
  getServicesPlans,
  searchCategories,
  searchCurrencies,
  searchPlans,
  searchPayMethods,
  getAllUsers,
  getAllBanks,
} from "redux-toolkit/ServicesSlice";
import Breadcrumb from "components/custom/Breadcrumb";
import ServicesDetails from "./ServicesDetails";
import ServicesPlans from "./ServicesPlans";
import ServicesCategories from "./ServicesCategories";
import ServicesCurrencies from "./ServicesCurrencies";
import ServicesPayMethods from "./ServicesPayMethods";
import HeaderLayout from "containers/ui/headerLayout";
const ServicesDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // گرفتن ایدی اصلی از url
  const { id } = useParams();
  // گرفتن دیتا از ریداکس
  const {
    loading,
    service,
    plans,
    currencies,
    categories,
    allCurrencies,
    payMethods,
    users,
  } = useSelector((store) => store.services);
  // استیت فعال بودن تب
  const [activeTab, setActiveTab] = useState("serviceDetail");
  // آیا فرم در خال ویرایش است یا نه
  const [isEdit, setIsEdit] = useState(false);
  // دیتا های اولیه جهت ذخیره اطلاعات ویرایش شده
  const [dataForSave, setDataForSave] = useState({});
  // مدال اضافه کردن دیتای جدیدد در تب پلن ها
  const [addModalPlans, setAddModalPlans] = useState(false);
  // مدال اضافه کردن دیتای جدیدد در تب دسته بندی ها
  const [addModalCategories, setAddModalCategories] = useState(false);
  // مدال اضافه کردن دیتای جدیدد در تب ارز ها
  const [addModalCurrencies, setAddModalCurrencies] = useState(false);
  // مدال اضافه کردن دیتای جدیدد در تب روش های پرداخت
  const [addModalPayMethods, setAddModalPayMethods] = useState(false);
  // ref اینپوت سرچ
  const searchInputRef = useRef();
  // گرفتن اطلاعات اولیه
  useEffect(() => {
    fetchService();
  }, [fetchService]);
  // گرفتن اطلاعات مربوط به هر تب
  useEffect(() => {
    if (activeTab === "servicePlan") {
      fetchPlans();
    }
    if (activeTab === "serviceCategories") {
      fetchCategories();
    }
    if (activeTab === "serviceCurrency") {
      fetchCurrencies();
    }
    if (activeTab === "servicePayMethode") {
      fetchPayMethods();
      fetchUsers();
      fetchBanks();
    }
  }, [activeTab]);
  // تابع های گرفتن اطلاعات از دیتا بیس
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
  const fetchCurrencies = async () => {
    try {
      await dispatch(getServicesCurrencies(id));
      await dispatch(getAllCurrencies());
    } catch (err) {
      throw err;
    }
  };
  const fetchPayMethods = async () => {
    try {
      await dispatch(getServicesPayMethods(id));
    } catch (err) {
      throw err;
    }
  };
  const fetchUsers = async () => {
    try {
      await dispatch(getAllUsers());
    } catch (err) {
      throw err;
    }
  };
  const fetchBanks = async () => {
    try {
      await dispatch(getAllBanks());
    } catch (err) {
      throw err;
    }
  };
  // تابع هندل کردن ویرایش
  const saveHandler = async () => {
    try {
      // در حال تکمیل
    } catch (err) {
      throw err;
    }
  };
  // تابع های هندل کردن سرچ مربوط به هر تب
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
  const searchCurrenciesHandler = async (e) => {
    e.preventDefault();

    try {
      const searchInput = searchInputRef.current?.value;
      const searchQuery = `?search_in=name:${searchInput}`;
      await dispatch(searchCurrencies({ id, query: searchQuery }));
    } catch (err) {
      throw err;
    }
  };
  const searchPayMethodHandler = async (e) => {
    e.preventDefault();
    try {
      const searchInput = searchInputRef.current?.value;
      const searchQuery = `?search_in=p_name:${searchInput}`;
      await dispatch(searchPayMethods({ id, query: searchQuery }));
    } catch (err) {
      throw err;
    }
  };
  // برد کرامب صحفه
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
        {/* بستگی به نوع تب داره که دکمه سرچ داشته باشه یا نه */}
        {activeTab === "servicePlan" ||
        activeTab === "serviceCategories" ||
        activeTab === "serviceCurrency" ||
        activeTab === "servicePayMethode" ? (
          <HeaderLayout
            title="جزییات سرویس"
            onSearch={
              activeTab === "servicePlan"
                ? searchPlanHandler
                : activeTab === "serviceCategories"
                ? searchCatgoriesHandler
                : activeTab === "serviceCurrency"
                ? searchCurrenciesHandler
                : activeTab === "servicePayMethode" && searchPayMethodHandler
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
        {/* نام تب ها */}
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
          {activeTab === "servicePlan" ||
          activeTab === "serviceCategories" ||
          activeTab === "serviceCurrency" ||
          activeTab === "servicePayMethode" ? (
            <Button
              color="primary"
              size="lg"
              className="ml-auto mb-3"
              onClick={() =>
                activeTab === "servicePlan"
                  ? setAddModalPlans(true)
                  : activeTab === "serviceCategories"
                  ? setAddModalCategories(true)
                  : activeTab === "serviceCurrency"
                  ? setAddModalCurrencies(true)
                  : activeTab === "servicePayMethode" &&
                    setAddModalPayMethods(true)
              }
            >
              {activeTab === "servicePlan"
                ? "افزودن پلن جدید"
                : activeTab === "serviceCategories"
                ? "افزودن دسته بندی جدید"
                : activeTab === "serviceCurrency"
                ? "افزودن ارز جدید"
                : activeTab === "servicePayMethode" && "افزودن روش پرداخت جدید"}
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
          // محتویات تب ها
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
                addModal={addModalPlans}
                setModal={setAddModalPlans}
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
                addModal={addModalCategories}
                setModal={setAddModalCategories}
              />
            </TabPane>
            <TabPane tabId="serviceCurrency">
              <ServicesCurrencies
                currencies={allCurrencies}
                currenciesData={currencies}
                fetchCurrencies={fetchCurrencies}
                addModal={addModalCurrencies}
                setModal={setAddModalCurrencies}
              />
            </TabPane>
            <TabPane tabId="servicePayMethode">
              <ServicesPayMethods
                payMethods={payMethods}
                fetchPayMethods={fetchPayMethods}
                addModal={addModalPayMethods}
                setModal={setAddModalPayMethods}
                users={users}
              />
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
