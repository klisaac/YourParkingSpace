import React from "react";
import { FormGroup, Col } from "reactstrap";
import ColorPicker from "./ColorPicker";

//
// It renders a color picker form item on read only mode.
//

const ColourDetails = (props: { text: string; field: string }) => {
  return (
    <FormGroup row className="text-detail-field">
      <Col xs="12" md="3">
        <span className="col-form-label ecp-form-label">{props.text}</span>
      </Col>
      <Col xs="6" sm="3" md="3" lg="2" xl="2">
        <span>{props.field.toLocaleUpperCase()}</span>
      </Col>
      <Col xs="6" sm="3" md="3" lg="2" xl="2">
        <ColorPicker color={props.field.toLocaleUpperCase()} disabled></ColorPicker>
      </Col>
    </FormGroup>
  );
};

export default ColourDetails;
