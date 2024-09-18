"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "../../../../../components/ui/card";
import { Pen, Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../../../network/httpRequester";
import { ENDPOINT } from "../../../../../network/EndPoint";

interface AddressCardProps {
  title: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
  addressId: string;
}

const AddressCard = (props: AddressCardProps) => {
  const queryClient = useQueryClient();
  const handleDelete = useMutation({
    mutationKey: ["deleteAddress"],
    mutationFn: () =>
      axiosInstance.delete(
        ENDPOINT.ADDRESS.DELETE.replace(
          ":addressId",
          "e64caabd-059c-4939-88c5-df84c70c3bbf"
        )
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myAddressList"] });
    },
  });

const handleEdit =()=>{

}
  return (<>
    <Card>
      <CardHeader className="flex-row justify-between">
        <div>
          <h1 className="text-lg font-semibold">Title</h1>
        </div>
        <div className="flex gap-3">
          <Pen className="h-5 w-5" />
          <Trash className="h-5 w-5" onClick={() => handleDelete.mutate()} />
        </div>
      </CardHeader>
      <CardContent>
        <p>
          <span className="font-semibold">Zip Code :</span> 1234
        </p>
        <p className="text-sm">city</p>
        <p className="text-sm">state</p>
        <p className="text-sm">country</p>
        <p className="text-sm">postalCode</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm">Default Address </p>
      </CardFooter>
    </Card>
    {

    }
  </>
  );
};

export default AddressCard;
