import React from "react";
import { Link } from "react-router-dom";

export default function DashboardHeader({ title, list }) {
  const renderList = list.map((item, index) => (
    <li
      key={index}
      className={`breadcrumb-item ${index === list.length - 1 ? "active" : ""}`}
    >
      <Link to={item.path}>{item.text}</Link>
    </li>
  ));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1>{title}</h1>
          <nav
            className="breadcrumb-container d-none d-sm-block d-lg-inline-block"
            aria-label="breadcrumb"
          >
            <ol className="breadcrumb pt-0">{renderList}</ol>
          </nav>
          <div className="separator mb-5"></div>
        </div>
      </div>
    </div>
  );
}
