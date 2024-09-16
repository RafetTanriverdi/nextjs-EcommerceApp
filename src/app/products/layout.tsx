import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full md:w-4/5 md:mx-auto">{children}</div>;
};

export default layout;
