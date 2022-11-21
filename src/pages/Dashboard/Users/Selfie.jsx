import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Layout from "layout/AppLayout";
import { client } from "services/client";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  checkSelfieAgreement,
  getSelfieAgreemnet,
  getUserData,
} from "redux-toolkit/UserSlice";
import { store } from "redux-toolkit/store";
export default function NationalId() {
  const { id } = useParams();
  const history = useHistory();
  const [reject, setReject] = useState(false);
  const [rejectDescription, setRejectDescription] = useState("");
  const dispatch = useDispatch();
  const { loading, selfie, user } = useSelector((store) => store.users);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getSelfieAgreemnet(id));
        await dispatch(getUserData(id));
      } catch (err) {
        throw err;
      }
    };
    fetchData();
  }, []);

  // درخواست تایید مدارک کاربر
  const acceptSelfie = async () => {
    try {
      const res = await dispatch(
        checkSelfieAgreement({ id: user.id, confirmed: true, message: null })
      );
      if (res.payload.status === "ok") {
        toast.success("سلفی و توافقنامه با موفقیت ثبت شد");
        setTimeout(() => {
          history.push(`/users/${id}`);
        }, 2000);
      }
    } catch (err) {
      throw err;
    }
  };

  // درخواست رد کردن مدارک کاربر
  const rejectSelfie = async () => {
    try {
      if (!reject) {
        setReject(true);
      } else if (rejectDescription.length > 0) {
        const res = await dispatch(
          checkSelfieAgreement({
            id: user.id,
            confirmed: false,
            message: rejectDescription,
          })
        );
        if (res.payload.status === "ok") {
          toast.error("سلفی و توافقنامه با موفقیت رد شد");
          setTimeout(() => {
            history.push(`/users/${id}`);
          }, 2000);
        }
      }
    } catch (err) {
      throw err;
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
                  <img src={selfie?.selfie_agreement_pic?.full_size} alt="" />
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
