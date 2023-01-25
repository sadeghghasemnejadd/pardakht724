import { ReactTableDivided as Table } from "containers/ui/ReactTableCards";
import React, { useEffect, useMemo, useState, useRef } from "react";
import Layout from "layout/AppLayout";
import { Colxx } from "components/common/CustomBootstrap";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import SurveyApplicationMenu from "containers/applications/SurveyApplicationMenu";
import { useSelector, useDispatch } from "react-redux";
import { getAllRoles, searchRoles } from "redux-toolkit/RolesSlice";
import { Link, useHistory } from "react-router-dom";
import HeaderLayout from "containers/ui/headerLayout";
import { Card } from "reactstrap";
const Roles = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // گرفتن اطلاعات اصلی از ریداکس
  const { loading, roles } = useSelector((store) => store.roles);
  // اینپوت رف سرچ
  const searchInputRef = useRef();
  // استیت های فیلتر کردن
  const [filterTypeList, setFilterTypeList] = useState({
    name: "type",
    value: [],
  });
  // دیتا های اصلی جدول
  const cols = useMemo(
    () => [
      {
        Header: "نام نقش",
        accessor: "p_name",
        cellClass: "text-muted w-20 text-center",
        Cell: (props) => <>{props.value}</>,
      },

      {
        Header: "برچسب",
        accessor: "name",
        cellClass: "text-muted w-20 text-center",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "نوع نقش",
        accessor: "type",
        cellClass: "text-muted w-20 text-center",
        Cell: (props) => <>{props.value == 1 ? "کارمند" : "مشتری"}</>,
      },
      {
        Header: "وضعیت",
        accessor: "show",
        cellClass: "text-muted w-20 text-center",
        Cell: ({ value }) => {
          return (
            <Colxx xxs="6">
              <Switch className="custom-switch custom-switch-secondary mx-auto" />
            </Colxx>
          );
        },
      },
      {
        Header: "عملیات",
        accessor: "id",
        cellClass: "text-muted w-20 text-center",
        Cell: ({ value }) => {
          return (
            <div className="glyph text-center">
              <Link
                className={`glyph-icon simple-icon-eye h2`}
                style={{ cursor: "pointer" }}
                to={`/roles/${value}`}
              />
            </div>
          );
        },
      },
    ],
    []
  );
  // گرفتن اطلعات اصلی از دیتا بیس
  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);
  // تابع گرفتن اطلاعات اصلی از دیتابیس
  const fetchRoles = async () => {
    try {
      await dispatch(getAllRoles());
    } catch (err) {
      throw err;
    }
  };
  // تابع هندل کردن سرچ
  const searchHandler = async (e, searchId) => {
    e.preventDefault();

    try {
      const searchInput = searchInputRef.current?.value;
      const searchIdQuery = searchId
        .map((s) => (s === 0 ? "p_name" : "name"))
        .map((s) => `${s}:${searchInput}`);

      const searchQuery = `?search_in=${
        searchIdQuery.length === 1 ? searchIdQuery[0] : searchIdQuery.join(",")
      }`;
      await dispatch(searchRoles(searchQuery));
    } catch (err) {
      throw err;
    }
  };
  // تابع هندل کردن تغییرات فیلتر
  const switchFilterHandler = (e, id) => {
    if (e) {
      setFilterTypeList((prev) => ({
        name: "type",
        value: [...prev.value, id],
      }));
    } else {
      setFilterTypeList((prev) => ({
        name: "type",
        value: prev.value.filter((p) => p !== id),
      }));
    }
  };
  // تابع هندل کردن فیلتر
  const filterHandler = async () => {
    try {
      const filterQuery =
        filterTypeList.value.length !== 0
          ? `?type=${filterTypeList.value.join(",")}`
          : "";
      await dispatch(searchRoles(filterQuery));
    } catch (err) {
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
      path: history.location.pathname,
      text: "مدیریت نقش ها",
    },
  ];
  return (
    <Layout>
      {loading && <div className="loading"></div>}
      {!loading && (
        <div>
          <Colxx lg="12" xl="9">
            <Card className="mb-4 p-5">
              {/* برد کرامب و دکمه سرج و اضافه کردن در کامپوننت پایین قرار دارد 
            ورودی ها : 
            -title:عنوان صفحه
            -match:برای برد کرامپ
            -onSearch:تابع هندل کردن سرچ
            -hasSearch:آیا این صفحه گزینه ای برای سرچ کردن دارد یا نه
            -searchInputRef:ref برای اینپوت سرچ
            -onAdd:تابع برای وقتی که کاربر روی دکمه اضافه کردن زد
            -searchOption:آپشن های مختلف برای سرچ کردن که شامل ایدی و نام میباشد
            -
            */}
              <HeaderLayout
                title="مدیریت نقش ها"
                addName="افزودن نقش جدید"
                onSearch={searchHandler}
                hasSearch={true}
                searchInputRef={searchInputRef}
                searchOptions={[
                  {
                    id: 0,
                    name: "نام نقش",
                  },
                  {
                    id: 1,
                    name: "برچسب نقش",
                  },
                ]}
                onAdd={() => {
                  history.push("roles/addrole/details");
                }}
                match={match}
              />
              {/* برای نشان دادن جدول استفاده میشود 
            ورودی ها:
            -cols:دیتا های ستون ها 
            -data:دیتا های اصلی
            -isCollapse:آیا این جدول کالپس دارد؟
            -collapseData:وقتی که کاربر کالپس را زد چه دیتاهایی در کالپس نشان دهد
            */}
              <Table cols={cols} data={roles} />
            </Card>
          </Colxx>
          <Colxx xxs="2">
            {/* فیلتر کردن دیتا ها
            ورودی ها : 
            -filters:آپشن های فیلتر کردن
            -onSwitch:تابع سوییچ شدن فیلتر ها
            -onFilter: تابع هندل کردن فیلتر
            -data:دیتا های فلیتر شده برای ثبت تغییرات بعد از فیلتر
            */}
            <SurveyApplicationMenu
              filters={[
                {
                  id: "type",
                  title: "نوع نقش",
                  switches: [
                    { id: 0, name: "مشتری" },
                    { id: 1, name: "کارمند" },
                    { id: 2, name: "همکار" },
                  ],
                },
                {
                  id: "status",
                  title: "وضعیت",
                  switches: [
                    { id: 3, name: "فعال" },
                    { id: 4, name: "غیر فعال" },
                  ],
                },
              ]}
              onSwitch={switchFilterHandler}
              onFilter={filterHandler}
              data={[filterTypeList]}
            />
          </Colxx>
        </div>
      )}
    </Layout>
  );
};
export default Roles;
