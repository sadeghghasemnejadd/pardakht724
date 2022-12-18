import { ReactTableDivided as Table } from "containers/ui/ReactTableCards";
import React, { useEffect, useMemo, useState, useRef } from "react";
import Layout from "layout/AppLayout";
import { Colxx } from "components/common/CustomBootstrap";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import SurveyApplicationMenu from "containers/applications/SurveyApplicationMenu";
import { useSelector, useDispatch } from "react-redux";
import { getAllPermissions } from "redux-toolkit/permissionsSlice";
import { Link, useHistory } from "react-router-dom";
import styles from "./permissions.module.css";
const Permissions = () => {
  const dispatch = useDispatch();
  const { loading, allPermissions } = useSelector((store) => store.permissions);
  const searchInputRef = useRef();
  const [collapse, setCollapse] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [collapseText, setCollapseText] = useState("");
  const history = useHistory();
  const cols = useMemo(
    () => [
      {
        Header: "نام",
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
        Header: "توضیحات",
        accessor: "description",
        cellClass: "text-muted text-center",
        Cell: (props) => {
          if (!props.value) return <>توضیحاتی وجود ندارد</>;
          return (
            <>
              <div
                className="glyph h4 d-flex justify-content-center align-items-center"
                style={{ color: "#9d9d4c" }}
                onClick={() => {
                  setCollapse((prev) => ({
                    id: props.row.id,
                    state: !prev?.state,
                  }));
                  setCollapseText(props.value);
                }}
              >
                <p>{props.value?.slice(0, 50)}...</p>
                <div
                  className={`glyph-icon iconsminds-arrow-${
                    collapse?.state && collapse?.id == props.row.id
                      ? "up"
                      : "down"
                  }-in-circle`}
                />
              </div>
            </>
          );
        },
      },
      {
        Header: "عملیات",
        accessor: "",
        cellClass: "text-muted w-10 text-center",
        Cell: ({ value }) => {
          return (
            <>
              {isEdit && (
                <div className="d-flex justify-content-around">
                  <div
                    className="glyph"
                    style={{ color: "green", cursor: "pointer" }}
                  >
                    <div className={`glyph-icon simple-icon-check`} />
                  </div>
                  <div
                    className="glyph"
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => setIsEdit(false)}
                  >
                    <div className={`glyph-icon simple-icon-close`} />
                  </div>
                </div>
              )}
              {isEdit || (
                <div
                  className="glyph"
                  onClick={() => setIsEdit(true)}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className={`glyph-icon simple-icon-pencil text-center`}
                  />
                </div>
              )}
            </>
          );
        },
      },
    ],
    [collapse, isEdit]
  );
  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);

  const fetchPermissions = async () => {
    try {
      await dispatch(getAllPermissions());
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
  // const switchFilterHandler = (e, id) => {
  //   if (e) {
  //     setFilterTypeList((prev) => [...prev, id]);
  //   } else {
  //     setFilterTypeList((prev) => prev.filter((p) => p !== id));
  //   }
  // };
  // const filterHandler = async () => {
  //   try {
  //     const filterQuery =
  //       filterTypeList.length !== 0 ? `?type=${filterTypeList.join(",")}` : "";
  //     await dispatch(searchRoles(filterQuery));
  //     setFilterTypeList([]);
  //   } catch (err) {
  //     throw err;
  //   }
  // };
  return (
    <Layout>
      {loading && <div className="loading"></div>}
      {!loading && (
        <div>
          <Colxx lg="12" xl="12">
            <Table
              cols={cols}
              title="مدیریت دسترسی ها"
              data={allPermissions}
              addName="افزودن دسترسی"
              onAdd={() => {
                history.push("roles/addrole/details");
              }}
              search={[
                {
                  id: 0,
                  name: "سرچ در نام",
                },
                {
                  id: 1,
                  name: "سرچ در برچسب",
                },
              ]}
              onSearch={searchHandler}
              searchRef={searchInputRef}
              isCollapse={collapse}
              collapseAddOnText="توضیحات"
              isEdit={isEdit}
              collapseText={collapseText}
            />
          </Colxx>
          {/* <Colxx xxs="2">
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
          </Colxx> */}
        </div>
      )}
    </Layout>
  );
};
export default Permissions;
