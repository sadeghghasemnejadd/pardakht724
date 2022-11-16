import { Container, Row, Card, CardTitle, Label, FormGroup, Button, } from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { myself, updateAdminPassword } from "redux-toolkit/AuthSlice";

const initialValues = { old_password: "123456Oo)", new_password: "123456Oo:)" };

const validationSchema = Yup.object({
  old_password: Yup.string().required("وارد کردن رمز عبور الزامی است"),
  new_password: Yup.string().required("وارد کردن رمز عبور الزامی است"),
});

const UpdatePassword = () => {

  const { loading } = useSelector(store => store.auth)
  const dispatch = useDispatch()

  const changePassword = async (values) => {
    try {
      const res = await dispatch(updateAdminPassword(values))
      if (res.payload && res.payload.status === 'ok') {
        localStorage.setItem("token", res.data.token);
        dispatch(myself())
        toast.success("تغییر رمز با موفقیت انجام شد");
      }
      else{
        toast.warn("مقادیر وارد شده اشتباه است");
      }
    }
    catch (err) {
      console.log(err);
      toast.error(err.response.data.error.detail);
    }
  };
  return (
    <Container>
      <Row>
        <Colxx
          xxs="12"
          className="h-100vh  d-flex justify-content-center align-items-center"
        >
          <Card className="auth-card radius overflow-hidden w-75 ">
            <div className="position-relative image-side"></div>
            <div className="form-side">
              <CardTitle className="mb-4">
                <span>تغییر رمز عبور</span>
              </CardTitle>
              <Formik
                initialValues={initialValues}
                onSubmit={changePassword}
                validationSchema={validationSchema}
              >
                {({ errors, touched }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <span>رمز عبور</span>
                      </Label>
                      <Field
                        className="form-control"
                        name="old_password"
                        type="password"
                      />
                      {errors.old_password && touched.old_password && (
                        <div className="invalid-feedback d-block">
                          {errors.old_password}
                        </div>
                      )}
                    </FormGroup>
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <span>رمز عبور جدید</span>
                      </Label>
                      <Field
                        name="new_password"
                        className="form-control"
                        type="password"
                      />
                      {errors.new_password && touched.new_password && (
                        <div className="invalid-feedback d-block">
                          {errors.new_password}
                        </div>
                      )}
                    </FormGroup>
                    <div className="d-flex justify-content-end align-items-end mt-5">
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
                          <span>اعمال تغییر</span>
                        </span>
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Card>
        </Colxx>
      </Row>
    </Container>
  );
};

export default UpdatePassword;
