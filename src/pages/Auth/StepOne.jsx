import { Label, FormGroup, Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "redux-toolkit/AuthSlice";

let validationSchema = yup.object({
  mobile: yup
    .string()
    .min(11, "شماره موبایل وارد شده نادرست است")
    .max(11, "شماره موبایل وارد شده نادرست است")
    .required("شماره موبایل الزامی است"),
  password: yup.string().required("وارد کردن رمز عبور الزامی است"),

});

const initialValues = { mobile: "09176900000", password: "secret" };


export default function StepOne({ setActiveStep, getMobileValue }) {

  const { loading } = useSelector(store => store.auth)
  const dispatch = useDispatch()

  const onUserLogin = async (values) => {
    try {
      const res = await dispatch(loginAdmin(values))
      if (res.payload.status === "ok") {
        setActiveStep(1);
        getMobileValue(values.mobile);
      }
    }
    catch (err) {
      toast.error(err.response.data.error.detail)
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onUserLogin}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => (
        <Form className="av-tooltip tooltip-label-bottom">
          <FormGroup className="form-group has-float-label">
            <Label>
              <span>شماره موبایل</span>
            </Label>
            <Field className="form-control" name="mobile" type="text" />
            {errors.mobile && touched.mobile && (
              <div className="invalid-feedback d-block">{errors.mobile}</div>
            )}
          </FormGroup>
          <FormGroup className="form-group has-float-label">
            <Label>
              <span>رمز عبور</span>
            </Label>
            <Field className="form-control" type="password" name="password" />
            {errors.password && touched.password && (
              <div className="invalid-feedback d-block">{errors.password}</div>
            )}
          </FormGroup>
          <div className="d-flex justify-content-end align-items-end mt-5">
            <Button
              color="primary"
              className={`btn-shadow btn-multiple-state ${loading ? "show-spinner" : ""
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
        </Form>
      )}
    </Formik>
  );
}
