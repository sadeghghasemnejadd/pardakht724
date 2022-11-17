import React from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { NavLink } from "react-router-dom";
import { adminRoot } from "constants/defaultValues";

const TopnavEasyAccess = () => {
  return (
    <div className="position-relative d-none d-sm-inline-block">
      <UncontrolledDropdown className="dropdown-menu-right">
        <DropdownToggle className="header-icon" color="empty">
          <i className="simple-icon-grid" />
        </DropdownToggle>
        <DropdownMenu
          className="position-absolute mt-3"
          right
          id="iconMenuDropdown"
        >
          <NavLink
            to={`${adminRoot}/dashboards/default`}
            className="icon-menu-item"
          >
            <i className="iconsminds-shop-4 d-block" /> "Dashboards"
          </NavLink>

          <NavLink to={`${adminRoot}/ui`} className="icon-menu-item">
            <i className="iconsminds-pantone d-block" /> UI
          </NavLink>
          <NavLink to={`${adminRoot}/ui/charts`} className="icon-menu-item">
            <i className="iconsminds-bar-chart-4 d-block" /> Charts
          </NavLink>
          <NavLink
            to={`${adminRoot}/applications/chat`}
            className="icon-menu-item"
          >
            <i className="iconsminds-speach-bubble d-block" /> Chat
          </NavLink>
          <NavLink
            to={`${adminRoot}/applications/survey`}
            className="icon-menu-item"
          >
            <i className="iconsminds-formula d-block" /> Survey
          </NavLink>
          <NavLink
            to={`${adminRoot}/applications/todo`}
            className="icon-menu-item"
          >
            <i className="iconsminds-check d-block" /> To-do List
          </NavLink>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default TopnavEasyAccess;
