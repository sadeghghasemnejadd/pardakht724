import { ReactTableDivided as Table } from "containers/ui/ReactTableCards";
import { useEffect, useMemo, useRef, useState } from "react";
import Layout from "layout/AppLayout";
import styles from "./style.module.css";
import Switch from "rc-switch";
import { withRouter, useHistory } from "react-router-dom";
import SurveyApplicationMenu from "containers/applications/SurveyApplicationMenu";
import { useSelector, useDispatch } from "react-redux";
import { allUsers, searchUser } from "redux-toolkit/UserSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import { Card } from "reactstrap";
import HeaderLayout from "containers/ui/headerLayout";
const Users = ({ match }) => {
  const [filterTypeList, setFilterTypeList] = useState([]);
  const searchInputRef = useRef();
  const dispatch = useDispatch();
  const { loading, users } = useSelector((store) => store.users);
  const cols = useMemo(
    () => [
      {
        Header: "نام",
        accessor: "full_name",
        cellClass: "text-muted text-center",
        Cell: (props) =>
          props.value ? (
            <>{props.value}</>
          ) : (
            `${props.column.Header} تعریف نشده`
          ),
        isSort: false,
      },
      {
        Header: "تلفن همراه",
        accessor: "mobile",
        cellClass: "text-muted text-center",
        Cell: (props) =>
          props.value ? (
            <>{props.value}</>
          ) : (
            `${props.column.Header} تعریف نشده`
          ),
        isSort: false,
      },
      {
        Header: "کد ملی",
        accessor: "",
        cellClass: "text-muted text-center",
        Cell: (props) => <>تعریف نشده</>,
        isSort: true,
      },
      {
        Header: "وضعیت تایید",
        accessor: "approvals",
        cellClass: "text-muted",
        Cell: (props) => {
          const [email, nationalId, selfie, phone] = props.value;
          return (
            <div className="d-flex align-items-center h4 justify-content-between">
              <div
                className={`glyph-icon iconsminds-envelope ${
                  email && styles.text_green
                }`}
              />
              <div
                className={`glyph-icon iconsminds-id-card ml-2${
                  nationalId === "verified" && styles.text_green
                }`}
              />
              <div
                className={`glyph-icon iconsminds-credit-card ml-2${styles.text_yellow}`}
              />
              <div
                className={`glyph-icon simple-icon-camera ml-2${
                  selfie && styles.text_green
                }`}
              />
              <div
                className={`glyph-icon simple-icon-call-in ml-2 ${
                  phone && styles.text_green
                }`}
              />
            </div>
          );
        },
        isSort: true,
      },
      {
        Header: "نوع کاربر",
        accessor: "",
        cellClass: "text-muted text-center",
        Cell: (props) => <>مشتری</>,
        isSort: true,
      },
      {
        Header: "نقش کاربر",
        accessor: "",
        cellClass: "text-muted text-center",
        Cell: (props) => <>کارمند</>,
        isSort: true,
      },
      {
        Header: "تاریخ ایجاد",
        accessor: "",
        cellClass: "text-muted text-center",
        Cell: (props) => <>۱۴۰۰/۱/۱</>,
        isSort: true,
      },
      {
        Header: "وضعیت",
        accessor: "",
        cellClass: "text-muted",
        Cell: () => {
          return (
            <Switch className="custom-switch custom-switch-secondary" checked />
          );
        },
      },
      {
        Header: "عملیات",
        accessor: "id",
        cellClass: "text-muted text-center",
        Cell: ({ value }) => {
          return (
            <div className="glyph">
              <Link
                className={`glyph-icon simple-icon-eye h2`}
                style={{ cursor: "pointer" }}
                to={`/users/${value}`}
              />
            </div>
          );
        },
      },
    ],
    []
  );
  const history = useHistory();
  console.log(history);
  const breadcrumb = [
    {
      path: "/",
      text: "کاربران",
    },
    {
      path: history.location.pathname,
      text: "مدیریت کاربران",
    },
  ];
  ////////////////////////
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const searchUserHandler = async (e, searchId) => {
    e.preventDefault();
    try {
      const searchIdQuery =
        searchId === 0
          ? "first_name"
          : searchId === 1
          ? "last_name"
          : searchId === 2
          ? "email"
          : "mobile";
      const searchInput = searchInputRef.current?.value;
      const searchQuery = `?search_in=${searchIdQuery}:${searchInput}`;
      await dispatch(searchUser(searchQuery));
    } catch (err) {
      throw err;
    }
  };
  const switchFilterHandler = (e, id, parentId) => {
    switch (parentId) {
      case "type":
        if (e) {
          setFilterTypeList((prev) => [...prev, id]);
        } else {
          setFilterTypeList((prev) => prev.filter((p) => p !== id));
        }
        break;
    }
  };
  const filterHandler = async () => {
    try {
      const filterQuery =
        filterTypeList.length !== 0
          ? `?user_type=${filterTypeList.join(",")}`
          : "";
      await dispatch(searchUser(filterQuery));
      setFilterTypeList([]);
    } catch (err) {
      throw err;
    }
  };
  const fetchUsers = async () => {
    try {
      const res = await dispatch(allUsers());
      if (res.payload.status === "ok") {
        setFilterTypeList([]);
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <Layout>
      {loading && <div className="loading"></div>}
      {!loading && (
        <div className="d-flex">
          <Colxx lg="12" xl="9">
            <Card className="mb-4 p-5">
              <HeaderLayout
                title="لیست کاربران"
                addName="افزودن کاربر جدید"
                onSearch={searchUserHandler}
                hasSearch={true}
                searchInputRef={searchInputRef}
                onAdd={() => {}}
                searchOptions={[
                  {
                    id: 0,
                    name: "نام",
                  },
                  {
                    id: 1,
                    name: "نام خانوادگی",
                  },
                  {
                    id: 2,
                    name: "ایمیل",
                  },
                  {
                    id: 3,
                    name: "شماره همراه",
                  },
                ]}
                match={breadcrumb}
              />
              <Table cols={cols} data={users} pageSize={10} />
            </Card>
          </Colxx>
          <Colxx xxs="2">
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
                    { id: 0, name: "فعال" },
                    { id: 1, name: "غیر فعال" },
                  ],
                },
                {
                  id: "accept_status",
                  title: "وضعیت تایید",
                  switches: [
                    { id: 0, name: "مشتری" },
                    { id: 1, name: "کارت ملی" },
                    { id: 2, name: "کارت بانکی" },
                    { id: 3, name: "سلفی" },
                    { id: 4, name: "تلفن ثابت" },
                  ],
                },
              ]}
              onSwitch={switchFilterHandler}
              onFilter={filterHandler}
            />
          </Colxx>
        </div>
      )}
    </Layout>
  );
};

export default Users;
