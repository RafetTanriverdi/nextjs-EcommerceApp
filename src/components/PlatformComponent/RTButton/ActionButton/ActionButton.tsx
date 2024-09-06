import React from "react";
import { Button } from "../../../ui/button";
import { RotateCw } from "lucide-react";

const ActionButton = ({
  text,
  onClick,
  className,
  style,
  loading,
  type,
  size = "default",
}: {
  text: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "lg" | "default";
}) => {
  return (
    <Button
      size={size}
      type={type ? type : "button"}
      onClick={onClick}
      variant="default"
      className={className}
      style={style}
    >
      {loading && <RotateCw className="animate-spin mr-2 w-5 h-5" />}

      {text}
    </Button>
  );
};

export default ActionButton;
