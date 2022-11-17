import React, { useState } from "react";
import {
  Row,
  Card,
  CardBody,
  Input,
  CardTitle,
  FormGroup,
  Label,
  CustomInput,
  Button,
  FormText,
  Form,
} from "reactstrap";

import DatePicker from "react-datepicker";
import TagsInput from "react-tagsinput";

import "react-tagsinput/react-tagsinput.css";
import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";

import Select from "react-select";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";

import IntlMessages from "helpers/IntlMessages";
import CustomSelectInput from "components/common/CustomSelectInput";

const selectData = [
  { label: "Cake", value: "cake", key: 0 },
  { label: "Cupcake", value: "cupcake", key: 1 },
  { label: "Dessert", value: "dessert", key: 2 },
];

const FormLayoutsUi = ({ match, intl }) => {
  const [selectedOptionLO, setSelectedOptionLO] = useState("");
  const [selectedOptionLT, setSelectedOptionLT] = useState("");
  const [startDateLO, setStartDateLO] = useState(null);
  const [startDateLT, setStartDateLT] = useState(null);
  const [tagsLO, setTagsLO] = useState([]);
  const [tagsLT, setTagsLT] = useState([]);

  const { messages } = intl;

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.form-layouts" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>Basic</CardTitle>
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">E-mail</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="E-mail"
                  />
                  <FormText color="muted">
                    We'll never share your email with anyone else.
                  </FormText>
                </FormGroup>

                <FormGroup>
                  <Label for="passwordBasic">Password</Label>
                  <Input
                    type="password"
                    name="passwordBasic"
                    id="passwordBasic"
                    placeholder="Password"
                  />
                </FormGroup>

                <FormGroup>
                  <CustomInput
                    type="checkbox"
                    id="exampleCustomCheckbox"
                    label="Check this custom checkbox"
                  />
                </FormGroup>

                <Button color="primary" className="mt-4">
                  Submit
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>Horizontal</CardTitle>
              <Form>
                <FormGroup row>
                  <Label for="emailHorizontal" sm={2}>
                    E-mail
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="email"
                      name="email"
                      id="emailHorizontal"
                      placeholder="E-mail"
                    />
                  </Colxx>
                </FormGroup>

                <FormGroup row>
                  <Label for="passwordHorizontal" sm={2}>
                    Password
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="password"
                      name="password"
                      id="passwordHorizontal"
                      placeholder="Password"
                    />
                  </Colxx>
                </FormGroup>

                <FormGroup row>
                  <Label sm={2} className="pt-0">
                    Radios
                  </Label>
                  <Colxx sm={10}>
                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="radio1" />
                        First radio
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="radio1" />
                        Second radio
                      </Label>
                    </FormGroup>
                    <FormGroup check disabled>
                      <Label check>
                        <Input type="radio" name="radio1" disabled />
                        Third disabled radio
                      </Label>
                    </FormGroup>
                  </Colxx>
                </FormGroup>

                <FormGroup row>
                  <Label sm={2} className="pt-0">
                    Checkbox
                  </Label>
                  <Colxx sm={10}>
                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" name="check1" /> Example Checkbox
                      </Label>
                    </FormGroup>
                  </Colxx>
                </FormGroup>

                <Button color="primary">Sign in</Button>
              </Form>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>Top Labels Over Line</CardTitle>

              <Form>
                <Label className="form-group has-float-label">
                  <Input type="email" />
                  <span>E-mail</span>
                </Label>
                <Label className="form-group has-float-label">
                  <Input type="password" />
                  <span>Password</span>
                </Label>
                <div className="form-group has-float-label">
                  <TagsInput
                    value={tagsLO}
                    onChange={(val) => setTagsLO(val)}
                    inputProps={{ placeholder: "" }}
                  />
                  <span>Tags</span>
                </div>
                <div className="form-group has-float-label">
                  <DatePicker
                    selected={startDateLO}
                    onChange={(val) => setStartDateLO(val)}
                  />
                  <span>Date</span>
                </div>

                <div className="form-group has-float-label">
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    value={selectedOptionLO}
                    onChange={(val) => setSelectedOptionLO(val)}
                    options={selectData}
                    placeholder=""
                  />
                  <span>State</span>
                </div>

                <Button color="primary">Submit</Button>
              </Form>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>Top Labels In Input</CardTitle>

              <Form>
                <FormGroup className="form-group has-top-label">
                  <Label>E-MAIL</Label>
                  <Input type="email" />
                </FormGroup>

                <FormGroup className="form-group has-top-label">
                  <Label>PASSWORD</Label>

                  <Input type="password" />
                </FormGroup>

                <FormGroup className="form-group has-top-label">
                  <Label>TAGS</Label>
                  <TagsInput
                    value={tagsLT}
                    onChange={(val) => setTagsLT(val)}
                    inputProps={{ placeholder: "" }}
                  />
                </FormGroup>
                <FormGroup className="form-group has-top-label">
                  <Label>DATE</Label>
                  <DatePicker
                    shouldCloseOnSelect
                    selected={startDateLT}
                    onChange={(val) => setStartDateLT(val)}
                  />
                </FormGroup>

                <FormGroup className="form-group has-top-label">
                  <Label>STATE</Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    value={selectedOptionLT}
                    onChange={(val) => setSelectedOptionLT(val)}
                    options={selectData}
                    placeholder=""
                  />
                </FormGroup>

                <Button color="primary">Submit</Button>
              </Form>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>Form Grid</CardTitle>
              <Form>
                <FormGroup row>
                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="exampleEmailGrid">E-mail</Label>
                      <Input
                        type="email"
                        name="exampleEmailGrid"
                        id="exampleEmailGrid"
                        placeholder="E-mail"
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="examplePasswordGrid">Password</Label>
                      <Input
                        type="password"
                        name="examplePasswordGrid"
                        id="examplePasswordGrid"
                        placeholder="Password"
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={12}>
                    <FormGroup>
                      <Label for="exampleAddressGrid">Address</Label>
                      <Input
                        type="text"
                        name="exampleAddressGrid"
                        id="exampleAddressGrid"
                        placeholder="Address"
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={12}>
                    <FormGroup>
                      <Label for="exampleAddress2Grid">Address 2</Label>
                      <Input
                        type="text"
                        name="exampleAddress2Grid"
                        id="exampleAddress2Grid"
                        placeholder="Address"
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <FormGroup>
                      <Label for="exampleEmailGrid">City</Label>
                      <Input
                        type="text"
                        name="exampleTextGrid"
                        id="exampleTextGrid"
                        placeholder="City"
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={4}>
                    <FormGroup>
                      <Label>State</Label>
                      <Input type="select">
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                        <option>Option 4</option>
                        <option>Option 5</option>
                      </Input>
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={2}>
                    <FormGroup>
                      <Label for="exampleZipGrid">Zip</Label>
                      <Input
                        type="text"
                        name="exampleZipGrid"
                        id="exampleZipGrid"
                        placeholder="Zip"
                      />
                    </FormGroup>
                  </Colxx>
                </FormGroup>

                <Button color="primary">Signup</Button>
              </Form>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default FormLayoutsUi;
