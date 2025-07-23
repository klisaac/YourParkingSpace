import React from "react";
import { Button } from "reactstrap";
import * as helpers from "./../helpers/SecurityHelper";

const PermissionButton = (props: {
  permission: any;
  className?: string;
  color: string;
  text: string;
  disabled?: boolean;
  onClick: () => void;
  overridePermission?: boolean;
}) => {
  if (props.overridePermission) {
    return (
      <Button className={props.className} color={props.color} disabled={props.disabled} onClick={() => props.onClick()}>
        {props.text}
      </Button>
    );
  } else {
    return helpers.hasPermission(props.permission) ? (
      <Button className={props.className} color={props.color} disabled={props.disabled} onClick={() => props.onClick()}>
        {props.text}
      </Button>
    ) : null;
  }
};

export default PermissionButton;
