"use client"
import Link from 'next/link';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

function SelectPlanPage() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(null);
  const isSelected = selected !== null;

  const plans = [
    {
      id: 1,
      icon: '🌱',
      title: t("Start for free and pay after earnings."),
      desc: t("Sign up now and start for free. The package value will be deducted from your earnings later."),
    },
    {
      id: 2,
      icon: '⚡',
      title: t("Sign up now and get started right away!"),
      desc: t("Pay now to get all the benefits immediately after account activation"),
    },
  ];

  return (
    <>
      <section className="mb-8">
        <p className="text-[#364152] text-2xl font-bold">{t('Select the appropriate plan')}</p>
        <p className="text-[#697586] text-sm font-normal mt-2">{t('Professional to suit you anytime')}</p>
      </section>

      <section className="flex justify-center mb-8">
        <img src="/images/selectPlan.svg" alt="" className="max-h-36 object-contain" />
      </section>

      <section className="mb-8">
        <p className="text-[#364152] text-base font-semibold mb-4">
          {t("Choose the type of subscription?")}
        </p>

        <div className="flex flex-col gap-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelected(plan.id)}
              className={`
                cursor-pointer p-4 w-full rounded-[8px] border-2 transition-all duration-200
                flex items-start gap-3
                ${selected === plan.id
                  ? 'bg-[#FEF0C7] border-[var(--color-primary)] shadow-sm'
                  : 'bg-[#F8FAFC] border-[#E3E8EF] hover:border-[#CDD5DF]'}
              `}
            >
              <span className="text-2xl leading-none mt-0.5 flex-shrink-0">{plan.icon}</span>
              <div>
                <p className="text-[#364152] text-sm font-semibold mb-1">{plan.title}</p>
                <p className="text-[#697586] text-sm font-normal leading-relaxed">{plan.desc}</p>
              </div>
              {selected === plan.id && (
                <div className="ms-auto flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Link
        href={isSelected ? "/Pages/Subscription/Subscribe/select-subscription-duration" : "#"}
        className={`flex items-center justify-center text-center h-11 rounded-[6px] px-6 mb-8 transition-all duration-200 font-medium text-sm ${
          isSelected
            ? "bg-[var(--color-primary)] text-white cursor-pointer hover:brightness-105"
            : "bg-[#EEF2F6] text-[#9AA4B2] cursor-not-allowed"
        }`}
      >
        {t("the next")}
      </Link>
    </>
  );
}

export default SelectPlanPage;
