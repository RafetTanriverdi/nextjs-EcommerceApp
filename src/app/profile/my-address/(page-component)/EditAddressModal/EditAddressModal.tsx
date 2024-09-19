import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../../components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../../../network/httpRequester";
import { ENDPOINT } from "../../../../../network/EndPoint";
import { count } from "console";
import { Label } from "../../../../../components/ui/label";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import { LoaderCircle } from "lucide-react";

const EditAddressModal = ({
  props,
  setOpen,
  open,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  props: any;
}) => {
  const queryClient = useQueryClient();
  const [updateAddress, setUpdateAddress] = useState({
    address: {
      city: props?.city,
      postal_code: props?.postal_code,
      line1: props?.line1,
      line2: props?.line2,
      country: props?.country,
      state: props?.state,
      phone: props?.phone,
      name: props?.name,
      title: props?.title,
    },
  });

  console.log(updateAddress, "updateAddress");
  const mutation = useMutation({
    mutationKey: ["updateAddress"],
    mutationFn: () =>
      axiosInstance.put(
        ENDPOINT.ADDRESS.UPDATE.replace(":addressId", props.addressId),
        updateAddress
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myAddressList"] });
      setOpen(!open);
    },
    onError: (error) => {
      console.log(error, "error");
    },
  });

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Address</DialogTitle>
          <DialogDescription>
            You can edit your address information here.
          </DialogDescription>
        </DialogHeader>

        <div className="p-3">
          <div className="flex gap-4 items-center mb-3">
            <Label className="flex-shrink-0  text-base md:text-lg">
              Title:
            </Label>
            <Input
              className="flex-grow"
              defaultValue={props?.title}
              onChange={(e) =>
                setUpdateAddress({
                  address: { ...updateAddress.address, title: e.target.value },
                })
              }
            />
          </div>
          <div className="flex gap-4 items-center mb-3">
            <Label className="flex-shrink-0  text-base md:text-lg">Name:</Label>
            <Input
              className="flex-grow"
              defaultValue={props?.name}
              onChange={(e) =>
                setUpdateAddress({
                  address: { ...updateAddress.address, name: e.target.value },
                })
              }
            />
          </div>
          <div className="flex gap-4 items-center mb-3">
            <Label className="flex-shrink-0  text-base md:text-lg">
              Phone:
            </Label>
            <Input
              className="flex-grow"
              defaultValue={props?.phone}
              onChange={(e) =>
                setUpdateAddress({
                  address: { ...updateAddress.address, phone: e.target.value },
                })
              }
            />
          </div>

          <div className="flex gap-4 items-center mb-3">
            <Label className="flex-shrink-0  text-base md:text-lg">City:</Label>
            <Input
              className="flex-grow"
              defaultValue={props?.city}
              onChange={(e) =>
                setUpdateAddress({
                  address: { ...updateAddress.address, city: e.target.value },
                })
              }
            />
          </div>
          <div className="flex gap-4 items-center mb-3">
            <Label className="flex-shrink-0  text-base md:text-lg">
              Line 1:
            </Label>
            <Input
              className="flex-grow"
              defaultValue={props?.line1}
              onChange={(e) =>
                setUpdateAddress({
                  address: { ...updateAddress.address, line1: e.target.value },
                })
              }
            />
          </div>
          <div className="flex gap-4 items-center mb-3">
            <Label className="flex-shrink-0  text-base md:text-lg">
              Line 2:
            </Label>
            <Input
              className="flex-grow"
              defaultValue={props?.line2}
              onChange={(e) =>
                setUpdateAddress({
                  address: { ...updateAddress.address, line2: e.target.value },
                })
              }
            />
          </div>

          <div className="flex gap-4 items-center mb-3">
            <Label className="flex-shrink-0  text-base md:text-lg">
              State:
            </Label>
            <Input
              className="flex-grow"
              defaultValue={props?.state}
              onChange={(e) =>
                setUpdateAddress({
                  address: { ...updateAddress.address, state: e.target.value },
                })
              }
            />
          </div>

          <div className="flex gap-4 items-center mb-3">
            <Label className="flex-shrink-0  text-base md:text-lg">
              Postal Code:
            </Label>
            <Input
              className="flex-grow"
              defaultValue={props?.postal_code}
              onChange={(e) =>
                setUpdateAddress({
                  address: {
                    ...updateAddress.address,
                    postal_code: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => mutation.mutate()} variant={"default"} >
            {mutation.isPending && (
              <LoaderCircle className="animate-spin h-5 w-5 mr-2" />
            )}
            Update Address
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAddressModal;
