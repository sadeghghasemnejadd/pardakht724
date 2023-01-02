import React from "react";
import { Colxx } from "components/common/CustomBootstrap";
import Switch from "rc-switch";
import { Separator } from "components/common/CustomBootstrap";
import { NavItem, Button } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import ApplicationMenu from "components/common/ApplicationMenu";

const SurveyApplicationMenu = ({ filters, onSwitch, onFilter, data }) => {
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
          {filters.map((opt, index) => (
            <div key={opt.id}>
              <h3 className="mb-4">{opt.title}</h3>
              <ul className="list-unstyled mb-5">
                {opt.switches.map((swt) => (
                  <NavItem
                    className="d-flex justify-content-between "
                    key={swt.id}
                  >
                    <p className="text-muted pt-1">{swt.name}</p>
                    <Colxx xxs="4">
                      <Switch
                        className="custom-switch custom-switch-secondary"
                        checked={data
                          .find((d) => d.name == opt.id)
                          ?.value.some((v) => v == swt.id)}
                        onChange={(e) => onSwitch(e, swt.id, opt.id)}
                      />
                    </Colxx>
                  </NavItem>
                ))}
              </ul>

              {filters.length - 1 !== index && <Separator className="mb-5" />}
            </div>
          ))}

          <Button
            color="primary"
            size="sm"
            className="top-right-button mr-1 w-100 text-center"
            onClick={onFilter}
          >
            اعمال فیلتر
          </Button>
        </div>
      </PerfectScrollbar>
    </ApplicationMenu>
  );
};

export default SurveyApplicationMenu;
