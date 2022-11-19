import { Label, Button, Input, FormGroup } from "reactstrap";
import { useRef, useState } from "react";
import { Form, Formik, Field } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setNationalId } from "redux-toolkit/ProfileSlice";

export default function StepTwo({ handleNextStep }) {
  const { loading } = useSelector((state) => state.user_profile);

  const dispatch = useDispatch();

  const fileRef = useRef(null);
  const [is_foreign, setIs_foreign] = useState(0);
  const [isValidation, setIsValidation] = useState(false);
  const [nationalCard, setNationalCard] = useState({
    rear: null,
    front: null,
  });

  const uploadFile = (e) => {
    if (fileRef.current) {
      const file = e.target.files;
      setNationalCard((prev) => ({ ...prev, [e.target.name]: file[0] }));
    }
  };

  const handleSubmit = async (values) => {
    if (nationalCard.front && nationalCard.rear) {
      if (
        nationalCard.front.size >= 1000000 ||
        nationalCard.rear.size >= 1000000
      ) {
        toast.warn("حجم تصویر نباید بیشتر از 1 مگابایت باشد");
        return;
      }
      try {
        const formData = new FormData();
        formData.append("front", nationalCard.front);
        formData.append("rear", nationalCard.rear);
        formData.append("national_id", values.national_id);
        formData.append("is_foreign", is_foreign);
        const res = await dispatch(setNationalId(formData));
        if (res.payload) {
          toast.success("اطلاعات با موفقیت ثبت شد");
          handleNextStep();
        } else {
          toast.warn("مقادیر وارد شده اشتباه است");
        }
      } catch (err) {
        toast.error(err.response.data.error.detail);
      }
    } else {
      setIsValidation(true);
    }
  };

  const initialValues = {
    national_id: "",
  };

  const validationSchema = yup.object({
    national_id: !is_foreign
      ? yup
          .string()
          .required("وارد کردن کد ملی الزامی است")
          .min(10, "کد ملی نمی تواند کمتر از 10 رقم باشد")
          .max(10, "کد ملی نمی تواند بیشتر از 10 رقم باشد")
      : yup
          .string()
          .required("وارد کردن کد ملی الزامی است")
          .min(7, "کد ملی نمی تواند کمتر از 7 رقم باشد")
          .max(9, "کد ملی نمی تواند بیشتر از 9 رقم باشد"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <div className="wizard-basic-step">
            <Form>
              <Label>
                <span>کد ملی خود را وارد کنید</span>
              </Label>
              <FormGroup className="form-group has-float-label custom-input-upgrade-user-level">
                <Field
                  className="form-control"
                  name="national_id"
                  type="text"
                />
                {errors.national_id && touched.national_id && (
                  <div className="invalid-feedback d-block">
                    {errors.national_id}
                  </div>
                )}
              </FormGroup>
              <FormGroup>
                <Label className="form-control d-flex align-items-center">
                  {nationalCard.front
                    ? nationalCard.front.name
                    : "برای اپلود عکس روی کارت ملی کلیک کنید"}
                  <input
                    type="file"
                    ref={fileRef}
                    onChange={uploadFile}
                    name="front"
                    className="d-none"
                  />
                  {isValidation && !nationalCard.front && (
                    <div className="invalid-feedback d-block">
                      آپلود کردن رو کارت ملی اجباری است
                    </div>
                  )}
                </Label>
                <Label className="form-control d-flex align-items-center">
                  {nationalCard.rear
                    ? nationalCard.rear.name
                    : "برای اپلود عکس پشت کارت ملی کلیک کنید"}
                  <input
                    type="file"
                    ref={fileRef}
                    onChange={uploadFile}
                    name="rear"
                    className="d-none"
                  />
                  {isValidation && !nationalCard.rear && (
                    <div className="invalid-feedback d-block">
                      آپلود کردن پشت کارت ملی اجباری است
                    </div>
                  )}
                </Label>
              </FormGroup>
              <FormGroup check>
                <Input
                  id="is-foreign"
                  name="is-foreign"
                  type="checkbox"
                  onChange={(e) => setIs_foreign(e.target.checked ? 1 : 0)}
                  defaultChecked={is_foreign}
                />
                <Label check for="is-foreign" className="ml-4">
                  اتباع خارجی هستم
                </Label>
              </FormGroup>
              <div className="d-flex justify-content-end align-items-center mt-4">
                <Button
                  onClick={handleNextStep}
                  size="lg"
                  color="primary"
                  className="mr-3"
                >
                  مرحله بعد
                </Button>

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
    </>
  );
}
