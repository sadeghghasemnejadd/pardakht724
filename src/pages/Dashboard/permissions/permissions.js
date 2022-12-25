import { ReactTableDivided as Table } from "containers/ui/ReactTableCards";
import React, { useEffect, useMemo, useState, useRef } from "react";
import Layout from "layout/AppLayout";
import { Card, Input, InputGroup, InputGroupAddon } from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import SurveyApplicationMenu from "containers/applications/SurveyApplicationMenu";
import HeaderLayout from "containers/ui/headerLayout";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllPermissions,
  updatePermissions,
  searchPermissions,
} from "redux-toolkit/permissionsSlice";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./permissions.module.css";
const Permissions = () => {
  const dispatch = useDispatch();
  const { loading, allPermissions } = useSelector((store) => store.permissions);
  const searchInputRef = useRef();
  const [collapse, setCollapse] = useState();
  const [isEdit, setIsEdit] = useState();
  const [collapseData, setCollapseData] = useState([
    { type: "textarea", value: "" },
  ]);
  const [dataChanged, setDataChanged] = useState({});
  const history = useHistory();
  const cols = useMemo(
    () => [
      {
        Header: "نام",
        accessor: "p_name",
        cellClass: "text-muted w-20 text-center",
        Cell: (props) => {
          return (
            <>
              {isEdit?.state && isEdit.id == props.row.id && (
                <InputGroup className="w-70 mx-auto">
                  <Input
                    className="min-h-30 w-40"
                    value={props.value}
                    onChange={(e) =>
                      setDataChanged((prev) => ({
                        ...prev,
                        p_name: e.target.value,
                      }))
                    }
                  />{" "}
                  <InputGroupAddon addonType="prepend">
                    <span className="input-group-text">نام</span>
                  </InputGroupAddon>
                </InputGroup>
              )}{" "}
              {(isEdit?.state && isEdit.id == props.row.id) || props.value}
            </>
          );
        },
      },

      {
        Header: "برچسب",
        accessor: "name",
        cellClass: "text-muted w-20 text-center",
        Cell: (props) => {
          return (
            <>
              {isEdit?.state && isEdit.id == props.row.id && (
                <InputGroup className="w-70 mx-auto">
                  <Input
                    className="min-h-30 w-40"
                    value={props.value}
                    onChange={(e) =>
                      setDataChanged((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />{" "}
                  <InputGroupAddon addonType="prepend">
                    <span className="input-group-text">برچسب</span>
                  </InputGroupAddon>
                </InputGroup>
              )}{" "}
              {(isEdit?.state && isEdit.id == props.row.id) || props.value}
            </>
          );
        },
      },
      {
        Header: "توضیحات",
        accessor: "description",
        cellClass: "text-muted text-center",
        Cell: (props) => {
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
                  setCollapseData((prev) =>
                    prev.map((p) =>
                      p.type === "textarea"
                        ? { type: "textarea", value: props.value }
                        : p
                    )
                  );
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
        accessor: "id",
        cellClass: "text-muted w-10 text-center",
        Cell: (props) => {
          return (
            <div className="h5">
              {isEdit?.state && isEdit?.id === props.row.id && (
                <div className="d-flex justify-content-around">
                  <div
                    className="glyph"
                    style={{ color: "green", cursor: "pointer" }}
                    onClick={() => onSaveChangeHandler(props.value)}
                  >
                    <div className={`glyph-icon simple-icon-check`} />
                  </div>
                  <div
                    className="glyph"
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() =>
                      setIsEdit({ state: false, id: props.row.id })
                    }
                  >
                    <div className={`glyph-icon simple-icon-close`} />
                  </div>
                </div>
              )}
              {(isEdit?.state && isEdit.id === props.row.id) || (
                <div
                  className="glyph"
                  onClick={() => setIsEdit({ state: true, id: props.row.id })}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className={`glyph-icon simple-icon-pencil text-center`}
                  />
                </div>
              )}
            </div>
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
      await dispatch(searchPermissions(searchQuery));
    } catch (err) {
      throw err;
    }
  };
  const onSaveChangeHandler = async (id) => {
    try {
      const res = await dispatch(updatePermissions({ id, data: dataChanged }));
      if (res.payload.status === "ok") {
        toast.success("تفییرات با موفقیت ذخیره شد.");
        await fetchPermissions();
      }
    } catch (err) {
      toast.error("ویرایش دسترسی با خطا روبرو شد");
      throw err;
    }
  };
  const match = [
    {
      path: "/",
      text: "کاربران",
    },
    {
      path: history.location.pathname,
      text: "مدیریت دسترسی ها",
    },
  ];
  return (
    <Layout>
      {loading && <div className="loading"></div>}
      {!loading && (
        <div>
          <Colxx lg="12" xl="12">
            <Card className="mb-4 p-5">
              <HeaderLayout
                title="مدیریت دسترسی ها"
                addName="افزودن دسترسی جدید"
                onSearch={searchHandler}
                hasSearch={true}
                searchInputRef={searchInputRef}
                searchOptions={[
                  {
                    id: 0,
                    name: "سرچ در نام",
                  },
                  {
                    id: 1,
                    name: "سرچ در برچسب",
                  },
                ]}
                onAdd={() => {}}
                match={match}
              />
              <Table
                cols={cols}
                data={allPermissions}
                isCollapse={collapse}
                collapseAddOnText="توضیحات"
                isEdit={isEdit}
                collapseData={collapseData}
                onChangeData={setDataChanged}
              />
            </Card>
          </Colxx>
        </div>
      )}
    </Layout>
  );
};
export default Permissions;
