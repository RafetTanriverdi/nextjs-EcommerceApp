import React from "react";
import { Button } from "../../../ui/button";

const IconButton = ({
  icon,
  onClick,
  className,
  style,
}: {
  icon: any;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <Button
      type="button"
      variant="ghost"
      className={className}
      onClick={onClick}
      style={style}
    >
      {icon}
    </Button>
  );
};

export default IconButton;
