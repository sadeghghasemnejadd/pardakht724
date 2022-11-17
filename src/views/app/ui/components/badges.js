import React from "react";
import { Badge, Button, Row, Card, CardBody, CardTitle } from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";

const BadgesUi = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Badges" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>Sizes</CardTitle>
              <h1>
                Example Heading <Badge color="secondary">New</Badge>
              </h1>
              <h2>
                Example Heading <Badge color="secondary">New</Badge>
              </h2>
              <h3>
                Example Heading <Badge color="secondary">New</Badge>
              </h3>
              <h4>
                Example Heading <Badge color="secondary">New</Badge>
              </h4>
              <h5>
                Example Heading <Badge color="secondary">New</Badge>
              </h5>
              <h6>
                Example Heading <Badge color="secondary">New</Badge>
              </h6>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>Colors</CardTitle>
              <Badge color="primary" pill className="mb-1">
                Primary
              </Badge>{" "}
              <Badge color="secondary" pill className="mb-1">
                Secondary
              </Badge>{" "}
              <Badge color="success" pill className="mb-1">
                Success
              </Badge>{" "}
              <Badge color="danger" pill className="mb-1">
                Danger
              </Badge>{" "}
              <Badge color="warning" pill className="mb-1">
                Warning
              </Badge>{" "}
              <Badge color="info" pill className="mb-1">
                Info
              </Badge>{" "}
              <Badge color="light" pill className="mb-1">
                Light
              </Badge>{" "}
              <Badge color="dark" pill className="mb-1">
                Dark
              </Badge>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>Outline</CardTitle>
              <Badge color="outline-primary" pill className="mb-1">
                Primary
              </Badge>{" "}
              <Badge color="outline-secondary" pill className="mb-1">
                Secondary
              </Badge>{" "}
              <Badge color="outline-success" pill className="mb-1">
                Success
              </Badge>{" "}
              <Badge color="outline-danger" pill className="mb-1">
                Danger
              </Badge>{" "}
              <Badge color="outline-warning" pill className="mb-1">
                Warning
              </Badge>{" "}
              <Badge color="outline-info" pill className="mb-1">
                Info
              </Badge>{" "}
              <Badge color="outline-light" pill className="mb-1">
                Light
              </Badge>{" "}
              <Badge color="outline-dark" pill className="mb-1">
                Dark
              </Badge>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>Links</CardTitle>
              <Badge href="#" color="primary" className="mb-1">
                Primary
              </Badge>{" "}
              <Badge href="#" color="secondary" className="mb-1">
                Secondary
              </Badge>{" "}
              <Badge href="#" color="success" className="mb-1">
                Success
              </Badge>{" "}
              <Badge href="#" color="danger" className="mb-1">
                Danger
              </Badge>{" "}
              <Badge href="#" color="warning" className="mb-1">
                Warning
              </Badge>{" "}
              <Badge href="#" color="info" className="mb-1">
                Info
              </Badge>{" "}
              <Badge href="#" color="light" className="mb-1">
                Light
              </Badge>{" "}
              <Badge href="#" color="dark" className="mb-1">
                Dark
              </Badge>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>Counter Badges</CardTitle>
              <Button color="primary">
                Notifications <Badge color="light">4</Badge>
              </Button>{" "}
              <Button color="primary" outline>
                Notifications <Badge color="secondary">4</Badge>
              </Button>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>Bootstrap Default</CardTitle>
              <Badge color="primary" className="mb-1">
                Primary
              </Badge>{" "}
              <Badge color="secondary" className="mb-1">
                Secondary
              </Badge>{" "}
              <Badge color="success" className="mb-1">
                Success
              </Badge>{" "}
              <Badge color="danger" className="mb-1">
                Danger
              </Badge>{" "}
              <Badge color="warning" className="mb-1">
                Warning
              </Badge>{" "}
              <Badge color="info" className="mb-1">
                Info
              </Badge>{" "}
              <Badge color="light" className="mb-1">
                Light
              </Badge>{" "}
              <Badge color="dark" className="mb-1">
                Dark
              </Badge>{" "}
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};
export default BadgesUi;
