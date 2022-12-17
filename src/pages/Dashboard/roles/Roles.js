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
const Roles = () => {
  const dispatch = useDispatch();
  const { loading, roles } = useSelector((store) => store.roles);
  const searchPersianNameInputRef = useRef();
  const searchEnglishNameInputRef = useRef();
  const [filterTypeList, setFilterTypeList] = useState([]);
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

  const fetchRoles = async () => {
    try {
      await dispatch(getAllRoles());
    } catch (err) {
      throw err;
    }
  };
  const searchHandler = async (e) => {
    e.preventDefault();
    try {
      const englishSearch = searchEnglishNameInputRef.current?.value;
      const persianSearch = searchPersianNameInputRef.current?.value;
      const searchQuery = `?search_in=name:${
        englishSearch ? englishSearch : ""
      },p_name:${persianSearch ? persianSearch : ""}`;
      await dispatch(searchRoles(searchQuery));
    } catch (err) {
      throw err;
    }
  };
  const switchFilterHandler = (e, id) => {
    if (e) {
      setFilterTypeList((prev) => [...prev, id]);
    } else {
      setFilterTypeList((prev) => prev.filter((p) => p !== id));
    }
  };
  const filterHandler = async () => {
    try {
      const filterQuery =
        filterTypeList.length !== 0 ? `?type=${filterTypeList.join(",")}` : "";
      await dispatch(searchRoles(filterQuery));
      setFilterTypeList([]);
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
            <Table
              cols={cols}
              title="مدیریت نقش ها"
              data={roles}
              addName="افزودن نقش"
              onAdd={() => {
                history.push("roles/addrole/details");
              }}
              search={{
                placeholder: "سرج در نام نقش",
                ref: searchPersianNameInputRef,
                name: "persianSearch",
              }}
              advanceSearchOptions={[
                {
                  placeholder: "سرج در برچسب نقش",
                  ref: searchEnglishNameInputRef,
                  name: "englishSearch",
                },
              ]}
              onSearch={searchHandler}
            />
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
            />
          </Colxx>
        </div>
      )}
    </Layout>
  );
};
export default Roles;
