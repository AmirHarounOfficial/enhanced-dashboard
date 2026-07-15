"use client";
import ConfirmationBtn from "@/app/Components/Buttons/ConfirmationBtn";
import PreviousBtn from "@/app/Components/Buttons/PreviousBtn";
import SecondSection from "@/app/Components/login/SecondSection";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { resetPasswordThunk } from "@/redux/slice/Auth/AuthSlice";

function CreateNewPasswordpage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // values from localStorage
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState(""); 

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedOtp = localStorage.getItem("otp");
    const storedPhone = localStorage.getItem("phone");

    if (storedEmail) setEmail(storedEmail);
    if (storedOtp) setOtp(storedOtp);
    if (storedPhone) setPhone(storedPhone);
  }, []);

  // validation rules
  const rules = {
    uppercase: /[A-Z]/.test(password),
    symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    number: /[0-9]/.test(password),
    length: password.length >= 8,
  };

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setError(t("Password does not match"));
    } else {
      setError("");
    }
  }, [password, confirmPassword, t]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError(t("Password does not match"));
      return;
    }

    const formData = {
      email,
      otp,
      phone, // optional
      password,
      password_confirmation: confirmPassword,
    };

    const result = await dispatch(resetPasswordThunk(formData));

    if (resetPasswordThunk.fulfilled.match(result)) {
      router.push("/Auth/Login/ConfirmationDone");
    } else {
      setError(result.payload?.message || t("Something went wrong"));
    }
  };

  return (
    <>
      <div className="p-8 lg1:flex justify-between gap-8">
        <section className="w-full mt-15">
          <div className="flex flex-col items-center">
            <p className="mb-6 text-[#C69815] text-2xl font-semibold">
              {t("Create a new password")}
            </p>
            <p className="text-[#656565] text-lg font-normal max-w-[500px] text-center">
              {t("Your phone number has been verified and you can create a new password.")}
            </p>
            <img className="my-12 lg1:my-17.5" src="/images/lockLogIcon.svg" alt="" />
          </div>

          <form onSubmit={handleSubmit}>
            {/* Password */}
            <label className="text-[#364152] fontSizeA font-normal">
              {t("New Password")}
            </label>
            <div className="relative mt-3 mb-3">
              <input
                className="w-full h-15 p-3 border border-[#C8C8C8] rounded-[6px] placeholder-[#9A9A9A] placeholder:text-sm"
                type={showPassword ? "text" : "password"}
                placeholder={t("Enter the new password")}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <img src="/images/icons/eyeClose.svg" alt="" />
                ) : (
                  <img src="/images/icons/eyeOpen.svg" alt="" />
                )}
              </span>
            </div>

            {isFocused && (
              <ul className="mb-6 space-y-1 text-sm">
                <li className={rules.uppercase ? "text-[#067647]" : "text-[#697586]"}>
                  {t("Use at least one uppercase letter")}
                </li>
                <li className={rules.symbol ? "text-[#067647]" : "text-[#697586]"}>
                  {t("Use at least one symbol")}
                </li>
                <li className={rules.number ? "text-[#067647]" : "text-[#697586]"}>
                  {t("Use at least one number")}
                </li>
                <li className={rules.length ? "text-[#067647]" : "text-[#697586]"}>
                  {t("Your password must be at least 8 characters long")}
                </li>
              </ul>
            )}

            {/* Confirm Password */}
            <label className="text-[#364152] fontSizeA font-normal">
              {t("Confirm password")}
            </label>
            <div className="relative mt-3">
              <input
                className={`w-full h-15 p-3 border rounded-[6px] placeholder-[#9A9A9A] placeholder:text-sm ${
                  error ? "border-[#F04438]" : "border-[#C8C8C8]"
                }`}
                type={showNewPassword ? "text" : "password"}
                placeholder={t("Re-enter the new password")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showNewPassword ? (
                  <img src="/images/icons/eyeClose.svg" alt="" />
                ) : (
                  <img src="/images/icons/eyeOpen.svg" alt="" />
                )}
              </span>
            </div>

            {error && <p className="text-[#F04438] text-sm mt-2">{error}</p>}

            {/* Buttons */}
            <div className="flex gap-6 justify-center mb-12 mt-10">
              <PreviousBtn path="/Auth/Login/VerifyNumber" className="w-78" />
              <button
                type="submit"
                className="w-78 bg-[#C69815] text-white rounded-md py-3"
              >
                {t("Confirm")}
              </button>
            </div>
          </form>

          <p className="flex justify-center gap-1.5">
            <span className="text-[#697586] text-lg font-normal">
              {t("Dont have an account?")}
            </span>
            <Link href="/Auth/Sign_in" className="text-[#9E7A11] text-lg font-medium">
              {t("Create an account")}
            </Link>
          </p>
        </section>

        {/* Second section */}
        <SecondSection />
      </div>
    </>
  );
}

export default CreateNewPasswordpage;


