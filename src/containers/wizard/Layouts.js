/* eslint-disable no-param-reassign */
import React from "react";
import { Card, CardBody, Row } from "reactstrap";
import { Wizard, Steps, Step } from "react-albus";
import BottomNavigation from "components/wizard/BottomNavigation";
import TopNavigation from "components/wizard/TopNavigation";
import { Colxx } from "components/common/CustomBootstrap";

const Layouts = ({ intl }) => {
  const topNavClick = (stepItem, push) => {
    push(stepItem.id);
  };

  const onClickNext = (goToNext, steps, step) => {
    step.isDone = true;
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    goToNext();
  };

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };

  const { messages } = intl;
  return (
    <Row>
      <Colxx xxs="12" xl="6" className="mb-5">
        <Card>
          <CardBody className="wizard wizard-default">
            <Wizard>
              <TopNavigation
                className="justify-content-between"
                disableNav={false}
                topNavClick={topNavClick}
              />
              <Steps>
                <Step id="step1" name="Step 1" desc="First step description">
                  <div className="wizard-basic-step text-center">
                    <p>Step content for first step.</p>
                  </div>
                </Step>
                <Step id="step2" name="Step 2" desc="Second step description">
                  <div className="wizard-basic-step text-center">
                    <p>Step content for second step.</p>
                  </div>
                </Step>
                <Step
                  id="step3"
                  name="Step 3"
                  desc="Third step description"
                  hideTopNav
                >
                  <div className="wizard-basic-step text-center">
                    <h2 className="mb-2">Thank You!</h2>
                    <p>Last step content!</p>
                  </div>
                </Step>
              </Steps>
              <BottomNavigation
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
                className="justify-content-between"
                prevLabel="Back"
                nextLabel="Next"
              />
            </Wizard>
          </CardBody>
        </Card>
      </Colxx>
      <Colxx xxs="12" xl="6">
        <Card>
          <CardBody className="wizard wizard-default">
            <Wizard>
              <TopNavigation
                className="justify-content-start"
                disableNav={false}
                topNavClick={topNavClick}
              />
              <Steps>
                <Step id="step1" name="Step 1" desc="First step description">
                  <div className="wizard-basic-step">
                    <p>Step content for first step.</p>
                  </div>
                </Step>
                <Step id="step2" name="Step 2" desc="Second step description">
                  <div className="wizard-basic-step">
                    <p>Step content for second step.</p>
                  </div>
                </Step>
                <Step
                  id="step3"
                  name="Step 3"
                  desc="Third step description"
                  hideTopNav
                >
                  <div className="wizard-basic-step">
                    <h2 className="mb-2">Thank You!</h2>
                    <p>Last step content!</p>
                  </div>
                </Step>
              </Steps>
              <BottomNavigation
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
                className="justify-content-start"
                prevLabel="Back"
                nextLabel="Next"
              />
            </Wizard>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};
export default Layouts;
