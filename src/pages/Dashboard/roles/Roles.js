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
  const { loading, roles } = useSelector((store) => store.roles);
  const searchInputRef = useRef();
  const [filterTypeList, setFilterTypeList] = useState({
    name: "type",
    value: [],
  });
  const history = useHistory();
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
  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

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
  const fetchRoles = async () => {
    try {
      await dispatch(getAllRoles());
    } catch (err) {
      throw err;
    }
  };
  const searchHandler = async (e, searchId) => {
    e.preventDefault();

    try {
      const searchInput = searchInputRef.current?.value;
      const searchQuery = `?search_in=${
        searchId === 0 ? "p_name" : "name"
      }:${searchInput}`;
      await dispatch(searchRoles(searchQuery));
    } catch (err) {
      throw err;
    }
  };
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
  return (
    <Layout>
      {loading && <div className="loading"></div>}
      {!loading && (
        <div>
          <Colxx lg="12" xl="9">
            <Card className="mb-4 p-5">
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
              <Table cols={cols} data={roles} />
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
