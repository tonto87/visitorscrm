import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const ActionButton = ({
  tooltip = "",
  variant,
  onClick,
  text,
  placement = "top",
}) => {
  return (
    <OverlayTrigger
      className="action-overlay"
      overlay={tooltip ? <Tooltip>{tooltip}</Tooltip> : <></>}
      placement={placement}
    >
      <Button
        type="button"
        variant={variant}
        onClick={onClick}
        className="action-button"
      >
        {text}
      </Button>
    </OverlayTrigger>
  );
};

export default ActionButton;
