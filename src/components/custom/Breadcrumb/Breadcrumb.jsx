import React from "react";
import { NavLink } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
export default function DashboardHeader({ title, list }) {
  const renderList = list.map((item, index) => (
    <BreadcrumbItem key={index} active={list.length === index + 1}>
      <NavLink to={item.path}>{item.text}</NavLink>
    </BreadcrumbItem>
  ));

  return (
    <div className="d-flex align-items-center">
      <h1 className="mr-3">{title}</h1>
      <Breadcrumb className="pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block">
        {renderList}
      </Breadcrumb>
    </div>
  );
}
