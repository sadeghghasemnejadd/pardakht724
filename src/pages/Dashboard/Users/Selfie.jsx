import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Layout from "layout/AppLayout";
import { client } from "services/client";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
import { toast } from "react-toastify";

export default function NationalId() {
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [reject, setReject] = useState(false);
  const [rejectDescription, setRejectDescription] = useState("");
  const [user, setUser] = useState(null);
  const [selfie, setSelfie] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // زمانی که ایدی کاربر را از طریق پارامز دریافت کنیم در ادرس قرار میدیم و بهسمت سرور ارسال میکنیم
    client
      .get(`/users/${id}/profile/selfie-agreement`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data)
      .then((data) => {
        if (data.status === "ok") {
          setSelfie(data.selfie_agreement);
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
  const acceptSelfie = () => {
    client
      .post(
        `/users/${user.id}/profile/selfie-agreement`,
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
          toast.success("سلفی و توافقنامه با موفقیت ثبت شد");
          setTimeout(() => {
            history.push(`/users/${id}`);
          }, 2000);
        }
      });
  };

  // درخواست رد کردن مدارک کاربر
  const rejectSelfie = () => {
    if (!reject) {
      setReject(true);
    } else if (rejectDescription.length > 0) {
      client
        .post(
          `/users/${user.id}/profile/selfie-agreement`,
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
            toast.error("سلفی و توافقنامه با موفقیت رد شد");
            setTimeout(() => {
              history.push(`/users/${id}`);
            }, 2000);
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
                <Input value={user?.profile?.national_id} />
              </InputGroup>
            </div>
            <div className="col-4">
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  تصویر سلفی یا توافق نامه
                </InputGroupAddon>
                <Input value="">
                  <img src={selfie?.selfie_agreement_pic.full_size} alt="" />
                </Input>
              </InputGroup>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              {!reject && (
                <button className="btn btn-success mr-4" onClick={acceptSelfie}>
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
              <button className="btn btn-danger" onClick={rejectSelfie}>
                رد کردن
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
