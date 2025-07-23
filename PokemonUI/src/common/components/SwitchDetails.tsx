import React from "react";
import { FormGroup, Col } from "reactstrap";

//
// It renders a switch form item on read only mode.
//

const SwitchDetails = (props: { text: string; field: boolean; labelSize: number }) => {
  return (
    <FormGroup row className="text-detail-field">
      <Col xs="12" md={props.labelSize}>
        <span className="col-form-label ecp-form-label">{props.text}</span>
      </Col>
      <Col xs="12" md={12 - props.labelSize}>
        <span className="switch switch-pill switch-primary">
          <input type="checkbox" className="switch-input" checked={props.field} disabled />
          <span className="switch-slider switch-slider-custom"></span>
        </span>
      </Col>
    </FormGroup>
  );
};

export default SwitchDetails;
