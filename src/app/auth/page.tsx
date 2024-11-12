import { redirect, useRouter } from "next/navigation";

const page = () => {
  redirect("auth/login");
  
};

export default page;
