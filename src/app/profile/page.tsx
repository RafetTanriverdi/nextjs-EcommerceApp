"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SideBar } from "./(page-component)/RTSidebar/SideBar";

const Profile = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile === false) {
      router.push("/profile/info");
    }
  }, [isMobile, router]);

  if (isMobile === null) {
    return null;
  }

  return isMobile ? (
    <div className="block md:hidden">
      <SideBar />
    </div>
  ) : null;
};

export default Profile;
