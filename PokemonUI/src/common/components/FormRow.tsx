import React from "react";
import { FormGroup, Col, Label, Input, FormFeedback } from "reactstrap";

//
// It renders a FormGroup row.
//

const FormRow = (props: {
  label: string;
  value: any;
  touched: any;
  errors: any;
  handleChange: (eventOrPath: string | React.ChangeEvent<any>) => void | ((eventOrTextValue: string | React.ChangeEvent<any>) => void);
}) => {
  return (
    <FormGroup row>
      <Col md="2">
        <Label htmlFor={props.value} className="col-form-label ecp-form-label">
          {props.label}
        </Label>
      </Col>
      <Col xs="12" md="10">
        <Input
          type="text"
          name="value"
          onChange={props.handleChange}
          value={props.value}
          className={!props.touched ? "null" : props.errors ? "is-invalid" : "is-valid"}
        />
        <FormFeedback>{props.errors ? props.errors : null}</FormFeedback>
      </Col>
    </FormGroup>
  );
};

export default FormRow;
