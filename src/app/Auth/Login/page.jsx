"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "@/redux/slice/Auth/AuthSlice";
import { useRouter } from "next/navigation";
import No_account from "@/app/Components/login/No_account";

function LoginPage() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const router = useRouter();

  const [formData, setFormData] = useState({ login: "", password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginThunk(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        const { current_module_key, has_subscription, national_id, status } = user;
        if (has_subscription === false && current_module_key === null || has_subscription === false) {
          router.push("/Pages/dashboard/Main");
        } else {
          if (national_id === null) {
            router.push('/Pages/dashboard/TemporaryDashboard/CompleteSignupData');
          } else if (status === 'pending') {
            router.push('/Pages/dashboard/TemporaryDashboard/StatusOfProvider/waitingApproval');
          } else if (status === 'rejected') {
            router.push('/Pages/dashboard/TemporaryDashboard/StatusOfProvider/RejectAccount');
          } else if (status === 'active') {
            if (has_subscription === true) {
              router.push('/Pages/Home');
            } else {
              router.push('/Pages/dashboard/TemporaryDashboard/StatusOfProvider/AcceptAccount');
            }
          }
        }
      }
    }
  }, [isAuthenticated, router]);

  return (
    <div className="h-dvh overflow-hidden flex" style={{ background: '#F8FAFC' }}>

      {/* ── Form panel (right in RTL) ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 lg1:px-14 relative overflow-hidden">

        {/* Subtle gold glow top */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '40%',
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgb(198 152 21 / 0.06) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        <div className="w-full max-w-[400px] relative flex flex-col gap-6">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/images/LogoText.svg" alt="ZeTime" className="h-7" />
            <img src="/images/Logo.svg" alt="" className="h-7" />
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-[24px] font-bold text-[#364152] leading-snug mb-1">
              {t("Welcome back!")}
            </h1>
            <p className="text-[#697586] text-sm">
              {t("Log in to access your account.")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Email / Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#364152] text-sm font-medium" htmlFor="email">
                {t("phone number")} / {t("Email")}
              </label>
              <input
                className="w-full h-11 px-4 border border-[#E3E8EF] rounded-[10px] bg-white
                           text-[#364152] text-sm placeholder-[#9AA4B2] outline-none
                           transition-all duration-150
                           hover:border-[#C69815]/40
                           focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)]
                           focus:bg-[#FFFDF8]"
                type="text"
                name="login"
                id="email"
                placeholder={t("Email")}
                value={formData.login}
                onChange={handleChange}
                autoComplete="username"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[#364152] text-sm font-medium" htmlFor="password">
                  {t("password")}
                </label>
                <Link
                  href="/Auth/Login/ForgetPassword"
                  className="text-[#9E7A11] text-xs font-medium hover:underline underline-offset-2"
                >
                  {t("Forgot your password?")}
                </Link>
              </div>
              <div className="relative">
                <input
                  className="w-full h-11 ps-4 pe-11 border border-[#E3E8EF] rounded-[10px] bg-white
                             text-[#364152] text-sm placeholder-[#9AA4B2] outline-none
                             transition-all duration-150
                             hover:border-[#C69815]/40
                             focus:border-[#C69815] focus:shadow-[0_0_0_3px_rgb(198_152_21_/_0.10)]
                             focus:bg-[#FFFDF8]"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-[#9AA4B2] hover:text-[#697586] transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <img
                    src={showPassword ? "/images/icons/eyeClose.svg" : "/images/icons/eyeOpen.svg"}
                    alt=""
                    className="w-4 h-4"
                  />
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full h-11 rounded-[10px] text-white text-sm font-semibold tracking-wide mt-1 transition-all duration-150
                ${loading ? 'opacity-60 cursor-not-allowed' : 'btn-primary cursor-pointer'}`}
              style={loading ? { background: '#C69815' } : undefined}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  {t("Loading...")}
                </span>
              ) : t("Log in")}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[#E3E8EF]" />
              <span className="text-[#9AA4B2] text-xs">{t("or")}</span>
              <div className="flex-1 h-px bg-[#E3E8EF]" />
            </div>

            <No_account />
          </form>

          {/* Footer */}
          <p className="text-center text-[#9AA4B2] text-xs">
            © {new Date().getFullYear()} ZeTime — جميع الحقوق محفوظة
          </p>
        </div>
      </div>

      {/* ── Brand panel (left in RTL) ── */}
      <div className="hidden lg1:flex flex-col w-[480px] xl:w-[540px] flex-shrink-0 relative overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #DDA918 0%, #B8880F 55%, #8A6510 100%)' }}
      >
        {/* Texture overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'url("/images/shadowlogin.svg")',
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3,
        }} />

        {/* Radial glow */}
        <div style={{
          position: 'absolute', top: '-60px', insetInlineStart: '-60px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.16) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Top decorative image */}
        <div className="flex justify-end pt-5 pe-5 relative z-10">
          <img src="/images/AuthLogUP.png" alt="" className="w-24 h-auto opacity-90" />
        </div>

        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center relative z-10">

          {/* Logo badge */}
          <div className="mb-6 w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.22)' }}
          >
            <img src="/images/Logo.svg" alt="" className="w-8 h-8 invert" />
          </div>

          <h2 className="text-white text-[22px] font-bold leading-snug mb-3">
            انضم إلى شبكة شركاء<br />ZETIME
          </h2>
          <p className="text-white/75 text-sm leading-relaxed max-w-[300px]">
            سجّل الآن واحصل على الأدوات التي تحتاجها للوصول إلى قاعدة عملاء أوسع وتحقيق أهدافك بكفاءة.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {['لوحة تحكم ذكية', 'طلبات فورية', 'تقارير مالية', 'متعدد الوحدات'].map((f) => (
              <span key={f} className="text-xs font-medium text-white/90 px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                {f}
              </span>
            ))}
          </div>

          {/* Middle illustration */}
          <div className="mt-6">
            <img src="/images/AuthLogMiddle.svg" alt="" className="w-48 opacity-90" />
          </div>
        </div>

        {/* Bottom decorative image */}
        <div className="relative z-10">
          <img src="/images/AuthLogDown.svg" alt="" className="w-24 h-auto opacity-80" />
        </div>
      </div>

    </div>
  );
}

export default LoginPage;
