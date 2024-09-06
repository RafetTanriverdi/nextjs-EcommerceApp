"use client";
import { redirect } from "next/navigation";
import { SideBar } from "./(page-component)/RTSidebar/SideBar";

const Profile = () => {

  
  if (window.matchMedia("(max-width: 768px)").matches) {
    return (
      <div className="block md:hidden">
        <SideBar />
      </div>
    );
  } else {
    redirect("/profile/info");
  }
};

export default Profile;
