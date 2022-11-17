/* eslint-disable no-param-reassign */
import React, { useState } from "react";
import { Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";
import { Wizard, Steps, Step } from "react-albus";
import BottomNavigation from "components/wizard/BottomNavigation";
import TopNavigation from "components/wizard/TopNavigation";

const LastStepEnd = ({ intl }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [topNavDisabled, setTopNavDisabled] = useState(false);

  const topNavClick = (stepItem, push) => {
    if (topNavDisabled) {
      return;
    }
    push(stepItem.id);
  };

  const onClickNext = (goToNext, steps, step) => {
    step.isDone = true;
    if (steps.length - 2 <= steps.indexOf(step)) {
      setBottomNavHidden(true);
      setTopNavDisabled(true);
    }
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
    <Card>
      <CardBody className="wizard wizard-default">
        <Wizard>
          <TopNavigation
            className="justify-content-center"
            disableNav={false}
            topNavClick={topNavClick}
          />
          <Steps>
            <Step id="step1" name="Step 1" desc="First step description">
              <div className="wizard-basic-step">
                <Form>
                  <FormGroup>
                    <Label>Name</Label>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormGroup>
                </Form>
              </div>
            </Step>
            <Step id="step2" name="Step 2" desc="Second step description">
              <div className="wizard-basic-step">
                <Form>
                  <FormGroup>
                    <Label>E-mail</Label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="E-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                </Form>
              </div>
            </Step>
            <Step id="step3" name="Step 3" desc="Third step description">
              <div className="wizard-basic-step">
                <Form>
                  <FormGroup>
                    <Label>Password</Label>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                </Form>
              </div>
            </Step>
            <Step id="step4" hideTopNav>
              <div className="wizard-basic-step text-center">
                <h2 className="mb-2">Thank You!</h2>
                <p>Your registration completed successfully!</p>
              </div>
            </Step>
          </Steps>
          <BottomNavigation
            onClickNext={onClickNext}
            onClickPrev={onClickPrev}
            className={`justify-content-center ${
              bottomNavHidden && "invisible"
            }`}
            prevLabel="Back"
            nextLabel="Next"
          />
        </Wizard>
      </CardBody>
    </Card>
  );
};
export default LastStepEnd;
