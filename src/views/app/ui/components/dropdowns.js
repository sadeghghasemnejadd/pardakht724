import React, { useState } from "react";
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  ButtonDropdown,
  Button,
  CardSubtitle,
  UncontrolledDropdown,
} from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import IntlMessages from "helpers/IntlMessages";

const DropDownsUi = ({ match }) => {
  const [dropdownBasicOpen, setDropdownBasicOpen] = useState(false);
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [isOpenSizingLg, setIsOpenSizingLg] = useState(false);
  const [isOpenSizingSm, setIsOpenSizingSm] = useState(false);
  const [isOpenSizingXs, setIsOpenSizingXs] = useState(false);
  const [btnDropUp, setBtnDropUp] = useState(false);
  const [btnDropLeft, setBtnDropLeft] = useState(false);
  const [btnDropRight, setBtnDropRight] = useState(false);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.dropdowns" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>Basic</CardTitle>
              <CardSubtitle>Controlled</CardSubtitle>
              <Dropdown
                isOpen={dropdownBasicOpen}
                toggle={() => setDropdownBasicOpen(!dropdownBasicOpen)}
                className="mb-5"
              >
                <DropdownToggle caret color="secondary" outline>
                  Dropdown
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <CardSubtitle>Uncontrolled</CardSubtitle>
              <UncontrolledDropdown>
                <DropdownToggle caret color="secondary" outline>
                  Dropdown
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>Split Button Dropdowns</CardTitle>
              <ButtonDropdown
                isOpen={dropdownSplitOpen}
                toggle={() => setDropdownSplitOpen(!dropdownSplitOpen)}
              >
                <Button color="secondary">Action</Button>
                <DropdownToggle caret color="secondary" />
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>Sizing</CardTitle>
              <ButtonDropdown
                className="mr-1 mb-1"
                isOpen={isOpenSizingLg}
                toggle={() => setIsOpenSizingLg(!isOpenSizingLg)}
              >
                <DropdownToggle caret size="lg" outline color="info">
                  Large Button
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>

              <ButtonDropdown
                className="mr-1 mb-1"
                isOpen={isOpenSizingSm}
                toggle={() => setIsOpenSizingSm(!isOpenSizingSm)}
              >
                <DropdownToggle caret size="sm" outline color="info">
                  Small Button
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>

              <ButtonDropdown
                className="mr-1 mb-1"
                isOpen={isOpenSizingXs}
                toggle={() => setIsOpenSizingXs(!isOpenSizingXs)}
              >
                <DropdownToggle caret size="xs" outline color="info">
                  Small Button
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>Drop Directions</CardTitle>
              <ButtonDropdown
                direction="up"
                className="mr-1 mb-5"
                isOpen={btnDropUp}
                toggle={() => setBtnDropUp(!btnDropUp)}
              >
                <DropdownToggle caret>Dropup</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>

              <ButtonDropdown
                direction="left"
                className="mr-1 mb-5"
                isOpen={btnDropLeft}
                toggle={() => setBtnDropLeft(!btnDropLeft)}
              >
                <DropdownToggle caret>Dropleft</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>

              <ButtonDropdown
                direction="right"
                className="mr-1 mb-5"
                isOpen={btnDropRight}
                toggle={() => setBtnDropRight(!btnDropRight)}
              >
                <DropdownToggle caret>Dropright</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>Drop Directions</CardTitle>
              <CardSubtitle>Left</CardSubtitle>
              <UncontrolledDropdown className="mb-5">
                <DropdownToggle caret color="secondary" outline>
                  Dropdown
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <CardSubtitle>Right</CardSubtitle>

              <UncontrolledDropdown>
                <DropdownToggle caret color="secondary" outline>
                  Dropdown
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};
export default DropDownsUi;
