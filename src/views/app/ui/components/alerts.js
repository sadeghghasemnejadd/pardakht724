import React, { useState } from "react";
import {
  Alert,
  UncontrolledAlert,
  Row,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import NotificationExamples from "containers/ui/NotificationExamples";

const AlertsUi = ({ match }) => {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Alerts" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <NotificationExamples />
        </Colxx>

        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>Rounded Alert</CardTitle>
              <Alert color="primary" className="rounded">
                This is a primary alert—check it out!
              </Alert>
              <Alert color="secondary" className="rounded">
                This is a secondary alert—check it out!
              </Alert>
              <Alert color="success" className="rounded">
                This is a success alert—check it out!
              </Alert>
              <Alert color="danger" className="rounded">
                This is a danger alert—check it out!
              </Alert>
              <Alert color="warning" className="rounded">
                This is a warning alert—check it out!
              </Alert>
              <Alert color="info" className="rounded">
                This is a info alert—check it out!
              </Alert>
              <Alert color="light" className="rounded">
                This is a light alert—check it out!
              </Alert>
              <Alert color="dark" className="rounded">
                This is a dark alert—check it out!
              </Alert>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>Default Alert</CardTitle>
              <Alert color="primary">
                This is a primary alert—check it out!
              </Alert>
              <Alert color="secondary">
                This is a secondary alert—check it out!
              </Alert>
              <Alert color="success">
                This is a success alert—check it out!
              </Alert>
              <Alert color="danger">This is a danger alert—check it out!</Alert>
              <Alert color="warning">
                This is a warning alert—check it out!
              </Alert>
              <Alert color="info">This is a info alert—check it out!</Alert>
              <Alert color="light">This is a light alert—check it out!</Alert>
              <Alert color="dark">This is a dark alert—check it out!</Alert>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>Dismissing Alert</CardTitle>
              <Alert
                color="warning"
                className="rounded"
                isOpen={visible}
                toggle={() => setVisible(!visible)}
              >
                Holy guacamole! You should check in on some of those fields
                below.
              </Alert>
              <UncontrolledAlert color="warning" fade={false}>
                I am an alert and I can be dismissed without animating!
              </UncontrolledAlert>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};
export default AlertsUi;
