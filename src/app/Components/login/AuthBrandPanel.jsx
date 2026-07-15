"use client";
import React from 'react';

export default function AuthBrandPanel() {
  return (
    <div
      className="hidden lg1:flex flex-col w-[480px] xl:w-[540px] flex-shrink-0 relative overflow-hidden"
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

        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {['لوحة تحكم ذكية', 'طلبات فورية', 'تقارير مالية', 'متعدد الوحدات'].map((f) => (
            <span key={f} className="text-xs font-medium text-white/90 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              {f}
            </span>
          ))}
        </div>

        <div className="mt-6">
          <img src="/images/AuthLogMiddle.svg" alt="" className="w-48 opacity-90" />
        </div>
      </div>

      {/* Bottom decorative image */}
      <div className="relative z-10">
        <img src="/images/AuthLogDown.svg" alt="" className="w-24 h-auto opacity-80" />
      </div>
    </div>
  );
}
