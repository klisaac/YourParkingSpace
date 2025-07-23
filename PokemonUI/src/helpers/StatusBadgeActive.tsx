import React from "react";
import { Badge } from "reactstrap";

const statusBadgeActive = (active: boolean) => {
  let color = "";
  let status = "";
  switch (active) {
    case true: {
      status = "Active";
      color = "success";
      break;
    }
    default: {
      status = "Inactive";
      color = "danger"
    }
  }

  return (
    <Badge className="mr-1" color={color}>
      {status}
    </Badge>
  );
};

export default statusBadgeActive;
