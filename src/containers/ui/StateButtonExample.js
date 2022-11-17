/* eslint-disable no-unused-vars */
/* eslint-disable prefer-promise-reject-errors */
import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

import { Colxx } from "components/common/CustomBootstrap";

import StateButton from "components/StateButton";

const StateButtonExample = () => {
  const handleSuccessButtonClick = () => {
    return new Promise((success, fail) => {
      setTimeout(() => {
        success("Everything went right!");
      }, 2000);
    });
  };

  const handleFailButtonClick = () => {
    return new Promise((success, fail) => {
      setTimeout(() => {
        fail("Something is wrong!");
      }, 2000);
    });
  };

  return (
    <Colxx xxs="12" className="mb-4">
      <Card>
        <CardBody>
          <CardTitle>States</CardTitle>
          <p className="mb-1">
            This button shows a spinner for 2 seconds and an error icon for 3
            seconds before switching to normal state. This states can be
            triggered by adding and removing classes.
          </p>
          <StateButton
            id="successButton"
            color="primary"
            className="mb-3"
            onClick={handleSuccessButtonClick}
          >
            Click Here
          </StateButton>
          <p className="mb-1">
            This button shows a spinner for 2 seconds and an error icon for 3
            seconds before switching to normal state. This states can be
            triggered by adding and removing classes.
          </p>
          <StateButton
            id="failButton"
            color="secondary"
            className="mb-3"
            onClick={handleFailButtonClick}
          >
            Click Here
          </StateButton>
        </CardBody>
      </Card>
    </Colxx>
  );
};
export default StateButtonExample;
