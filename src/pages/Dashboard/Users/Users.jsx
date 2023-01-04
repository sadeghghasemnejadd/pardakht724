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
  const [filterTypeList, setFilterTypeList] = useState({
    name: "type",
    value: [],
  });
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
          console.log(props.value);
          return (
            <div className="d-flex align-items-center h4 justify-content-between">
              <div className="tooltip_ ">
                <span className="tooltip_text">
                  {email ? "تایید شده" : "تایید نشده"}
                </span>
                <div
                  className={`glyph-icon iconsminds-envelope ${
                    email && styles.text_green
                  }`}
                />
              </div>
              <div className="tooltip_ ml-2">
                <span className="tooltip_text">
                  {nationalId === "verified" ? "تایید شده" : "تایید نشده"}
                </span>
                <div
                  className={`glyph-icon iconsminds-id-card  ${
                    nationalId === "verified" && styles.text_green
                  }`}
                />
              </div>
              <div className="tooltip_ ml-2">
                <span className="tooltip_text">در حال بررسی</span>
                <div
                  className={`glyph-icon iconsminds-credit-card  ${styles.text_yellow}`}
                />
              </div>
              <div className="tooltip_ ml-2">
                <span className="tooltip_text">
                  {selfie ? "تایید شده" : "تایید نشده"}
                </span>
                <div
                  className={`glyph-icon simple-icon-camera ${
                    selfie && styles.text_green
                  }`}
                />
              </div>
              <div className="tooltip_ ml-2">
                <span className="tooltip_text">
                  {phone ? "تایید شده" : "تایید نشده"}
                </span>
                <div
                  className={`glyph-icon simple-icon-call-in ${
                    phone && styles.text_green
                  }`}
                />
              </div>
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
      if (searchId.length === 0) return;
      const searchInput = searchInputRef.current?.value;
      const searchIdQuery = searchId
        .map((s) =>
          s === 0
            ? "first_name"
            : s === 1
            ? "last_name"
            : s === 2
            ? "email"
            : "mobile"
        )
        .map((s) => `${s}:${searchInput}`);

      const searchQuery = `?search_in=${
        searchIdQuery.length === 1 ? searchIdQuery[0] : searchIdQuery.join(",")
      }`;
      await dispatch(searchUser(searchQuery));
    } catch (err) {
      throw err;
    }
  };
  const switchFilterHandler = (e, id, parentId) => {
    switch (parentId) {
      case "type":
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
        break;
    }
  };
  const filterHandler = async () => {
    try {
      const filterQuery =
        filterTypeList.value.length !== 0
          ? `?user_type=${filterTypeList.value.join(",")}`
          : "";
      await dispatch(searchUser(filterQuery));
    } catch (err) {
      throw err;
    }
  };
  const fetchUsers = async () => {
    try {
      const res = await dispatch(allUsers());
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
              data={[filterTypeList]}
            />
          </Colxx>
        </div>
      )}
    </Layout>
  );
};

export default Users;
