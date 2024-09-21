"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../../components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../../../network/httpRequester";
import { ENDPOINT } from "../../../../../network/EndPoint";
import { LoaderCircle } from "lucide-react";

const AddAddressModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [address, setAddress] = useState({
    title: "",
    city: "",
    postal_code: "",
    line1: "",
    line2: "",
    country: "Turkey",
    state: "",
    phone: "",
    name: "",
    isDefault: false,
  });

  const queryClient = useQueryClient();
  console.log(address, "address");

  const mutation = useMutation({
    mutationKey: ["addAddress"],
    mutationFn: () => axiosInstance.post(ENDPOINT.ADDRESS.ADD, { address }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myAddressList"] });
      setOpen(!open);
      setAddress({
        title: "",
        city: "",
        postal_code: "",
        line1: "",
        line2: "",
        country: "Turkey",
        state: "",
        phone: "",
        name: "",
        isDefault: false,
      });
    },
    onError: (error) => {
      console.log(error, "error");
    },
  });

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogContent className="m-3">
        <DialogHeader>
          <DialogTitle>Add Address</DialogTitle>
          <DialogDescription>You can add your address here</DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3">
          <Label className="flex-shrink-0 ">Address Title: </Label>
          <Input
            placeholder="Please enter your address title"
            value={address.title}
            onChange={(e) => setAddress({ ...address, title: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-3">
          <Label className="flex-shrink-0 ">Contact Name: </Label>
          <Input
            placeholder="Please enter your contact name"
            value={address.name}
            onChange={(e) => setAddress({ ...address, name: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-3">
          <Label className="flex-shrink-0 ">Contact Phone: </Label>
          <Input
            placeholder="Please enter your contact phone"
            value={address.phone}
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-3">
          <Label className="flex-shrink-0 ">City: </Label>
          <Input
            placeholder="Please enter your city"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-3">
          <Label className="flex-shrink-0 ">Address Line 1: </Label>
          <Input
            placeholder="Please enter your address line 1"
            value={address.line1}
            onChange={(e) => setAddress({ ...address, line1: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-3">
          <Label className="flex-shrink-0 ">Address Line 2: </Label>
          <Input
            placeholder="Please enter your address line 2"
            value={address.line2}
            onChange={(e) => setAddress({ ...address, line2: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-3">
          <Label className="flex-shrink-0 ">State: </Label>
          <Input
            placeholder="Please enter your state"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-3">
          <Label className="flex-shrink-0 ">Postal Code: </Label>
          <Input
            placeholder="Please enter your postal code"
            value={address.postal_code}
            onChange={(e) =>
              setAddress({ ...address, postal_code: e.target.value })
            }
          />
        </div>

        <DialogFooter>
          <Button onClick={() => mutation.mutate()}>
            {mutation.isPending && (
              <LoaderCircle className="w-5 h-5 animate-spin mr-2" />
            )}
            Save Address
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressModal;
