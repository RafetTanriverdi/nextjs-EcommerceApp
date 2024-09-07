"use client";
import React, { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import awsmobile from "@rt/aws-exports";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@rt/network/httpRequester";
import RTInput from "@rt/components/PlatformComponent/RTInput";
import { Form, FormField, FormItem } from "@rt/components/ui/form";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@rt/components/ui/button";
import { ENDPOINT } from "@rt/network/EndPoint";
import { getCroppedImg } from "../../(utils)/cropImageHelper"; // Importing cropping helper
import Cropper from "react-easy-crop";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@rt/components/ui/dialog"; // shadcn ui components
import Image from "next/image";

Amplify.configure(awsmobile);

type PostBody = {
  name: string;
  email: string;
  phone: string;
  profilePicture?: string;
  cropData?: any; // Crop data for the image
  stripeCustomerId?: string;
};

const InfoContainer: React.FC = () => {
  const queryClient = useQueryClient();
  const form = useForm<PostBody>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => axiosInstance.get(ENDPOINT.PROFILE.GET),
  });

  const mutation = useMutation({
    mutationKey: ["profileUpdate"],
    mutationFn: (values: PostBody) =>
      axiosInstance.patch(ENDPOINT.PROFILE.UPDATE, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      form.setValue("name", data?.data.name);
      form.setValue("email", data?.data.email);
      form.setValue("phone", data?.data.phone);
    }
  }, [data, form]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setIsDialogOpen(true); // Open dialog for cropping
    }
  };

  const onCropComplete = (_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels); // Store cropped area
  };

  const handleCropSelect = async () => {
    if (selectedFile && croppedAreaPixels) {
      const croppedImageBase64 = await getCroppedImg(
        URL.createObjectURL(selectedFile),
        croppedAreaPixels
      );
      console.log("Cropped Image Base64:", croppedImageBase64); // Log Base64 image
      setCroppedImage(croppedImageBase64); // Store cropped image in base64 format
      setIsDialogOpen(false); // Close dialog after cropping
    }
  };

  const handleSubmit: SubmitHandler<PostBody> = async (values) => {
    if (croppedImage) {
      // Crop bilgilerini de gönderiyoruz
      values.profilePicture = croppedImage;
      values.cropData = croppedAreaPixels; // Croplama alanı bilgilerini gönderiyoruz
      mutation.mutate({
        ...values,
        stripeCustomerId: data?.data?.customerStripeId,
      });
    } else {
      mutation.mutate({
        ...values,
        stripeCustomerId: data?.data?.customerStripeId,
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="flex flex-col items-center">
          <div className="rounded-full overflow-hidden w-40 h-40 mb-4 border-2 border-gray-300 mt-4">
            <Image
              alt="profile picture"
              src={data?.data.profilePictureUrl}
              width={250}
              height={250}
              layout="fixed"
              objectFit="cover"
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => <RTInput.Text {...field} label="Name" />}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <RTInput.Text {...field} label="Email" readOnly={true} />
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => <RTInput.Text {...field} label="Phone" />}
        />

        <FormItem>
          <input type="file" onChange={handleFileChange} />
        </FormItem>

        {/* Dialog for Image Cropping */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <div />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crop Image</DialogTitle>
            </DialogHeader>
            <div className="relative w-full h-64">
              {selectedFile && (
                <Cropper
                  image={URL.createObjectURL(selectedFile)}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              )}
            </div>
            <DialogFooter>
              <Button onClick={handleCropSelect}>Select Crop</Button>
              <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <FormItem>
          <Button type="submit">Save</Button>
        </FormItem>
      </form>
    </Form>
  );
};

export default InfoContainer;
