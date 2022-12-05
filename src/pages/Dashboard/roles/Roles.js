import { ReactTableDivided as Table } from "containers/ui/ReactTableCards";
import React, { useEffect, useMemo, useState } from "react";
import Layout from "layout/AppLayout";
import { Colxx } from "components/common/CustomBootstrap";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import SurveyApplicationMenu from "containers/applications/SurveyApplicationMenu";
import { useSelector, useDispatch } from "react-redux";
import { getAllRoles } from "redux-toolkit/RolesSlice";
import orderStyles from "pages/Dashboard/Users/order.module.css";
const Roles = () => {
  const dispatch = useDispatch();
  const { loading, roles } = useSelector((store) => store.roles);
  const [isShow, setIsShow] = useState({ show: true });
  const switchHandler = (e, id) => {
    setIsShow({ show: e, id });
  };
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
        Cell: ({ value }) => {
          return (
            <Colxx xxs="6">
              <Switch
                className="custom-switch custom-switch-secondary"
                checked={
                  isShow.id ? isShow.show && isShow.id == value.id : isShow.show
                }
                onClick={(e) => switchHandler(e, value.id)}
              />
            </Colxx>
          );
        },
      },
      {
        Header: "عملیات",
        accessor: "",
        cellClass: "text-muted w-20 text-center",
        Cell: () => {
          return (
            <div className="glyph">
              <div
                className={`glyph-icon simple-icon-eye h2`}
                style={{ cursor: "pointer" }}
              />
            </div>
          );
        },
      },
    ],
    [isShow]
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
      {!loading && (
        <>
          <Table
            cols={cols}
            title="مدیریت نقش ها"
            data={roles}
            addName="افزودن نقش"
            searchPlaceHolder="سرج در نام نقش"
            searchButtonName="سرج پیشرفته"
          />
          <SurveyApplicationMenu
            firstTitle="نوع نقش"
            secondTitle="وضعیت"
            firstOptions={["مشتری", "کارمند", "همکار"]}
            secondOptions={["فعال", "غیر فعال"]}
            buttonText="اعمال فیلتر"
          />
        </>
      )}
    </Layout>
  );
};
export default Roles;
