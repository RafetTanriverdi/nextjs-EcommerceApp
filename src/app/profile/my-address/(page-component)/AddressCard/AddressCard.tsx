"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "../../../../../components/ui/card";
import { LoaderCircle, Pen, Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../../../network/httpRequester";
import { ENDPOINT } from "../../../../../network/EndPoint";
import EditAddressModal from "../EditAddressModal/EditAddressModal";
import { Label } from "@radix-ui/react-label";
import { Separator } from "../../../../../components/ui/separator";

interface AddressCardProps {
  country: string;
  isDefault: false;
  phone: string;
  city: string;
  name: string;
  state: string;
  title: string;
  postal_code: string;
  line2: string;
  line1: string;
  addressId: string;
}

const AddressCard = (props: AddressCardProps) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);

  const handleDelete = useMutation({
    mutationKey: ["deleteAddress"],
    mutationFn: () =>
      axiosInstance.delete(
        ENDPOINT.ADDRESS.DELETE.replace(":addressId", `${props.addressId}`)
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myAddressList"] });
    },
  });

  console.log(props, "address props");
  return (
    <>
      <EditAddressModal setOpen={setOpen} open={open} props={props} />
      <Card>
        <CardHeader className="flex-row justify-between">
          <div>
            <h1 className="text-lg font-semibold">{props.title}</h1>
          </div>
          <div className="flex gap-3">
            <Pen
              className="h-5 w-5 cursor-pointer"
              onClick={() => setOpen(!open)}
            />
            {handleDelete.isPending ? (
              <LoaderCircle className="animate-spin h-5 w-5" />
            ) : (
              <Trash
                className="h-5 w-5 cursor-pointer"
                onClick={() => handleDelete.mutate()}
              />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <Label> {props.name}</Label>
            <Label> {props.phone}</Label>
          </div>
          <Separator className="my-4" />
          <div>
            <Label>City: {props.city}</Label>
          </div>
          <div>
            <Label>Line 1: {props.line1}</Label>
          </div>
          <div>
            <Label>Line 2: {props.line2}</Label>
          </div>
          <div>
            <Label>State: {props.state}</Label>
          </div>
          <div>
            <Label>Postal Code: {props.postal_code}</Label>
          </div>
        </CardContent>
      </Card>
      
    </>
  );
};

export default AddressCard;
