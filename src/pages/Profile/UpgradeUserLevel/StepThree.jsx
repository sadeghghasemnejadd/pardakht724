import { Button, FormGroup, Label } from "reactstrap";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setAgreement } from "redux-toolkit/ProfileSlice";

export default function StepThree({ handleNextStep }) {

  const { loading } = useSelector(state => state.user_profile)

  const dispatch = useDispatch()

  const [img, setImg] = useState(null);
  const [isValidation, setIsValidation] = useState(false);
  const fileRef = useRef(null);

  const uploadFile = (e) => {
    if (fileRef.current) {
      const file = e.target.files;
      setImg(file[0]);
    }
  };

  const handleSelfiePic = async (e) => {
    e.preventDefault();

    if (img) {
      try {
        const formData = new FormData();
        formData.append("agreement_pdf", img);

        const res = await dispatch(setAgreement(formData))
        if (res.payload.status === "ok") {
          toast.success("اطلاعات با موفقیت ثبت شد");
          handleNextStep();
        }
        else {
          toast.warn("مقادیر وارد شده اشتباه است");
        }
      }
      catch (err) {
        toast.error(err.response.data.error.detail)
      }

    } else {
      setIsValidation(true);
    }
  };

  return (
    <form onSubmit={handleSelfiePic}>
      <FormGroup className="form-group">
        <Label className="form-control d-flex align-items-center px-3">
          <span>
            {img ? img.name : "برای آپلود pdf قرارداد اینجا کلیک کنید"}
          </span>
          <input
            type="file"
            ref={fileRef}
            onChange={uploadFile}
            name="selfie"
            className="d-none"
          />
          {isValidation && !img && (
            <div className="invalid-feedback d-block">
              آپلود کردن pdf قرارداد اجباری است
            </div>
          )}
        </Label>
      </FormGroup>
      <div className="d-flex justify-content-end align-items-center mt-4">
        <Button onClick={handleNextStep} size="lg" color="primary" className="mr-3">مرحله بعد</Button>

        <Button
          color="primary"
          className={`btn-shadow btn-multiple-state ${loading ? "show-spinner" : ""}`}
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
  );
}
