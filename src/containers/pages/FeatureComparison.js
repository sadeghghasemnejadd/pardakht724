import React from "react";
import { Card, CardBody } from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import IntlMessages from "helpers/IntlMessages";

const FeatureComparison = () => {
  return (
    <>
      {/* Larger screen layout */}
      <Colxx xxs="12" className="d-none d-md-block">
        <Card className="mb-3 table-heading">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
              <p className="list-item-heading mb-0 truncate w-40 w-xs-100" />
              <p className="mb-0 text-primary w-20 w-xs-100 text-center">
                DEVELOPER
              </p>
              <p className="mb-0 text-primary w-20 w-xs-100 text-center">
                TEAM
              </p>
              <p className="mb-0 text-primary w-20 w-xs-100 text-center">
                ENTERPRISE
              </p>
            </CardBody>
          </div>
        </Card>

        <Card className="flex flex-row mb-3">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
              <p className="list-item-heading mb-0 truncate w-40 w-xs-100">
                Two factor authentication
              </p>
              <p className="mb-0 text-primary w-20 w-xs-100 text-center">
                <i className="simple-icon-check" />
              </p>
              <p className="mb-0 text-primary w-20 w-xs-100 text-center">
                <i className="simple-icon-check" />
              </p>
              <p className="mb-0 text-primary w-20 w-xs-100 text-center">
                <i className="simple-icon-check" />
              </p>
            </CardBody>
          </div>
        </Card>
        <Card className="flex flex-row mb-3">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
              <p className="list-item-heading mb-0 truncate w-40 w-xs-100">
                Team permissions
              </p>
              <p className="mb-0 text-primary w-20 w-xs-100 text-center" />
              <p className="mb-0 text-primary w-20 w-xs-100 text-center">
                <i className="simple-icon-check" />
              </p>
              <p className="mb-0 text-primary w-20 w-xs-100 text-center">
                <i className="simple-icon-check" />
              </p>
            </CardBody>
          </div>
        </Card>
        <Card className="flex flex-row mb-3">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
              <p className="list-item-heading mb-0 truncate w-40 w-xs-100">
                24/5 Support
              </p>
              <p className="mb-0 text-primary w-20 w-xs-100 text-center" />
              <p className="mb-0 text-primary w-20 w-xs-100 text-center">
                <i className="simple-icon-check" />
              </p>
              <p className="mb-0 text-primary w-20 w-xs-100 text-center" />
            </CardBody>
          </div>
        </Card>
        <Card className="flex flex-row mb-3">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
              <p className="list-item-heading mb-0 truncate w-40 w-xs-100">
                24/7 Support
              </p>
              <p className="mb-0 text-primary w-20 w-xs-100 text-center" />
              <p className="mb-0 text-primary w-20 w-xs-100 text-center" />
              <p className="mb-0 text-primary w-20 w-xs-100 text-center">
                <i className="simple-icon-check" />
              </p>
            </CardBody>
          </div>
        </Card>
        <Card className="flex flex-row mb-3">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
              <p className="list-item-heading mb-0 truncate w-40 w-xs-100">
                User actions audit log
              </p>
              <p className="mb-0 text-primary w-20 w-xs-100 text-center" />
              <p className="mb-0 text-primary w-20 w-xs-100 text-center" />
              <p className="mb-0 text-primary w-20 w-xs-100 text-center">
                <i className="simple-icon-check" />
              </p>
            </CardBody>
          </div>
        </Card>
      </Colxx>

      {/* Smaller screen layout */}
      <Colxx xxs="12" className="d-block d-md-none">
        <Card className="d-flex flex-row mb-3 table-heading">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="pl-0 pb-0">
              <p className="list-item-heading mb-0 text-primary">
                Two factor authentication
              </p>
            </CardBody>
          </div>
        </Card>
        <Card className="d-flex flex-row mb-3">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="align-self-center d-flex flex-row">
              <p className="list-item-heading mb-0 truncate w-70">DEVELOPER</p>
              <p className="text-primary text-right mb-0 w-30 text-one">
                <i className="simple-icon-check" />
              </p>
            </CardBody>
          </div>
        </Card>
        <Card className="d-flex flex-row mb-3">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="align-self-center d-flex flex-row">
              <p className="list-item-heading mb-0 truncate w-70">TEAM</p>
              <p className="text-primary text-right mb-0 w-30 text-one">
                <i className="simple-icon-check" />
              </p>
            </CardBody>
          </div>
        </Card>
        <Card className="d-flex flex-row mb-3">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="align-self-center d-flex flex-row">
              <p className="list-item-heading mb-0 truncate w-70">ENTERPRISE</p>
              <p className="text-primary text-right mb-0 w-30 text-one">
                <i className="simple-icon-check" />
              </p>
            </CardBody>
          </div>
        </Card>

        <Card className="d-flex flex-row mb-3 table-heading">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="pl-0 pb-0">
              <p className="list-item-heading mb-0 text-primary">
                Team permissions
              </p>
            </CardBody>
          </div>
        </Card>
        <Card className="d-flex flex-row mb-3">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="align-self-center d-flex flex-row">
              <p className="list-item-heading mb-0 truncate w-70">DEVELOPER</p>
              <p className="text-primary text-right mb-0 w-30 text-one" />
            </CardBody>
          </div>
        </Card>

        <Card className="d-flex flex-row mb-3">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="align-self-center d-flex flex-row">
              <p className="list-item-heading mb-0 truncate w-70">TEAM</p>
              <p className="text-primary text-right mb-0 w-30 text-one">
                <i className="simple-icon-check" />
              </p>
            </CardBody>
          </div>
        </Card>

        <Card className="d-flex flex-row mb-3">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="align-self-center d-flex flex-row">
              <p className="list-item-heading mb-0 truncate w-70">ENTERPRISE</p>
              <p className="text-primary text-right mb-0 w-30 text-one">
                <i className="simple-icon-check" />
              </p>
            </CardBody>
          </div>
        </Card>

        <Card className="d-flex flex-row mb-3 table-heading">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="pl-0 pb-0">
              <p className="list-item-heading mb-0 text-primary">
                24/5 Support
              </p>
            </CardBody>
          </div>
        </Card>
        <Card className="d-flex flex-row mb-3">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="align-self-center d-flex flex-row">
              <p className="list-item-heading mb-0 truncate w-70">DEVELOPER</p>
              <p className="text-primary text-right mb-0 w-30 text-one" />
            </CardBody>
          </div>
        </Card>
        <Card className="d-flex flex-row mb-3">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="align-self-center d-flex flex-row">
              <p className="list-item-heading mb-0 truncate w-70">TEAM</p>
              <p className="text-primary text-right mb-0 w-30 text-one">
                <i className="simple-icon-check" />
              </p>
            </CardBody>
          </div>
        </Card>
        <Card className="d-flex flex-row mb-3">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="align-self-center d-flex flex-row">
              <p className="list-item-heading mb-0 truncate w-70">ENTERPRISE</p>
              <p className="text-primary text-right mb-0 w-30 text-one" />
            </CardBody>
          </div>
        </Card>

        <Card className="d-flex flex-row mb-3 table-heading">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="pl-0 pb-0">
              <p className="list-item-heading mb-0 text-primary">
                24/7 Support
              </p>
            </CardBody>
          </div>
        </Card>
        <Card className="d-flex flex-row mb-3">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="align-self-center d-flex flex-row">
              <p className="list-item-heading mb-0 truncate w-70">DEVELOPER</p>
              <p className="text-primary text-right mb-0 w-30 text-one" />
            </CardBody>
          </div>
        </Card>
        <Card className="d-flex flex-row mb-3">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="align-self-center d-flex flex-row">
              <p className="list-item-heading mb-0 truncate w-70">TEAM</p>
              <p className="text-primary text-right mb-0 w-30 text-one" />
            </CardBody>
          </div>
        </Card>
        <Card className="d-flex flex-row mb-3">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="align-self-center d-flex flex-row">
              <p className="list-item-heading mb-0 truncate w-70">ENTERPRISE</p>
              <p className="text-primary text-right mb-0 w-30 text-one">
                <i className="simple-icon-check" />
              </p>
            </CardBody>
          </div>
        </Card>

        <Card className="d-flex flex-row mb-3 table-heading">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="pl-0 pb-0">
              <p className="list-item-heading mb-0 text-primary">
                User actions audit log
              </p>
            </CardBody>
          </div>
        </Card>
        <Card className="d-flex flex-row mb-3">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="align-self-center d-flex flex-row">
              <p className="list-item-heading mb-0 truncate w-70">DEVELOPER</p>
              <p className="text-primary text-right mb-0 w-30 text-one" />
            </CardBody>
          </div>
        </Card>
        <Card className="d-flex flex-row mb-3">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="align-self-center d-flex flex-row">
              <p className="list-item-heading mb-0 truncate w-70">TEAM</p>
              <p className="text-primary text-right mb-0 w-30 text-one" />
            </CardBody>
          </div>
        </Card>
        <Card className="d-flex flex-row mb-3">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="align-self-center d-flex flex-row">
              <p className="list-item-heading mb-0 truncate w-70">ENTERPRISE</p>
              <p className="text-primary text-right mb-0 w-30 text-one">
                <i className="simple-icon-check" />
              </p>
            </CardBody>
          </div>
        </Card>
      </Colxx>
    </>
  );
};

export default FeatureComparison;
