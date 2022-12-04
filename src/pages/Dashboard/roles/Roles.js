import { ReactTableDivided as Table } from "containers/ui/ReactTableCards";
import React, { useEffect, useMemo, useState } from "react";
import Layout from "layout/AppLayout";
import { Colxx } from "components/common/CustomBootstrap";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import { makeQueryString } from "services/makeQueryString";
import { useSelector, useDispatch } from "react-redux";
import { getAllRoles } from "redux-toolkit/RolesSlice";
import orderStyles from "pages/Dashboard/Users/order.module.css";
const Roles = () => {
  const dispatch = useDispatch();
  const { loading, roles } = useSelector((store) => store.roles);
  const switchHandler = (e) => {
    console.log(e);
    dispatch(switchShowRole(1));
  };
  console.log(roles);
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
        cellClass: "text-muted w-20 px-5",
        Cell: (props) => {
          return (
            <Colxx xxs="6">
              <Switch
                className="custom-switch custom-switch-secondary"
                checked={props.value.isShow}
                onClick={(e) => {}}
              />
            </Colxx>
          );
        },
      },
      {
        Header: "عملیات",
        accessor: "",
        cellClass: "text-muted w-20 text-center",
        Cell: (props) => {
          return (
            <div className="glyph" style={{ cursor: "pointer" }}>
              <div className={`glyph-icon simple-icon-eye h2`} />
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

  return (
    <Layout>
      {loading && <div className="loading"></div>}
      {!loading && <Table cols={cols} title="لیست نقش ها" data={roles} />}
    </Layout>
  );
};
export default Roles;
