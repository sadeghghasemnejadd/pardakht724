import { Button, FormGroup, Label } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import "./UpgradeUserLevel.scss";

import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "redux-toolkit/ProfileSlice";

const initialValues = { address: "" };

const validationSchema = Yup.object({
  address: Yup.string()
    .required("وارد کردن آدرس اجباری است")
    .min(20, "آدرس نمی تواند کمتر 20 حرف باشد")
    .max(512, "آدرس نمی تواند بیش از 512 حرف باشد"),
});

export default function StepOne({ handleNextStep }) {

  const { loading } = useSelector(state => state.user_profile)

  const dispatch = useDispatch()

  const sendAddress = async (values) => {
    try {
      const formData = new FormData()
      formData.append('address', values.address)
      const res = await dispatch(setAddress(formData))
      if (res.payload.status === "ok") {
        toast.success("اطلاعات با موفقیت ثبت شد");
        handleNextStep();
      }
      else{
        toast.warn("مقادیر وارد شده اشتباه است");
      }
    }
    catch (err) {
      toast.error(err.response.data.error.detail)
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={sendAddress}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <div className="wizard-basic-step">
            <Form>
              <Label>
                <span>آدرس خود را وارد کنید</span>
              </Label>
              <FormGroup className="form-group has-float-label custom-input-upgrade-user-level">
                <Field className="form-control" name="address" />
                {errors.address && touched.address && (
                  <div className="invalid-feedback d-block">
                    {errors.address}
                  </div>
                )}
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
                  className={`btn-shadow btn-multiple-state ${loading ? "show-spinner" : ""
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
