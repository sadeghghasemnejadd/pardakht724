import { ReactTableWithPaginationCard as Table } from "containers/ui/ReactTableCards";
import { useEffect } from "react";
import { useMemo, useState } from "react";
import { client } from "services/client";
import Layout from "layout/AppLayout";
import { Label, FormGroup } from "reactstrap";
import { makeQueryString } from "services/makeQueryString";
import { useSelector } from "react-redux";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [filterData, setFilterData] = useState(null);
  const { sortData } = useSelector((state) => state.users);

  // مقدار سرچ پارامز رو فیکس میکند
  const searchParams = filterData
    ? `?search_in=${makeQueryString("", filterData)}`
    : "";

  // مقدار سرت پارامز رو فیکس میکند
  const sortParams = sortData
    ? `${filterData ? "&" : "?"}order_by=${makeQueryString("", sortData)}`
    : "";

  // به وسیله فانکشن در خواست زده میشه به سمت سرور
  const fetchUsers = () => {
    client
      .get(`/users${searchParams}${sortParams}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (res.data.status === "ok") {
          const currentUsers = res.data.users.map((user) => ({
            ...user,
            approvals: [
              user.email_verified,
              user.national_id_verifying_status,
              user.selfie_agreement_verifying_status,
              user.home_phone_verified,
            ],
            full_name: `${user.first_name} ${user.last_name}`,
            actions: [user.id, user.is_employee],
            // is_employee_label: user.is_employee ? "کارمند" : "مشتری",
            // home_phone_verified_label: user.home_phone_verified
            //   ? "تایید شده"
            //   : "در انتظار تایید",
            // national_id_verifying_status_label:
            //   (user.national_id_verifying_status === "verified" &&
            //     "تایید شده") ||
            //   (user.national_id_verifying_status === "pending" &&
            //     "در انتظار تایید") ||
            //   (user.national_id_verifying_status === "not_verified" &&
            //     "تایید نشده"),
            // selfie_agreement_verifying_status_label:
            //   (user.selfie_agreement_verifying_status === "verified" &&
            //     "تایید شده") ||
            //   (user.selfie_agreement_verifying_status === "pending" &&
            //     "در انتظار تایید") ||
            //   (user.selfie_agreement_verifying_status === "not_verified" &&
            //     "تایید نشده"),
          }));
          setUsers(currentUsers);
          setLoading(false);
        }
      });
  };
  // با هر تغییر سرت دیتا در خواست به سمت سرور زده میشه
  useEffect(() => {
    fetchUsers();
  }, [sortData]);

  //   console.log(users);

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
      // {
      //   Header: "نام خانوادگی",
      //   accessor: "last_name",
      //   cellClass: "text-muted w-10",
      //   Cell: (props) => <>{props.value}</>,
      //   isSort: true,
      // },
      // {
      //   Header: "ایمیل",
      //   accessor: "email",
      //   cellClass: "text-muted w-10",
      //   Cell: (props) => <>{props.value}</>,
      //   isSort: true,
      // },
      {
        Header: "شماره همراه",
        accessor: "mobile",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
        isSort: true,
      },
      // {
      //   Header: "نوع کاربر",
      //   accessor: "is_employee_label",
      //   cellClass: "text-muted w-10",
      //   Cell: (props) => <>{props.value}</>,
      // },
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

  //  بعد از مونت شدن کامپوننت یک در خواست به سمت سرور ارسال میشود
  useEffect(() => {
    fetchUsers();
  }, []);

  // این تابع مقادیر فیلتردیتا را ست میکند
  const updateField = (e) => {
    const { name, value } = e.target;
    setFilterData((prev) => ({ ...prev, [name]: value }));
  };

  // تابع اعمال فیلتر
  const applyFilter = () => {
    setLoading(true);
    fetchUsers();
  };

  return (
    <Layout>
      {loading && <div className="loading"></div>}
      {!loading && (
        <Table
          rowIsLink
          cols={cols}
          title="لیست قیمت ارزها"
          data={users}
          message="کاربری با این مشخصات وجود ندارد"
        >
          <button
            className="btn btn-warning mb-5"
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
          >
            فیلتر پیشرفته
          </button>
          <div>
            <div className="d-flex w-100 align-items-center">
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
              <button className="ml-5 btn btn-primary" onClick={applyFilter}>
                فیلتر
              </button>
            </div>
          </div>
        </Table>
      )}
    </Layout>
  );
}
