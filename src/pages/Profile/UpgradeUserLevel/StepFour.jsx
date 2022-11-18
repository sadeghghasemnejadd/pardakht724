import { Button, FormGroup, Label } from "reactstrap";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { client } from "services/client";
import * as Yup from "yup";
import OTPInput, { ResendOTP } from "otp-input-react";
import "./UpgradeUserLevel.scss";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setConfirmHomePhone, setHomePhone } from "redux-toolkit/ProfileSlice";

const initialValues = { phone: "" };

const validationSchema = Yup.object({
  phone: Yup.string()
    .length(11, "تلفن ثابت باید 11 رقم باشد")
    .required("وارد کردن تلفن اجباری است"),
});

export default function StepFour() {
  const { loading } = useSelector((state) => state.user_profile);

  const dispatch = useDispatch();

  const history = useHistory();

  const [activeStep, setActiveStep] = useState(false);
  const [phone, setPhone] = useState(null);
  const [otp, setOtp] = useState("");

  const sendPhone = async (values) => {
    try {
      const formData = new FormData();
      formData.append("home_phone", values.phone);
      const res = await dispatch(setHomePhone(formData));
      console.log(res);
      if (res.payload.status === "ok") {
        toast.success("کد تاییدیه به شماره همراه شما ارسال شد");
        setActiveStep(true);
        setPhone(values.phone);
      } else {
        toast.warn("مقادیر وارد شده اشتباه است");
      }
    } catch (err) {
      toast.error(err.response.data.error.detail);
    }
  };

  const handleCheckOtp = async (e) => {
    e.preventDefault();

    if (otp.length === 6) {
      try {
        const formData = new FormData();
        formData.append("home_phone", phone);
        formData.append("confirmation_key", otp);
        const res = await dispatch(setConfirmHomePhone(formData));
        if (res.payload.status === "ok") {
          toast.success("اطلاعات با موفقیت ثبت شد");
          history.push("/");
        } else {
          toast.warn("مقادیر وارد شده اشتباه است");
        }
      } catch (err) {
        toast.error(err.response.data.error.detail);
      }
    }
  };

  return (
    <>
      {!activeStep ? (
        <Formik
          initialValues={initialValues}
          onSubmit={sendPhone}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <div className="wizard-basic-step">
              <Form>
                <Label>
                  <span>تلفن ثابت خود را وارد کنید</span>
                </Label>
                <FormGroup className="form-group has-float-label custom-input-upgrade-user-level">
                  <Field className="form-control" name="phone" type="text" />
                  {errors.phone && touched.phone && (
                    <div className="invalid-feedback d-block">
                      {errors.phone}
                    </div>
                  )}
                </FormGroup>
                <div className="d-flex justify-content-end align-items-center mt-4">
                  <Button
                    color="primary"
                    className={`btn-shadow btn-multiple-state ${
                      loading ? "show-spinner" : ""
                    }`}
                    size="lg"
                    type="submit"
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">
                      <span>ثبت</span>
                    </span>
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      ) : (
        <form onSubmit={handleCheckOtp}>
          <div className="otp-container">
            <OTPInput
              autoFocus
              className="custom-otp"
              inputClassName="custom-otp-input"
              value={otp}
              onChange={setOtp}
              OTPLength={6}
              otpType="number"
              disabled={false}
            />
            <ResendOTP onResendClick={() => setActiveStep(false)} />
          </div>
          <div className="d-flex justify-content-end align-items-center mt-4">
            <Button
              color="primary"
              className={`btn-shadow btn-multiple-state ${
                loading ? "show-spinner" : ""
              }`}
              size="lg"
              type="submit"
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <span>ثبت</span>
              </span>
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
