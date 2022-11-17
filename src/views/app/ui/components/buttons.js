import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
  Row,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";

import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import StateButtonExample from "containers/ui/StateButtonExample";

const ButtonsUi = ({ match }) => {
  const [nestingDropdownOpen, setNestingDropdownOpen] = useState(false);
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState(0);

  const checkButtonCheck = (i) => {
    const checkedItems = [...checkedCheckboxes];
    const index = checkedItems.indexOf(i);
    if (index === -1) {
      checkedItems.push(i);
    } else {
      checkedItems.splice(index, 1);
    }
    setCheckedCheckboxes(checkedItems);
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Buttons" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>Rounded</CardTitle>
              <Button color="primary" className="mb-2">
                Primary
              </Button>{" "}
              <Button color="secondary" className="mb-2">
                Secondary
              </Button>{" "}
              <Button color="success" className="mb-2">
                Success
              </Button>{" "}
              <Button color="info" className="mb-2">
                Info
              </Button>{" "}
              <Button color="warning" className="mb-2">
                Warning
              </Button>{" "}
              <Button color="danger" className="mb-2">
                Danger
              </Button>{" "}
              <Button color="light" className="mb-2">
                Light
              </Button>{" "}
              <Button color="dark" className="mb-2">
                Dark
              </Button>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>Outline</CardTitle>
              <Button outline color="primary" className="mb-2">
                Primary
              </Button>{" "}
              <Button outline color="secondary" className="mb-2">
                Secondary
              </Button>{" "}
              <Button outline color="success" className="mb-2">
                Success
              </Button>{" "}
              <Button outline color="info" className="mb-2">
                Info
              </Button>{" "}
              <Button outline color="warning" className="mb-2">
                Warning
              </Button>{" "}
              <Button outline color="danger" className="mb-2">
                Danger
              </Button>{" "}
              <Button outline color="light" className="mb-2">
                Light
              </Button>{" "}
              <Button outline color="dark" className="mb-2">
                Dark
              </Button>
            </CardBody>
          </Card>
        </Colxx>

        <StateButtonExample />

        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>Sizes</CardTitle>
              <div className="mb-4">
                <h6 className="mb-2">Large Button</h6>
                <Button color="primary" size="lg" className="mb-2">
                  Large Button
                </Button>{" "}
                <Button color="secondary" size="lg" className="mb-2">
                  Large Button
                </Button>
              </div>
              <div className="mb-4">
                <h6 className="mb-2">Small Button</h6>
                <Button color="primary" size="sm" className="mb-2">
                  Small Button
                </Button>{" "}
                <Button color="secondary" size="sm" className="mb-2">
                  Small Button
                </Button>
              </div>
              <div className="mb-4">
                <h6 className="mb-2">Extra Small Button</h6>
                <Button color="primary" size="xs" className="mb-2">
                  Extra Small Button
                </Button>{" "}
                <Button color="secondary" size="xs" className="mb-2">
                  Extra Small Button
                </Button>
              </div>
              <div className="mb-4">
                <h6 className="mb-2">Block Button</h6>
                <Button color="primary" block className="mb-2">
                  Block Button
                </Button>{" "}
                <Button color="secondary" block className="mb-2">
                  Block Button
                </Button>
              </div>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>States</CardTitle>
              <div className="mb-4">
                <h6 className="mb-2">Active</h6>
                <Button color="primary" href="#" className="mb-2">
                  Primary Link
                </Button>{" "}
                <Button color="secondary" href="#" className="mb-2">
                  Link
                </Button>
              </div>
              <div className="mb-4">
                <h6 className="mb-2">Disabled</h6>
                <Button color="primary" disabled className="mb-2">
                  Primary Button
                </Button>{" "}
                <Button color="secondary" disabled className="mb-2">
                  Button
                </Button>
              </div>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>Button Groups</CardTitle>
              <div className="mb-4">
                <h6 className="mb-2">Basic</h6>
                <ButtonGroup className="mb-2">
                  <Button color="primary">Left</Button>
                  <Button color="primary">Middle</Button>
                  <Button color="primary">Right</Button>
                </ButtonGroup>
              </div>
              <div className="mb-4">
                <h6 className="mb-2">Toolbar</h6>
                <ButtonToolbar>
                  <ButtonGroup className="mb-2 mr-1">
                    <Button color="primary">1</Button>
                    <Button color="primary">2</Button>
                    <Button color="primary">3</Button>
                    <Button color="primary">4</Button>
                  </ButtonGroup>
                  <ButtonGroup className="mb-2 mr-1">
                    <Button color="primary">5</Button>
                    <Button color="primary">6</Button>
                    <Button color="primary">7</Button>
                  </ButtonGroup>
                  <ButtonGroup className="mb-2">
                    <Button color="primary">8</Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </div>
              <div className="mb-4">
                <h6 className="mb-2">Sizes</h6>
                <ButtonGroup size="lg" className="mb-2 mr-1">
                  <Button color="primary">1</Button>
                  <Button color="primary">2</Button>
                </ButtonGroup>
                <ButtonGroup className="mb-2 mr-1">
                  <Button color="primary">1</Button>
                  <Button color="primary">2</Button>
                  <Button color="primary">3</Button>
                </ButtonGroup>
                <ButtonGroup size="sm" className="mb-2">
                  <Button color="primary">1</Button>
                  <Button color="primary">2</Button>
                  <Button color="primary">3</Button>
                </ButtonGroup>
              </div>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>Nesting</CardTitle>
              <ButtonGroup className="mb-2">
                <Button>1</Button>
                <Button>2</Button>
                <ButtonDropdown
                  isOpen={nestingDropdownOpen}
                  toggle={() => setNestingDropdownOpen(!nestingDropdownOpen)}
                >
                  <DropdownToggle caret>Dropdown</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Dropdown Link</DropdownItem>
                    <DropdownItem>Dropdown Link</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </ButtonGroup>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>Checkbox and Radio Button</CardTitle>
              <div className="mb-4">
                <h6 className="mb-2">Checkbox</h6>
                <ButtonGroup>
                  <Button
                    className="mb-2"
                    color="primary"
                    onClick={() => checkButtonCheck(1)}
                    active={checkedCheckboxes.includes(1)}
                  >
                    Checkbox
                  </Button>
                  <br />
                  <Button
                    color="primary"
                    className="mb-2"
                    onClick={() => checkButtonCheck(2)}
                    active={checkedCheckboxes.includes(2)}
                  >
                    Checkbox
                  </Button>
                </ButtonGroup>
              </div>
              <div className="mb-4">
                <h6 className="mb-2">Radio Button</h6>
                <ButtonGroup>
                  <Button
                    color="primary"
                    onClick={() => setSelectedRadio(1)}
                    active={selectedRadio === 1}
                  >
                    Radio
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => setSelectedRadio(2)}
                    active={selectedRadio === 2}
                  >
                    Radio
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => setSelectedRadio(3)}
                    active={selectedRadio === 3}
                  >
                    Radio
                  </Button>
                </ButtonGroup>
              </div>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>Bootstrap Default</CardTitle>
              <Button color="primary" className="default mb-2">
                Primary
              </Button>{" "}
              <Button color="secondary" className="default mb-2">
                Secondary
              </Button>{" "}
              <Button color="success" className="default mb-2">
                Success
              </Button>{" "}
              <Button color="info" className="default mb-2">
                Info
              </Button>{" "}
              <Button color="warning" className="default mb-2">
                Warning
              </Button>{" "}
              <Button color="danger" className="default mb-2">
                Danger
              </Button>{" "}
              <Button color="light" className="default mb-2">
                Light
              </Button>{" "}
              <Button color="dark" className="default mb-2">
                Dark
              </Button>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};
export default ButtonsUi;
