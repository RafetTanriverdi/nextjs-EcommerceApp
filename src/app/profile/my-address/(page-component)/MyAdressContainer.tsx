"use client";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@rt/network/httpRequester";
import { ENDPOINT } from "@rt/network/EndPoint";

const MyAdressContainer = () => {
  const postBody = {
    action: "delete",
    addressId: "8fa292ec-d57b-4d95-9a3b-2e345140ec54",
  };

  const mutation = useMutation({
    mutationKey: ["myAddress"],
    mutationFn: () => axiosInstance.put(ENDPOINT.ADDRESS, postBody),
  });

  return (
    <>
      <div>
        <button onClick={() => mutation.mutate()}>Add Address</button>
        {mutation.isPending && <div>Loading...</div>}
        {mutation.isError && <div>Error: {mutation.error.message}</div>}
      </div>
    </>
  );
};

export default MyAdressContainer;
