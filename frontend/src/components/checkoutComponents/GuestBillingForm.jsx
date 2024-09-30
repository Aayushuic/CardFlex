import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PencilIcon } from "lucide-react";

const GuestBillingForm = ({ setGuestUserInfo, guestUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [isEditing, setIsEditing] = useState(false);
  

  useEffect(() => {
    if (guestUser) {
      // Populate form with guest information if available
      reset({
        name: guestUser?.name || "",
        email: guestUser?.email || "",
        phoneNumber: guestUser?.phoneNumber || "",
      });
    }
  }, [guestUser, reset]);

  const onSubmit = (data) => {
    setGuestUserInfo(data);
    toast.success("Details saved successfully");
    setIsEditing(false); // Close edit mode after saving
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    handleSubmit(onSubmit)(); // Trigger form submission
  };

  const handleAdd = () => {
    handleSubmit(onSubmit)(); // Trigger form submission to add information
  };

  const isGuestUserEmpty = !guestUser?.name && !guestUser?.email && !guestUser?.phoneNumber;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className={`mt-1 p-2 block w-full border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm ${
              isEditing ? "focus:border-blue-500" : ""
            }`}
            readOnly={!isEditing && !isGuestUserEmpty}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email must be a valid email address",
              },
            })}
            className={`mt-1 p-2 block w-full border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm ${
              isEditing ? "focus:border-blue-500" : ""
            }`}
            readOnly={!isEditing && !isGuestUserEmpty}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="relative sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone Number
          </label>
          <input
            type="tel"
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number must be 10 digits",
              },
            })}
            className={`mt-1 p-2 block w-full border ${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm ${
              isEditing ? "focus:border-blue-500" : ""
            }`}
            readOnly={!isEditing && !isGuestUserEmpty}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        {isGuestUserEmpty ? (
          <Button
            type="button"
            onClick={handleAdd}
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
          >
            Add Billing Information
          </Button>
        ) : isEditing ? (
          <Button
            type="button"
            onClick={handleSave}
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
          >
            Save Changes
          </Button>
        ) : (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={handleEdit}
              className="w-full "
            >
              <PencilIcon size={20} className="mr-2" />
              Edit Information
            </Button>
          </>
        )}
      </div>
    </form>
  );
};

export default GuestBillingForm;
