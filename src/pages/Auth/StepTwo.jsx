import OTPInput, { ResendOTP } from "otp-input-react";
import React, { useState } from "react";
import { Button } from "reactstrap";
import "./Login.scss";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginConfirmKey, myself } from "redux-toolkit/AuthSlice";

export default function StepTwo({ mobile }) {
  const [otp, setOtp] = useState("");
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleCheckOtp = async (e) => {
    e.preventDefault();

    if (otp.length === 6) {
      try {
        const values = { mobile, confirmation_key: otp };
        const res = await dispatch(loginConfirmKey(values));
        if (res.payload.status === "ok") {
          localStorage.setItem("token", res.payload.token);
          dispatch(myself());
        }
      } catch (err) {
        console.log(err.response);
        toast.error(err.response.data.error.detail);
      }
    }
  };

  return (
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
        <ResendOTP onResendClick={() => console.log("Resend clicked")} />
      </div>
      <div className="d-flex justify-content-end align-items-center mt-4">
        <Button
          color="primary"
          className={`btn-shadow btn-multiple-state ${
            loading ? "show-spinner" : ""
          }`}
          size="lg"
          type="submit"
          disabled={loading}
        >
          <span className="spinner d-inline-block">
            <span className="bounce1" />
            <span className="bounce2" />
            <span className="bounce3" />
          </span>
          <span className="label">
            <span>ورود</span>
          </span>
        </Button>
      </div>
    </form>
  );
}
