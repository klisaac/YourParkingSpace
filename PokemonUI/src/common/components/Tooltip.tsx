import React, { Fragment } from "react";
import { UncontrolledTooltip } from "reactstrap";

const Tooltip = (props: { text: string; id: string; hideIcon?: boolean }) => {
  return (
    <Fragment>
      {!props.hideIcon && (
        <span className="badge bg-info" id={props.id}>
          <i className="icon fa fa-info"></i>
        </span>
      )}
      <UncontrolledTooltip placement="right" target={props.id}>
        <span
          style={{
            textAlign: "left",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          {props.text}
        </span>
      </UncontrolledTooltip>
    </Fragment>
  );
};

export default Tooltip;
