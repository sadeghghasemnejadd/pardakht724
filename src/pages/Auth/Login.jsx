import { Container, Row, Card, CardTitle } from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [mobile, setMobile] = useState(null);

  // این تابع شماره موبایل کاربر را دریافت میکند و ان را در استیت موبایل ذخیر میکند
  const getMobileValue = (mobile) => {
    setMobile(mobile);
  };

// این تابع بر اساس استپ که کاربر دارد می اید بررسی میکند که مجاز به انجام کدام عملیات هستش و بخش تعیین کننده ای هستش 
  const renderSteps = () => {
    switch (activeStep) {
      case 0:
        return (
          <StepOne
            loading={loading}
            setLoading={setLoading}
            setActiveStep={setActiveStep}
            getMobileValue={getMobileValue}
          />
        );

      case 1:
        return (
          <StepTwo loading={loading} setLoading={setLoading} mobile={mobile} />
        );

      default:
        return (
          <StepOne
            loading={loading}
            setLoading={setLoading}
            setActiveStep={setActiveStep}
            getMobileValue={getMobileValue}
          />
        );
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
                <span>ورود</span>
              </CardTitle>
              {renderSteps()}
            </div>
          </Card>
        </Colxx>
      </Row>
    </Container>
  );
};

export default Login;
