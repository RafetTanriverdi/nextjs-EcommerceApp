import React from "react";
import MyAddressContainer from "./(page-component)/MyAdressContainer";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: "My Address",
  description: "My Address",
};

const MyAddress = () => {
  return <MyAddressContainer />;
};

export default MyAddress;
