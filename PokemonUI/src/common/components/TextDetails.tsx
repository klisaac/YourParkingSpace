import React, { Fragment } from "react";
import { FormGroup, Col } from "reactstrap";
import Tooltip from "./Tooltip";

//
// It renders a text form item on read only mode.
//

const TextDetails = (props: {
  text: string;
  field: string;
  labelSizeSm?: number;
  labelSizeMd?: number;
  labelSizeLg?: number;
  labelSizeXl?: number;
  tooltipText?: string;
  class?: string;
}) => {
  return (
    <FormGroup row className={props.class === undefined ? "text-detail-field" : props.class}>
      <Col
        xs="12"
        sm={props.labelSizeSm !== undefined ? props.labelSizeSm : "4"}
        md={props.labelSizeMd !== undefined ? props.labelSizeMd : "4"}
        lg={props.labelSizeLg !== undefined ? props.labelSizeLg : "3"}
        xl={props.labelSizeXl !== undefined ? props.labelSizeXl : "3"}
      >
        <span className="col-form-label ecp-form-label">
          {props.text}
          {props.tooltipText !== undefined && (
            <Fragment>
              {" "}
              {/* As the id must be unique, it is created removing the spaces of the messages and getting the first 15 characters */}
              <Tooltip text={props.tooltipText} id={props.tooltipText.replace(/\s/g, "").substring(1, 15)}></Tooltip>
            </Fragment>
          )}
        </span>
      </Col>
      <Col
        xs="12"
        sm={props.labelSizeSm !== undefined ? 12 - props.labelSizeSm : "8"}
        md={props.labelSizeMd !== undefined ? 12 - props.labelSizeMd : "8"}
        lg={props.labelSizeLg !== undefined ? 12 - props.labelSizeLg : "9"}
        xl={props.labelSizeXl !== undefined ? 12 - props.labelSizeXl : "9"}
      >
        <span>{props.field}</span>
      </Col>
    </FormGroup>
  );
};

export default TextDetails;
