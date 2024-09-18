"use client";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@rt/network/httpRequester";
import { ENDPOINT } from "@rt/network/EndPoint";
import AddressCard from "./(page-component)/AddressCard/AddressCard";

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
  const handleUpdate = useMutation({
    mutationKey: ["updateAddress"],
    mutationFn: () =>
      axiosInstance.put(
        ENDPOINT.ADDRESS.UPDATE.replace(
          ":addressId",
          "33bb7bbd-06bd-46d0-8698-1f2af03884b4"
        ),
        updateAddress
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myAddressList"] });
    },
  });

  const { data } = useQuery({
    queryKey: ["myAddressList"],
    queryFn: () => axiosInstance.get(ENDPOINT.ADDRESS.LIST),
  });

  return (
    <>
      <div className="p-4">
        <button
          onClick={() => mutation.mutate()}
          className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add New Address
        </button>
          <button
            onClick={() => handleUpdate.mutate()}
            className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Update Address
          </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-center">
          {data?.data.addresses.map((address: any) => (
            <AddressCard key={address.addressId} {...address} />
          ))}
        </div>

        {mutation.isPending && <div>Loading...</div>}
        {mutation.isError && <div>Error: {mutation.error.message}</div>}
      </div>
    </>
  );
};

export default MyAdressContainer;
