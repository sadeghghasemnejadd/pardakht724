import React from "react";
import { Row, Card, CardBody, Jumbotron, Button } from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";

const JumbotronUi = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Jumbotron" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              <Jumbotron>
                <h1 className="display-4">Hello, world!</h1>
                <p className="lead">
                  This is a simple hero unit, a simple jumbotron-style component
                  for calling extra attention to featured content or
                  information.
                </p>
                <hr className="my-4" />
                <p>
                  It uses utility classes for typography and spacing to space
                  content out within the larger container.
                </p>
                <p className="lead mb-0">
                  <Button color="primary" size="lg">
                    Learn more
                  </Button>
                </p>
              </Jumbotron>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};
export default JumbotronUi;
