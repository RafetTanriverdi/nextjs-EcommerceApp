"use client";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@rt/network/httpRequester";
import { ENDPOINT } from "@rt/network/EndPoint";
import AddressCard from "./(page-component)/AddressCard/AddressCard";

const MyAdressContainer = () => {
  const queryClient = useQueryClient();
  const postBody = {
    addressId: "8fa292ec-d57b-4d95-9a3b-2e345140ec54",
    address: {
      title: "1234",
      city: "city",
      country: "country",
      postalCode: "postalCode",
      state: "state",
      type: "type",
    },
  };

  const mutation = useMutation({
    mutationKey: ["addAddress"],
    mutationFn: () => axiosInstance.post(ENDPOINT.ADDRESS.ADD, postBody),
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
