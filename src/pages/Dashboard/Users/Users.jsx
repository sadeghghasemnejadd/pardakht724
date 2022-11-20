import { ReactTableWithPaginationCard as Table } from "containers/ui/ReactTableCards";
import { useEffect, useMemo, useState } from "react";
import Layout from "layout/AppLayout";
import { Label, FormGroup } from "reactstrap";
import { makeQueryString } from "services/makeQueryString";
import { useSelector, useDispatch } from "react-redux";
import { allUsers, searchUser } from "redux-toolkit/UserSlice";
import orderStyles from "pages/Dashboard/Users/order.module.css";
export default function Users() {
  const [isOpen, setIsOpen] = useState(false);
  const [filterData, setFilterData] = useState(null);
  const [filterType, setFilterType] = useState([]);
  const [order, setOrder] = useState({ type: "id", field: 0 });

  const dispatch = useDispatch();
  const { loading, users } = useSelector((store) => store.users);
  // مقادیر عنوان ستون ها
  const cols = useMemo(
    () => [
      {
        Header: "نام",
        accessor: "full_name",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
        isSort: false,
      },

      {
        Header: "شماره همراه",
        accessor: "mobile",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
        isSort: true,
      },
      {
        Header: "نقش کاربر",
        accessor: "inventer",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
        isSort: false,
      },
      {
        Header: "تعداد اکانت های فعال",
        accessor: "payment_verified_accounts",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
        isSort: false,
      },
      // {
      //   Header: "کدملی",
      //   accessor: "national_id_verifying_status_label",
      //   cellClass: "text-muted w-10",
      //   Cell: (props) => <>{props.value}</>,
      // },
      // {
      //   Header: "توافق نامه",
      //   accessor: "selfie_agreement_verifying_status_label",
      //   cellClass: "text-muted w-10",
      //   Cell: (props) => <>{props.value}</>,
      // },
      // {
      //   Header: "تلفن ثابت",
      //   accessor: "home_phone_verified_label",
      //   cellClass: "text-muted w-10",
      //   Cell: (props) => <>{props.value}</>,
      // },
      {
        Header: "وضعیت",
        accessor: "approvals",
        cellClass: "text-muted w-10",
        // cell: (props) => <></>,
        isSort: false,
      },
      {
        Header: "فعالیت ها",
        accessor: "actions",
        cellClass: "text-muted w-10",
        // cell: (props) => <></>,
        isSort: false,
      },
    ],
    []
  );
  ////////////////////////

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  const searchParams = filterData
    ? `?search_in=${makeQueryString("", filterData)}`
    : "";
  const typeParams =
    filterType.length !== 0 ? `?user_type=${filterType.join(",")}` : "";
  const orderParams = `?order_by=${order.type}:${order.field}`;
  const checkboxHandler = (e) => {
    if (e.target.checked) {
      setFilterType((prevData) =>
        Array.from(new Set([...prevData, e.target.value]))
      );
    }
  };
  const selectHandler = (e) => {
    setOrder((prevData) => {
      return { type: e.target.value, field: prevData.field };
    });
  };
  const radioHandler = (e) => {
    if (e.target.checked) {
      setOrder((prevData) => {
        return { type: prevData.type, field: e.target.value };
      });
    }
  };

  const updateField = (e) => {
    const { name, value } = e.target;
    setFilterData((prev) => ({ ...prev, [name]: value }));
  };
  const fetchUsers = async () => {
    try {
      const res = await dispatch(allUsers());
      if (res.payload.status === "ok") {
        setFilterData(null);
        setFilterType([]);
      }
    } catch (err) {
      throw err;
    }
  };
  const applyFilterByName = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(searchUser(searchParams));
      if (res.payload.status === "ok") {
        setFilterData(null);
        setFilterType([]);
        setOrder({ type: "id", field: 0 });
      }
    } catch (err) {
      throw err;
    }
  };
  const applyFilterByType = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(searchUser(typeParams));
      if (res.payload.status === "ok") {
        setFilterData(null);
        setFilterType([]);
        setOrder({ type: "id", field: 0 });
      }
    } catch (err) {
      throw err;
    }
  };
  const applyOrder = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await dispatch(searchUser(orderParams));
      if (res.payload.status === "ok") {
        setFilterData(null);
        setFilterType([]);
        setOrder({ type: "id", field: 0 });
      }
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
          title="لیست کاربران"
          data={users}
          message="کاربری با این مشخصات وجود ندارد"
        >
          <form className={orderStyles.order__form} onSubmit={applyOrder}>
            <FormGroup className={orderStyles.order__select}>
              <label htmlFor="orderlist">مرتب سازی بر اساس : </label>
              <select
                aria-label="orderlist"
                id="orderlist"
                onChange={selectHandler}
              >
                <option value="id">ای دی کاربر</option>
                <option value="email">ایمیل</option>
                <option value="mobile">شماره همراه</option>
                <option value="last_name">نام خانوادگی</option>
              </select>
            </FormGroup>
            <FormGroup className={orderStyles.order__radio}>
              <input
                type="radio"
                name="ascendant-or-anticlimactic"
                id="ascendant"
                value="1"
                onChange={radioHandler}
              />
              <label className="form-check-label" htmlFor="ascendant">
                صعودی
              </label>
            </FormGroup>
            <FormGroup className={orderStyles.order__radio}>
              <input
                type="radio"
                name="ascendant-or-anticlimactic"
                id="ascendant"
                value="0"
                onChange={radioHandler}
              />
              <label className="form-check-label" htmlFor="ascendant">
                نزولی
              </label>
            </FormGroup>
            <button className="ml-5 btn btn-primary btn-lg" type="submit">
              مرتب کردن
            </button>
          </form>
          <button
            className="btn btn-warning mb-5"
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
          >
            فیلتر پیشرفته
          </button>

          <div>
            {isOpen && <h6>فیلتر بر اساس اطلاعات شخصی</h6>}
            <form
              className="d-flex w-100 align-items-center mt-4"
              onSubmit={applyFilterByName}
            >
              <FormGroup className="form-group has-float-label w-20">
                <Label>
                  <span>نام خانوادگی</span>
                </Label>
                <input
                  className="form-control"
                  name="last_name"
                  type="text"
                  onBlur={updateField}
                />
              </FormGroup>
              {isOpen && (
                <>
                  <FormGroup className="form-group has-float-label w-20 mx-3">
                    <Label>
                      <span>نام</span>
                    </Label>
                    <input
                      className="form-control"
                      name="first_name"
                      type="text"
                      onBlur={updateField}
                    />
                  </FormGroup>
                  <FormGroup className="form-group has-float-label w-20 mx-3">
                    <Label>
                      <span>ایمیل</span>
                    </Label>
                    <input
                      className="form-control"
                      name="email"
                      type="email"
                      onBlur={updateField}
                    />
                  </FormGroup>
                  <FormGroup className="form-group has-float-label w-20 mx-3">
                    <Label>
                      <span>موبایل</span>
                    </Label>
                    <input
                      className="form-control"
                      name="mobile"
                      type="text"
                      onBlur={updateField}
                    />
                  </FormGroup>
                </>
              )}
              <button
                className="ml-5 btn btn-primary btn-lg"
                type="submit"
                onClick={applyFilterByName}
              >
                فیلتر
              </button>
            </form>
            {isOpen && (
              <div className="mt-4 mb-4">
                <h6>فیلتر بر اساس نوع همکاری</h6>
                <form
                  className="d-flex w-100 align-items-center mt-4 "
                  onSubmit={applyFilterByType}
                >
                  <FormGroup check inline className="form-check">
                    <input
                      type="checkbox"
                      value="0"
                      onChange={checkboxHandler}
                      className="form-check-input"
                      id="m-0"
                    />
                    <Label check className="form-check-label" for="m-0">
                      مشتری
                    </Label>
                  </FormGroup>
                  <FormGroup check inline className="form-check">
                    <input
                      type="checkbox"
                      value="1"
                      onChange={checkboxHandler}
                      className="form-check-input"
                      id="m-1"
                    />
                    <Label check className="form-check-label" for="m-1">
                      کارمند
                    </Label>
                  </FormGroup>
                  <FormGroup check inline className="form-check">
                    <input
                      type="checkbox"
                      value="2"
                      onChange={checkboxHandler}
                      className="form-check-input"
                      id="m-2"
                    />
                    <Label check className="form-check-label" for="m-2">
                      همکار
                    </Label>
                  </FormGroup>
                  <button
                    className="ml-5 btn btn-primary btn-lg"
                    type="submit"
                    onClick={applyFilterByType}
                  >
                    فیلتر
                  </button>
                </form>
              </div>
            )}
            <hr />
          </div>
        </Table>
      )}
    </Layout>
  );
}
