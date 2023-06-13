import { useUpdateUserMutation } from "<@>/store/auth/auth-api";
import { useAppSelector } from "<@>/store/hooks";
import router from "next/router";
import React, { useEffect, useState } from "react";
import InputField from "../auth/InputField";
import User from "<@>/types/user";
import { africanCountries } from "<@>/constants/african-countries";
import Image from "next/image";
import Link from "next/link";

const Edit = () => {
  // const token = JSON.parse(localStorage.getItem("user") || "{}") || {};
  const token = "";

  const { data } = useAppSelector((state) => state.user);
  const [formValue, setFormValue] = useState(data);
  const [errors, setErrors] = useState<Partial<User["data"]>>({});
  const [imagePreview, setImagePreview] = useState("");
  const {
    FullName,
    Email,
    PhoneNumber,
    TelegramUsername,
    Country,
    ShortBio,
    ProfilePicture,
    University,
    Department,
    GraduationYear,
    LeetCode,
    GitHub,
    Codeforces,
    Hackerrank,
    LinkedIn,
    Cv,
    FavoriteLanguage,
  } = formValue;

  const [
    updateUser,
    {
      data: updateData,
      isError: isUpdateError,
      isSuccess: isUpdateSuccess,
      error: updateError,
    },
  ] = useUpdateUserMutation();

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors: Partial<User["data"]> = {};
    if (!FullName) {
      validationErrors.FullName = "Full Name is required";
    } else if (!Email) {
      validationErrors.Email = "Email is required";
    } //check if email is valid
    else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        Email
      )
    ) {
      validationErrors.Email = "Email is invalid";
    }
    // check if phone number is valid
    else if (PhoneNumber) {
      if (!/^(?:\+251|251|0)?[1-59]\d{8}$/.test(PhoneNumber)) {
        validationErrors.PhoneNumber = "Phone number is invalid";
      }
    }

    await updateUser({ ...formValue, token });
  };

  useEffect(() => {
    if (isUpdateSuccess) {
      router.push("/profile");
    }
  }, [isUpdateSuccess]);

  useEffect(() => {
    if (isUpdateError) {
      alert(updateError);
    }
  }, [isUpdateError]);

  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.files[0] });
    console.log(e.target.files[0]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setImagePreview("");
    }
  };
  
  const handlePdfUpload = (e: any) => {
    setFormValue({ ...formValue, Cv: e.target.files[0] });
  };

  const openPdfInNewTab = () => {
    if (formValue.Cv) {
      const url = URL.createObjectURL(formValue.Cv);
      window.open(url, "_blank");
    }
  };

  return (
    <div className="flex flex-col  items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center w-[80%]">
        <h1 className="text-2xl font-semibold w-full text-primary-text">
          Edit Profile
        </h1>
        <form
          onSubmit={handleUpdate}
          className="flex flex-col justify-center w-full space-y-4 mx-5 my-4"
        >
          <div className="flex flex-col">
            <p className="text-primary-text text-[14px] font-semibold">
              Profile Picture
            </p>
            <div className="flex flex-row gap-4">
              <input
                type="file"
                name="ProfilePicture"
                placeholder=""
                accept="image/*"
                onChange={handleImageUpload}
                className="border max-h-8 rounded-md mt-1 border-gray-300 placeholder-white-400"
              />
              {imagePreview && (
                <Image width={80} height={40} src={imagePreview} alt="" className="border rounded-md" />
              )}
            </div>
          </div>
          <div className="flex flex-col ed:flex-row ed:max-w-[89%]">
            <div className="flex flex-col flex-grow">
              <InputField
                label="Full Name"
                name="name"
                type="text"
                placeholder=""
                value={FullName}
                onChange={handleChange}
                error={errors.FullName}
              />
            </div>
            <div className="flex flex-col flex-grow">
              <InputField
                label="Telegram Username"
                name="telegramHandle"
                type="text"
                placeholder=""
                value={TelegramUsername}
                onChange={handleChange}
                error={errors.TelegramUsername}
              />
            </div>
          </div>
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder=""
            value={Email}
            onChange={handleChange}
            error={errors.Email}
          />

          <div className="flex flex-col ed:flex-row ed:max-w-[89%]">
            <div className="flex flex-col flex-grow">
              <p className="text-primary-text text-[14px] font-semibold">
                Country
              </p>
              <select
                name="country"
                onChange={handleChange}
                className="border max-w-[80%] rounded-md py-1 px-3 mt-1 border-gray-300"
              >
                <option value={Country}>{Country}</option>
                {africanCountries.map((country) => (
                  <option key={country.value} value={country.label}>
                    {country.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col flex-grow">
              <InputField
                label="Phone Number"
                name="phoneNumber"
                type="text"
                placeholder=""
                value={PhoneNumber}
                onChange={handleChange}
                error={errors.PhoneNumber}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-primary-text text-[14px] font-semibold">
              Short bio
            </p>
            <textarea
              name="ShortBio"
              placeholder=""
              value={ShortBio}
              onChange={handleChange}
              className="border max-w-[80%] rounded-md py-1 px-3 mt-1 border-gray-300 placeholder-white-400"
            />
          </div>

          <div className="flex flex-col ed:flex-row ed:max-w-[86%]">
            <div className="flex flex-col flex-grow">
              <InputField
                label="University"
                name="University"
                type="text"
                placeholder=""
                value={University}
                onChange={handleChange}
                error={errors.University}
              />
            </div>
            <div className="flex flex-col flex-grow">
              <InputField
                label="Department"
                name="Department"
                type="text"
                placeholder=""
                value={Department}
                onChange={handleChange}
                error={errors.Department}
              />
            </div>
            <div className="flex flex-col flex-grow">
              <InputField
                label="Year Of Graduation"
                name="GraduationYear"
                type="text"
                placeholder=""
                value={GraduationYear}
                onChange={handleChange}
                error={errors.GraduationYear}
              />
            </div>
          </div>

          <div className="flex flex-col ed:flex-row ed:max-w-[86%]">
            <div className="flex flex-col flex-grow">
              <InputField
                label="Leetcode Username"
                name="LeetCode"
                type="text"
                placeholder=""
                value={LeetCode}
                onChange={handleChange}
                error={errors.LeetCode}
              />
            </div>
            <div className="flex flex-col flex-grow">
              <InputField
                label="Codeforces Username"
                name="codeforcesUsername"
                type="text"
                placeholder=""
                value={Codeforces}
                onChange={handleChange}
                error={errors.Codeforces}
              />
            </div>
            <div className="flex flex-col flex-grow">
              <InputField
                label="Hackerrank Username"
                name="Hackerrank"
                type="text"
                placeholder=""
                value={Hackerrank}
                onChange={handleChange}
                error={errors.Hackerrank}
              />
            </div>
          </div>
          <div className="flex flex-col ed:flex-row ed:max-w-[89%]">
            <div className="flex flex-col flex-grow">
              <InputField
                label="Github Username"
                name="GitHub"
                type="text"
                placeholder=""
                value={GitHub}
                onChange={handleChange}
                error={errors.GitHub}
              />
            </div>
            <div className="flex flex-col flex-grow">
              <InputField
                label="Linkedin Url"
                name="LinkedIn"
                type="text"
                placeholder=""
                value={LinkedIn}
                onChange={handleChange}
                error={errors.LinkedIn}
              />
            </div>
          </div>
          <div className="flex flex-col ed:flex-row gap-2 mb-5 ed:max-w-[94%]">
            <div className="flex flex-col">
              <p className="text-primary-text text-[14px] font-semibold">Cv</p>
              <div className="flex flex-row gap-4 items-end">
                <input
                  type="file"
                  name="Cv"
                  placeholder=""
                  accept="application/pdf"
                  onChange={handlePdfUpload}
                  className="border max-h-8 rounded-md mt-1 border-gray-300 placeholder-white-400"
                />
                {formValue.Cv && (
                  <Link
                    href="#"
                    className="text-blue-500 underline hover:text-blue-700 mr-5"
                    onClick={openPdfInNewTab}
                  >
                    {formValue.Cv.name}
                  </Link>
                )}
              </div>
            </div>
            <div className="flex flex-col flex-grow">
              <InputField
                label="Programming Language"
                name="FavoriteLanguage"
                type="text"
                placeholder=""
                value={FavoriteLanguage}
                onChange={handleChange}
                error={errors.FavoriteLanguage}
              />
            </div>
          </div>
          <hr />

          <div className="flex flex-row justify-end gap-4 max-w-[90%]">
            <button
              type="submit"
              className="px-3 py-2 mt-4 text-white bg-red-400 rounded-md"
            >
              cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 mt-4 text-white bg-primary rounded-md"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
