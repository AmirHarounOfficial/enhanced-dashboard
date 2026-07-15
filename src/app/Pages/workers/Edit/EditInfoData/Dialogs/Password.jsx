"use client"
import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateWorkerThunk } from '@/redux/slice/Workers/WorkersSlice';

function Password({openPassword , setOpenPassword ,worker}) {
      const {t}= useTranslation();
      const dispatch = useDispatch();
      const { loading } = useSelector(state => state.workers);

        const [showPassword, setShowPassword] = useState(false);
        const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
        const [isFocused, setIsFocused] = useState(false);
        const [password, setPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const [rules, setRules] = useState({
          uppercase: false,
          symbol: false,
          number: false,
          length: false,
        });
      
        // ✅ Handle password input and update rules
        const handlePasswordChange = (e) => {
          const value = e.target.value;
          setPassword(value);
      
          setRules({
            uppercase: /[A-Z]/.test(value),
            symbol: /[!@#$%^&*(),.?":{}|<>]/.test(value),
            number: /[0-9]/.test(value),
            length: value.length >= 8,
          });
        };
      
        // ✅ Check if passwords match
        const passwordsMatch =
          confirmPassword.length > 0 && password === confirmPassword;

        const handleSubmit = async (e) => {
          e.preventDefault();
          if (!passwordsMatch) return;
          
          const formData = new FormData();
          formData.append('id', worker?.id);
          formData.append('password', password);
          formData.append('password_confirmation', confirmPassword);
          
          const result = await dispatch(UpdateWorkerThunk(formData));
          if (UpdateWorkerThunk.fulfilled.match(result)) {
            setOpenPassword(false);
            setPassword("");
            setConfirmPassword("");
          }
        };
      
  return (
    <>
      <Dialog 
        open={openPassword} 
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ className: "ServicePage-dialog" }}
      >
      <button onClick={()=>setOpenPassword(false)} className="modal-close" aria-label={t('cancel')}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M13.5 4.5l-9 9M4.5 4.5l9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
      </button>


      <div className='flex flex-col gap-5 items-center justify-center mb-8'>
        {/* icon */}
        <div className='bg-[#EEF2F6] w-17.5 h-17.5 rounded-[100%] flex items-center justify-center '>
          <div className='bg-[#CDD5DF] w-12.5 h-12.5 rounded-[100%] flex items-center justify-center'>
            <img src="/images/icons/emailotp.svg" className="w-7.5 h-7.5"  />
          </div>
        </div>

        {/* title */}
        <p className='text-[var(--color-primary)] text-xl font-bold'>{t('Change email')}</p>

      </div>
      
      <form action="" className=' px-6 '>
        {/* New Password */}
        <div className="flex flex-col mb-3">
          <label className="text-[#364152] text-sm font-medium mb-2 block">
            {t("password")}
          </label>

          <div className="relative">
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute end-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#9AA4B2] w-4 h-4 flex items-center justify-center"
            >
              {showPassword ? (
                <img src="/images/icons/eyeClose.svg" alt="Hide password" className="w-4 h-4" />
              ) : (
                <img src="/images/icons/eyeOpen.svg" alt="Show password" className="w-4 h-4" />
              )}
            </span>

            {/* Input field */}
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder={t("Enter your password")}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={handlePasswordChange}
              className="w-full h-11 px-4 pe-10 border border-[#E3E8EF] rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2]"
            />
          </div>

          {/* Show rules only when focused */}
          {isFocused && (
            <ul className="mt-3 mb-6 space-y-1 text-sm">
              <li
                className={
                  rules.uppercase
                    ? "text-[#067647] list-none flex gap-2"
                    : "text-[#697586] list-disc mx-5"
                }
              >
                <span>
                  {rules.uppercase && <img src="/images/icons/true.svg" alt="" />}
                </span>
                <span>{t("Use at least one uppercase letter")}</span>
              </li>

              <li
                className={
                  rules.symbol
                    ? "text-[#067647] list-none flex gap-2"
                    : "text-[#697586] list-disc mx-5"
                }
              >
                <span>
                  {rules.symbol && <img src="/images/icons/true.svg" alt="" />}
                </span>
                <span>{t("Use at least one symbol")}</span>
              </li>

              <li
                className={
                  rules.number
                    ? "text-[#067647] list-none flex gap-2"
                    : "text-[#697586] list-disc mx-5"
                }
              >
                <span>
                  {rules.number && <img src="/images/icons/true.svg" alt="" />}
                </span>
                <span>{t("Use at least one number")}</span>
              </li>

              <li
                className={
                  rules.length
                    ? "text-[#067647] list-none flex gap-2"
                    : "text-[#697586] list-disc mx-5"
                }
              >
                <span>
                  {rules.length && <img src="/images/icons/true.svg" alt="" />}
                </span>
                <span>{t("Your password must be at least 8 characters long")}</span>
              </li>
            </ul>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col ">
          <label className="text-[#364152] text-sm font-medium mb-2 block">
            {t("Confirm password")}
          </label>

          <div className="relative">
            <span
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              className="absolute end-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#9AA4B2] w-4 h-4 flex items-center justify-center"
            >
              {showPasswordConfirm ? (
                <img src="/images/icons/eyeClose.svg" alt="Hide password" className="w-4 h-4" />
              ) : (
                <img src="/images/icons/eyeOpen.svg" alt="Show password" className="w-4 h-4" />
              )}
            </span>

            <input
              type={showPasswordConfirm ? "text" : "password"}
              value={confirmPassword}
              placeholder={t("Re-enter your password")}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full h-11 px-4 pe-10 border rounded-[10px] text-sm text-[#364152] bg-white outline-none transition-all duration-150 hover:border-[#C69815]/40 focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)] focus:bg-[#FFFDF8] placeholder-[#9AA4B2] ${
                confirmPassword
                  ? passwordsMatch
                    ? "border-[#067647]"
                    : "border-[#F04438]"
                  : "border-[#E3E8EF]"
              }`}
            />
          </div>

          {confirmPassword.length > 0 && (
            <p
              className={`mt-2 text-sm ${
                passwordsMatch ? "text-[#067647]" : "text-[#F04438]"
              }`}
            >
              {passwordsMatch
                ? t("Passwords match") 
                : t("Passwords do not match")}
            </p>
          )}
        </div>

        <div className="modal-footer">
          <button
            onClick={handleSubmit}
            disabled={loading || !passwordsMatch}
            className="btn-primary flex-1 h-11 rounded-[10px] text-white text-sm font-semibold">
            {loading ? t('loading...') : t('save')}
          </button>
          <button onClick={()=>setOpenPassword(false)} className="btn-ghost flex-1">
            {t('cancel')}
          </button>
        </div>
      </form>
      
      </Dialog>
    </>
  )
}

export default Password


