import { Metadata } from "next";
import InfoContainer from "./(page-component)/InfoContainer";

export const metadata:Metadata = {
  title: "Info",
  description: "Info",
};

const Info = () => {
  return <InfoContainer />;
};

export default Info;
