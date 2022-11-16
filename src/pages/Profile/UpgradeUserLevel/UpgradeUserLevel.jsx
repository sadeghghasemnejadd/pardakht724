import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import AppLayout from "layout/AppLayout";
import { Stepper, Step, StepLabel } from "@mui/material";
import RTL from "theme/RTL";
import "./UpgradeUserLevel.scss";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";

function UpgradeUserLevel() {

  const [activeStep, setActiveStep] = useState(0);

  const handleNextStep = () => {
    if (activeStep < 5) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const renderSteps = () => {
    switch (activeStep) {
      case 0:
        return <StepOne handleNextStep={handleNextStep} />;
      case 1:
        return <StepTwo handleNextStep={handleNextStep} />;
      case 2:
        return <StepThree handleNextStep={handleNextStep} />;
      case 3:
        return <StepFour handleNextStep={handleNextStep} />;
      default:
        return <StepOne handleNextStep={handleNextStep} />;
    }
  };

  return (
    <>
      <AppLayout>
        <Card className="upgrade-user-level-wrapper">
          <CardBody className="wizard wizard-default upgrade-user-level-content">
            <RTL>
              <Stepper
                className="custom-stepper-container"
                activeStep={activeStep}
              >
                <Step>
                  <StepLabel>
                    <span className="custom-step-label">آدرس</span>
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel>
                    <span className="custom-step-label">کارت شناسایی</span>
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel>
                    <span className="custom-step-label">قرارداد</span>
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel>
                    <span className="custom-step-label">شماره ثابت</span>
                  </StepLabel>
                </Step>
              </Stepper>
            </RTL>
            {renderSteps()}
          </CardBody>
        </Card>
      </AppLayout>
    </>
  );
}

export default UpgradeUserLevel;
