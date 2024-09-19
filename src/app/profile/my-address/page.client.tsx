"use client";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@rt/network/httpRequester";
import { ENDPOINT } from "@rt/network/EndPoint";
import AddressCard from "./(page-component)/AddressCard/AddressCard";
import PageLoading from "./(page-component)/PageLoading/PageLoading";
import AddAddressButton from "./(page-component)/AddAddressModal/AddAddressButton";

const MyAdressContainer = () => {
  const queryClient = useQueryClient();

  const postBody = {
    address: {
      title: "ev",
      name: "Rafet",
      phone: "Tanriverdi",
      city: "nigde",
      country: "turkiye",
      line1: "yukari mah",
      line2: "ustun sokak",
      postal_code: "34500",
      state: "fevzi cakmak",
      isDefault: false,
    },
  };

  const mutation = useMutation({
    mutationKey: ["addAddress"],
    mutationFn: () => axiosInstance.post(ENDPOINT.ADDRESS.ADD, postBody),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myAddressList"] });
    },
  });

  const updateAddress = {
    address: {
      isDefault: true,
    },
  };

  const { data,isLoading } = useQuery({
    queryKey: ["myAddressList"],
    queryFn: () => axiosInstance.get(ENDPOINT.ADDRESS.LIST),
  });

if(isLoading) return <PageLoading/>

  return (
    <>
      <div className="p-4">
       <AddAddressButton/>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-center mt-4">
          {data?.data.addresses.map((address: any) => (
            <AddressCard key={address.addressId} {...address} />
          ))}
        </div>

      
      
      </div>
    </>
  );
};

export default MyAdressContainer;
