import React from "react";

const spriteBadge = (url: string) => {
  return (
    <img
      src={url}
      alt={url}
      title=""
      style={{ width: 50, height: 50, marginRight: "5px" }}
    />
  );
};

export default spriteBadge;
