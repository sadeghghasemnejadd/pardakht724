import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "layout/AppLayout";
import { client } from "services/client";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  checkNationalId,
  getNationalId,
  getUserData,
} from "redux-toolkit/UserSlice";
export default function NationalId() {
  const { id } = useParams();

  const [reject, setReject] = useState(false);
  const [rejectDescription, setRejectDescription] = useState("");
  const dispatch = useDispatch();
  const { loading, nationalIdData, user } = useSelector((store) => store.users);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getNationalId(id));
        await dispatch(getUserData(id));
      } catch (err) {
        throw err;
      }
    };
    fetchData();
  }, []);

  // درخواست تایید مدارک کاربر
  const acceptNationalId = async () => {
    try {
      const res = await dispatch(
        checkNationalId({ id: user.id, confirmed: true, message: null })
      );
      if (res.payload.status === "ok") {
        toast.success("کارت ملی کاربر با موفقیت تایید شد");
      }
    } catch (err) {
      throw err;
    }
  };

  // درخواست رد کردن مدارک کاربر
  const rejectNationalId = async () => {
    try {
      if (!reject) {
        setReject(true);
      } else if (rejectDescription.length > 0) {
        const res = await dispatch(
          checkNationalId({
            id: user.id,
            confirmed: false,
            message: rejectDescription,
          })
        );
        if (res.payload.status === "ok") {
          toast.success("کارت ملی کاربر با موفقیت رد شد");
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
                <Input value={user?.first_name} disabled />
              </InputGroup>
            </div>
            <div className="col-4">
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  نام خانوادگی
                </InputGroupAddon>
                <Input value={user?.last_name} disabled />
              </InputGroup>
            </div>
            <div className="col-4">
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  تاریخ تولد
                </InputGroupAddon>
                <Input value={user?.birth_day} disabled />
              </InputGroup>
            </div>
            <div className="col-4">
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">کد ملی</InputGroupAddon>
                <Input value={nationalIdData?.national_id} disabled />
              </InputGroup>
            </div>
            <div className="col-4">
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  تصویر جلو کارت ملی
                </InputGroupAddon>
                <Input value="">
                  <img
                    src={nationalIdData?.national_id_front_pic?.full_size}
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
                    src={nationalIdData?.national_id_rear_pic?.full_size}
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
