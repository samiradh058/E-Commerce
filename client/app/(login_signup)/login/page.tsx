"use client";

import { loginUser } from "@/app/(content)/_utils/user";
import { redirect } from "next/navigation";
import { JSX, useState } from "react";
import { IoIosMail, IoMdKey } from "react-icons/io";

export default function LoginSignupModern() {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const loginSignup2Text = "Login";
  const loginSignup2Form = [
    {
      label: "Email",
      type: "email",
      name: "email",
      icon: "IoIosMail",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      icon: "IoMdKey",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate email and password fields
  const validateForm = () => {
    const formErrors: { [key: string]: string } = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validate email
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      formErrors.email = "Please enter a valid email address";
    }

    // Validate password
    if (!formData.password) {
      formErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      formErrors.password = "Password must be at least 8 characters";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Only proceed if the form is valid
    if (validateForm()) {
      const result = await loginUser(formData);

      if (!result.success) {
        setErrors({ login: "Invalid Credentials" });
      } else {
        redirect("/");
      }
    }
  };

  const iconMap: { [key: string]: JSX.Element } = {
    IoIosMail: <IoIosMail className="text-gray-500" />,
    IoMdKey: <IoMdKey className="text-gray-500" />,
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-[18rem] sm:w-[20rem] lg:w-[22rem] p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          {loginSignup2Text}
        </h2>

        <form onSubmit={handleSubmit}>
          {loginSignup2Form?.map((field, index) => (
            <div className="mb-4" key={index}>
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <div className="relative flex items-center">
                {field.icon && iconMap[field.icon] && (
                  <span className="absolute left-3">{iconMap[field.icon]}</span>
                )}
                <input
                  type={field.type}
                  name={field.name}
                  className="w-full mt-1 p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  required
                />
              </div>
              {errors[field.name] && (
                <p className="text-red-500 text-sm">{errors[field.name]}</p>
              )}
            </div>
          ))}

          <p className="text-red-500 text-sm my-2 flex justify-center">
            {errors["login"]}
          </p>
          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded-lg hover:opacity-95 hover:scale-105 transition-transform duration-200"
          >
            {loginSignup2Text}
          </button>
        </form>
      </div>
    </div>
  );
}
