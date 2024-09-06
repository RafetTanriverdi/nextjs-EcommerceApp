import React from "react";
import { SideBar } from "./(page-component)/RTSidebar/SideBar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid  w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      
      <div className="hidden md:grid">

      <SideBar />
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  );
};

export default layout;
