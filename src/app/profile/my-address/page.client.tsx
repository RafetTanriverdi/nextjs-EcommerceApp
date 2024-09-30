"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@rt/network/httpRequester";
import { ENDPOINT } from "@rt/network/EndPoint";
import AddressCard from "./(page-component)/AddressCard/AddressCard";
import PageLoading from "./(page-component)/PageLoading/PageLoading";
import AddAddressButton from "./(page-component)/AddAddressModal/AddAddressButton";

const MyAdressContainer = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["myAddressList"],
    queryFn: () => axiosInstance.get(ENDPOINT.ADDRESS.LIST),
  });

  if (isLoading) return <PageLoading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="p-4">
        <AddAddressButton />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-center mt-4">
          {data?.data?.addresses?.map((address: any) => (
            <AddressCard key={address.addressId} {...address} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyAdressContainer;
