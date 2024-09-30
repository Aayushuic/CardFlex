import React from "react";
import { useSelector } from "react-redux";

const LoggedInBillingForm = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div>
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              value={user.name}
              readOnly
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div className="relative sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <input
              type="tel"
              value={user.phoneNumber}
              readOnly
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoggedInBillingForm;
