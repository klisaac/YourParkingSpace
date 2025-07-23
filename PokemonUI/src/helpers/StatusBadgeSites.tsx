import React from "react";
import { Badge } from "reactstrap";

const statusBadgeSites = (status: string) => {
  let color = "";

  switch (status) {
    case "Active": {
      color = "success";
      break;
    }
    case "Closed": {
      color = "danger";
      break;
    }
    case "Miscellaneous": {
      color = "primary";
      break;
    }
    case "Pre-site": {
      color = "warning";
      break;
    }
    case "Under Review": {
      color = "warning";
      break;
    }
    case "Inactive": {
      color = "danger";
      break;
    }
    default: {
      return status;
    }
  }

  return (
    <Badge className="mr-1" color={color}>
      {status}
    </Badge>
  );
};

export default statusBadgeSites;
