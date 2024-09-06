import React from "react";
import { Button } from "../../../ui/button";

const LinkButton = ({
  text,
  onClick,
  className,
  style,
}: {
  text: string;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <Button
      onClick={onClick}
      variant="link"
      className={className}
      style={style}
    >
      {text}
    </Button>
  );
};

export default LinkButton;
