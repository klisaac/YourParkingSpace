import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, BreadcrumbItem } from "reactstrap";
import { IBreadcrumbItem } from "../models/IBreadcrumbItem";

const Header = (props: { title?: string; path?: IBreadcrumbItem[]; name: string }) => {
  return (
    <Row>
      <Col lg="6" sm="12">
        {props.title && props.title === "Live Exemptions" ? (
          <h3>
            {props.title} <span style={{ fontSize: "x-small" }}>(active exemptions for the last 28 days)</span>
          </h3>
        ) : props.title && props.title === "Vehicle Search" ? (
          <h3>
            {props.title} <span style={{ fontSize: "x-small" }}>(visits for the last 28 days)</span>
          </h3>
        ) : (
          <h3>{props.title}</h3>
        )}
      </Col>
      <Col lg="6" sm="12">
        <ol className="breadcrumb float-lg-right" style={{ paddingLeft: "0px" }}>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          {props.path &&
            props.path.map((item) => {
              return (
                <BreadcrumbItem key={item.text}>
                  {item.link !== "" ? <Link to={item.link}>{item.text}</Link> : <span className="breadcrumb-item active">{item.text}</span>}
                </BreadcrumbItem>
              );
            })}
          <BreadcrumbItem tag="span" active>
            {props.name}
          </BreadcrumbItem>
        </ol>
      </Col>
    </Row>
  );
};

export default Header;
