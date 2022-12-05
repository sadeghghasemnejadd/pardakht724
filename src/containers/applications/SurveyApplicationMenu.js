import React from "react";
import { Colxx } from "components/common/CustomBootstrap";
import Switch from "rc-switch";
import { Separator } from "components/common/CustomBootstrap";
import { NavItem, Button } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import ApplicationMenu from "components/common/ApplicationMenu";

const SurveyApplicationMenu = ({
  firstTitle,
  secondTitle,
  firstOptions,
  secondOptions,
  buttonText,
}) => {
  const addFilter = (column, value) => {
    getSurveyListWithFilterAction(column, value);
  };

  return (
    <ApplicationMenu>
      <PerfectScrollbar
        options={{ suppressScrollX: true, wheelPropagation: false }}
      >
        <div className="p-4">
          <div className="d-flex justify-content-between mb-5">
            <h4>فیلتر ها</h4>
            <p className="text-muted text-small" style={{ cursor: "pointer" }}>
              حذف فیلتر ها
            </p>
          </div>
          <h3 className="mb-4">{firstTitle}</h3>
          <ul className="list-unstyled mb-5">
            {firstOptions?.map((opt, index) => (
              <NavItem className="d-flex justify-content-between " key={index}>
                <p className="text-muted pt-1">{opt}</p>
                <Colxx xxs="4">
                  <Switch
                    className="custom-switch custom-switch-secondary"
                    checked={true}
                  />
                </Colxx>
              </NavItem>
            ))}
          </ul>
          <Separator className="mb-5" />
          <h3 className="mb-4">{secondTitle}</h3>
          <ul className="list-unstyled mb-5">
            {secondOptions?.map((opt, index) => (
              <NavItem className="d-flex justify-content-between " key={index}>
                <p className="text-muted pt-1">{opt}</p>
                <Colxx xxs="4">
                  <Switch
                    className="custom-switch custom-switch-secondary"
                    checked={true}
                  />
                </Colxx>
              </NavItem>
            ))}
          </ul>
          <Button
            color="primary"
            size="sm"
            className="top-right-button mr-1 w-100 text-center"
          >
            {buttonText}
          </Button>
        </div>
      </PerfectScrollbar>
    </ApplicationMenu>
  );
};

export default SurveyApplicationMenu;
