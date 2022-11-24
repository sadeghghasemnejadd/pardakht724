import { ReactTableWithPaginationCard as Table } from "containers/ui/ReactTableCards";
import { useEffect, useMemo, useState } from "react";
import Layout from "layout/AppLayout";
import { Label, FormGroup } from "reactstrap";
import { makeQueryString } from "services/makeQueryString";
import { useSelector, useDispatch } from "react-redux";
import { getAllRoles } from "redux-toolkit/RolesSlice";
import orderStyles from "pages/Dashboard/Users/order.module.css";
const Roles = () => {
  const dispatch = useDispatch();
  const { loading, roles } = useSelector((store) => store.roles);

  const cols = useMemo(
    () => [
      {
        Header: "نام انگلیسی",
        accessor: "name",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
        isSort: false,
      },

      {
        Header: "نام فارسی",
        accessor: "p_name",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
        isSort: true,
      },
      {
        Header: "نوع",
        accessor: "type",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
        isSort: false,
      },
      {
        Header: "توضیحات",
        accessor: "description",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
        isSort: false,
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
      {!loading && (
        <Table
          rowIsLink
          cols={cols}
          title="لیست نقش ها"
          data={roles}
          message="نقشی با این مشخصات وجود ندارد"
        >
          <div>
            <hr />
          </div>
        </Table>
      )}
    </Layout>
  );
};
export default Roles;
