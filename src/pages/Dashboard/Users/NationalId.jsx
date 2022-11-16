import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "layout/AppLayout";
import { client } from "services/client";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
import { toast } from "react-toastify";

export default function NationalId() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [nationalIdData, setNationalIdData] = useState(null);
  const [reject, setReject] = useState(false);
  const [rejectDescription, setRejectDescription] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // زمانی که ایدی کاربر را از طریق پارامز دریافت کنیم در ادرس قرار میدیم و بهسمت سرور ارسال میکنیم
    client
      .get(`/users/${id}/profile/national-id`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data)
      .then((data) => {
        if (data.status === "ok") {
          setNationalIdData(data.national_id);
          setLoading(false);
        }
      });

    client
      .get(`/users/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status_code === 200) {
          setUser(res.data.user);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

// درخواست تایید مدارک کاربر
  const acceptNationalId = () => {
    client
      .post(
        `/users/${user.id}/profile/national-id
    `,
        { is_confirmed: true, reject_description: null },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => res.data)
      .then((data) => {
        if (data.status === "ok") {
          toast.success("کارت ملی کاربر با موفقیت تایید شد");
        }
      });
  };

  // درخواست رد کردن مدارک کاربر
  const rejectNationalId = () => {
    if (!reject) {
      setReject(true);
    } else if (rejectDescription.length > 0) {
      client
        .post(
          `/users/${user.id}/profile/national-id
    `,
          { is_confirmed: false, reject_description: rejectDescription },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => res.data)
        .then((data) => {
          if (data.status === "ok") {
            toast.error("کارت ملی کاربر با موفقیت رد شد");
          }
        });
    }
  };

  return (
    <Layout>
      {loading ? (
        <div className="loading"></div>
      ) : (
        <div className="container">
          <h2 className="mb-5">تایید مدارک کاربر</h2>
          <div className="row">
            <div className="col-4">
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">نام</InputGroupAddon>
                <Input value={user?.first_name} />
              </InputGroup>
            </div>
            <div className="col-4">
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  نام خانوادگی
                </InputGroupAddon>
                <Input value={user?.last_name} />
              </InputGroup>
            </div>
            <div className="col-4">
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  تاریخ تولد
                </InputGroupAddon>
                <Input value={user?.birth_day} />
              </InputGroup>
            </div>
            <div className="col-4">
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">کد ملی</InputGroupAddon>
                <Input value={nationalIdData?.national_id} />
              </InputGroup>
            </div>
            <div className="col-4">
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  تصویر جلو کارت ملی
                </InputGroupAddon>
                <Input value="">
                  <img
                    src={nationalIdData?.national_id_front_pic.full_size}
                    alt=""
                  />
                </Input>
              </InputGroup>
            </div>
            <div className="col-4">
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  تصویر پشت کارت ملی
                </InputGroupAddon>
                <Input value="">
                  <img
                    src={nationalIdData?.national_id_rear_pic.full_size}
                    alt=""
                  />
                </Input>
              </InputGroup>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              {!reject && (
                <button
                  className="btn btn-success mr-4"
                  onClick={acceptNationalId}
                >
                  تایید
                </button>
              )}
              {reject && (
                <div className="mb-5">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      دلیل رد شدن
                    </InputGroupAddon>
                    <Input
                      type="textarea"
                      onChange={(e) => setRejectDescription(e.target.value)}
                    />
                  </InputGroup>
                  <small className="mt-1">
                    وارد کردن دلیل رد شدن الزامی باشد
                  </small>
                </div>
              )}
              <button className="btn btn-danger" onClick={rejectNationalId}>
                رد کردن
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
