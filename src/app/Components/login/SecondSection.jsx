"use client";
import React from 'react'
import { useTranslation } from 'react-i18next';

function SecondSection() {
  const { t } = useTranslation();
  return (
    <>
      
        <section
          className="w-full hidden lg1:block rounded-[10px] relative"
        style={{
          backgroundImage:
            "linear-gradient(180deg, #DDA918 48.1%, #9D7810 99.85%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        >
          <div 
            style={{
              position: "inherit",
              width: "100%",
              height: "100%",
              display: "inherit",
              backgroundImage: " url('/images/shadowlogin.svg')",
              backgroundSize: "unset",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundOpacity: "0.5",
            }}>
  <p className="flex justify-end ml-4">
    <img src="/images/AuthLogUP.png" alt="" className="w-29 h-49" />
  </p>

  <div className="mt-4.5 w-[70%] mx-auto flex flex-col gap-4 text-center text-white">
    <p className="text-3xl font-bold">
      {t("Join the ZETIME Partner Network")}
    </p>
    <p className="text-lg font-normal leading-9">
      {t(
        "Register now and get the tools you need to reach a wider customer base and achieve your goals efficiently."
      )}
    </p>
    <p className="mt-20 mb-[18.555vh]">
      <img src="/images/AuthLogMiddle.svg" alt="" />
    </p>
  </div>

  {/* 👇 absolutely positioned at bottom */}
  <p className="absolute bottom-0  ">
    <img src="/images/AuthLogDown.svg" alt="" className="w-29 h-49" />
  </p>
  </div>
</section>

    </>
  )
}

export default SecondSection