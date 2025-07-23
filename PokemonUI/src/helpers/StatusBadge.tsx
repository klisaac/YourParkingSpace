import React from "react";
import { Badge } from "reactstrap";

const statusBadge = (statusId: number) => {
  let status = "";
  let color = "";

  switch (statusId) {
    case 1: {
      status = "Live";
      color = "success";
      break;
    }
    case 2: {
      status = "Completed";
      color = "secondary";
      break;
    }
    case 3: {
      status = "Future";
      color = "warning";
      break;
    }
    default: {
      return "";
    }
  }

  return (
    <Badge className="mr-1" color={color}>
      {status}
    </Badge>
  );
};

export default statusBadge;
