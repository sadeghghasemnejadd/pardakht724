import React from "react";
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  Button,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  CustomInput,
  UncontrolledDropdown,
} from "reactstrap";

import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";

const InputGroupsUi = ({ intl, match }) => {
  const { messages } = intl;

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Input Groups" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Row>
        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>Basic</CardTitle>

              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                <Input placeholder="Username" />
              </InputGroup>

              <InputGroup className="mb-3">
                <Input placeholder="Username" />
                <InputGroupAddon addonType="append">
                  @example.com
                </InputGroupAddon>
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  https://example.com/users/
                </InputGroupAddon>
                <Input />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                <Input type="number" step="1" />
                <InputGroupAddon addonType="append">.00</InputGroupAddon>
              </InputGroup>

              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  With textarea
                </InputGroupAddon>
                <Input type="textarea" name="text" />
              </InputGroup>
            </CardBody>
          </Card>

          <Card className="mb-4">
            <CardBody>
              <CardTitle>Sizing</CardTitle>

              <InputGroup size="sm" className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <span className="input-group-text">Small</span>
                </InputGroupAddon>
                <Input />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <span className="input-group-text">Default</span>
                </InputGroupAddon>
                <Input />
              </InputGroup>

              <InputGroup size="lg">
                <InputGroupAddon addonType="prepend">
                  <span className="input-group-text">Large</span>
                </InputGroupAddon>
                <Input />
              </InputGroup>
            </CardBody>
          </Card>

          <Card className="mb-4">
            <CardBody>
              <CardTitle>Checkboxes and radios</CardTitle>

              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Input
                      addon
                      type="checkbox"
                      aria-label="Checkbox for following text input"
                    />
                  </InputGroupText>
                </InputGroupAddon>
                <Input />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Input
                      addon
                      type="radio"
                      aria-label="Radio for following text input"
                    />
                  </InputGroupText>
                </InputGroupAddon>
                <Input />
              </InputGroup>
            </CardBody>
          </Card>

          <Card className="mb-4">
            <CardBody>
              <CardTitle>Multiple Inputs</CardTitle>

              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <span className="input-group-text">First and last name</span>
                </InputGroupAddon>
                <Input />
                <Input />
              </InputGroup>
            </CardBody>
          </Card>

          <Card className="mb-4">
            <CardBody>
              <CardTitle>Multiple Addons</CardTitle>

              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>$</InputGroupText>
                  <InputGroupText>0.00</InputGroupText>
                </InputGroupAddon>
                <Input />
              </InputGroup>

              <InputGroup>
                <Input />
                <InputGroupAddon addonType="append">
                  <InputGroupText>$</InputGroupText>
                  <InputGroupText>0.00</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </CardBody>
          </Card>

          <Card className="mb-4">
            <CardBody>
              <CardTitle>Button Addons</CardTitle>

              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <Button outline color="secondary">
                    Button
                  </Button>
                </InputGroupAddon>
                <Input />
              </InputGroup>

              <InputGroup className="mb-3">
                <Input />
                <InputGroupAddon addonType="append">
                  <Button outline color="secondary">
                    Button
                  </Button>
                </InputGroupAddon>
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <Button outline color="secondary">
                    Button
                  </Button>
                  <Button outline color="secondary">
                    Button
                  </Button>
                </InputGroupAddon>
                <Input />
              </InputGroup>

              <InputGroup>
                <Input />
                <InputGroupAddon addonType="append">
                  <Button outline color="secondary">
                    Button
                  </Button>
                  <Button outline color="secondary">
                    Button
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </CardBody>
          </Card>

          <Card className="mb-4">
            <CardBody>
              <CardTitle>Buttons with Dropdowns</CardTitle>
              <InputGroup className="mb-3">
                <UncontrolledDropdown addonType="prepend">
                  <DropdownToggle caret outline color="secondary">
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
                <Input />
              </InputGroup>

              <InputGroup className="mb-3">
                <Input />
                <UncontrolledDropdown addonType="append">
                  <DropdownToggle caret outline color="secondary">
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
              </InputGroup>
            </CardBody>
          </Card>

          <Card className="mb-4">
            <CardBody>
              <CardTitle>Custom File Input</CardTitle>

              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">Upload</InputGroupAddon>
                <CustomInput
                  type="file"
                  id="exampleCustomFileBrowser1"
                  name="customFile"
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <CustomInput
                  type="file"
                  id="exampleCustomFileBrowser2"
                  name="customFile"
                />
                <InputGroupAddon addonType="append">Upload</InputGroupAddon>
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <Button outline color="secondary">
                    Button
                  </Button>
                </InputGroupAddon>
                <CustomInput
                  type="file"
                  id="exampleCustomFileBrowser3"
                  name="customFile"
                />
              </InputGroup>

              <InputGroup>
                <CustomInput
                  type="file"
                  id="exampleCustomFileBrowser4"
                  name="customFile"
                />
                <InputGroupAddon addonType="append">
                  <Button outline color="secondary">
                    Button
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};
export default InputGroupsUi;
