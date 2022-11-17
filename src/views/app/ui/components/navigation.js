import React from "react";
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Pagination,
  PaginationItem,
  PaginationLink,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";

import BreadcrumbContainer from "containers/navs/Breadcrumb";

const NavigationUi = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <BreadcrumbContainer heading="Navigation" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Row>
        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>Nav Basic</CardTitle>
              <Nav>
                <NavItem>
                  <NavLink active href="#">
                    Active
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Link</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Link</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="disabled" href="#">
                    Disabled
                  </NavLink>
                </NavItem>
              </Nav>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row>
        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>Nav Horizontal Alignment</CardTitle>

              <Nav className="justify-content-center">
                <NavItem>
                  <NavLink active href="#">
                    Active
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Link</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Link</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="disabled" href="#">
                    Disabled
                  </NavLink>
                </NavItem>
              </Nav>

              <Nav className="justify-content-end">
                <NavItem>
                  <NavLink active href="#">
                    Active
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Link</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Link</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="disabled" href="#">
                    Disabled
                  </NavLink>
                </NavItem>
              </Nav>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row>
        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>Nav Vertical Alignment</CardTitle>

              <Nav className="flex-column">
                <NavItem>
                  <NavLink active href="#">
                    Active
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Link</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Link</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="disabled" href="#">
                    Disabled
                  </NavLink>
                </NavItem>
              </Nav>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row>
        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>Nav Pills</CardTitle>

              <Nav className="nav-pills">
                <NavItem>
                  <NavLink active href="#">
                    Active
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Link</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Link</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="disabled" href="#">
                    Disabled
                  </NavLink>
                </NavItem>
              </Nav>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row>
        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>Nav Fill and Justify</CardTitle>

              <Nav pills className="nav-fill">
                <NavItem>
                  <NavLink active href="#">
                    Active
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Longer nav link</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Link</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="disabled" href="#">
                    Disabled
                  </NavLink>
                </NavItem>
              </Nav>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row>
        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>Nav Pills with Dropdowns</CardTitle>

              <Nav pills>
                <NavItem>
                  <NavLink href="#" active>
                    Link
                  </NavLink>
                </NavItem>

                <UncontrolledDropdown nav>
                  <DropdownToggle className="nav-link" caret color="empty">
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

                <NavItem>
                  <NavLink href="#">Link</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Another Link</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="disabled" href="#">
                    Disabled Link
                  </NavLink>
                </NavItem>
              </Nav>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row>
        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>Pagination Basic</CardTitle>

              <Pagination aria-label="Page navigation example">
                <PaginationItem>
                  <PaginationLink className="first" href="#">
                    <i className="simple-icon-control-start" />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="prev" href="#">
                    <i className="simple-icon-arrow-left" />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem active>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="next" href="#">
                    <i className="simple-icon-arrow-right" />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="last" href="#">
                    <i className="simple-icon-control-end" />
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row>
        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>Pagination Sizing</CardTitle>
              <h6 className="mb-3">Large</h6>
              <Pagination size="lg" aria-label="Page navigation example">
                <PaginationItem>
                  <PaginationLink className="first" href="#">
                    <i className="simple-icon-control-start" />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="prev" href="#">
                    <i className="simple-icon-arrow-left" />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem active>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem disabled>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="next" href="#">
                    <i className="simple-icon-arrow-right" />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="last" href="#">
                    <i className="simple-icon-control-end" />
                  </PaginationLink>
                </PaginationItem>
              </Pagination>

              <h6 className="mb-3">Small</h6>
              <Pagination size="sm" aria-label="Page navigation example">
                <PaginationItem>
                  <PaginationLink className="first" href="#">
                    <i className="simple-icon-control-start" />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="prev" href="#">
                    <i className="simple-icon-arrow-left" />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem active>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem disabled>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="next" href="#">
                    <i className="simple-icon-arrow-right" />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="last" href="#">
                    <i className="simple-icon-control-end" />
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row>
        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>Pagination Alignment</CardTitle>
              <h6 className="mb-3">Center</h6>
              <Pagination
                size="sm"
                aria-label="Page navigation example"
                listClassName="justify-content-center"
              >
                <PaginationItem>
                  <PaginationLink className="first" href="#">
                    <i className="simple-icon-control-start" />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="prev" href="#">
                    <i className="simple-icon-arrow-left" />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem active>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="next" href="#">
                    <i className="simple-icon-arrow-right" />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="last" href="#">
                    <i className="simple-icon-control-end" />
                  </PaginationLink>
                </PaginationItem>
              </Pagination>

              <h6 className="mb-3">Right</h6>
              <Pagination
                size="sm"
                aria-label="Page navigation example"
                listClassName="justify-content-end"
              >
                <PaginationItem>
                  <PaginationLink className="first" href="#">
                    <i className="simple-icon-control-start" />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="prev" href="#">
                    <i className="simple-icon-arrow-left" />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem active>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem disabled>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="next" href="#">
                    <i className="simple-icon-arrow-right" />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="last" href="#">
                    <i className="simple-icon-control-end" />
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row>
        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>Breadcrumb Basic</CardTitle>
              <Breadcrumb>
                <BreadcrumbItem active>Home</BreadcrumbItem>
              </Breadcrumb>
              <Breadcrumb>
                <BreadcrumbItem>
                  <a href="#/">Home</a>
                </BreadcrumbItem>
                <BreadcrumbItem active>Library</BreadcrumbItem>
              </Breadcrumb>
              <Breadcrumb>
                <BreadcrumbItem>
                  <a href="#/">Home</a>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <a href="#/">Library</a>
                </BreadcrumbItem>
                <BreadcrumbItem active>Data</BreadcrumbItem>
              </Breadcrumb>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default NavigationUi;
