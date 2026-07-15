"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

function SelectSubscriptionDurationPage() {
  const {t} = useTranslation();
   const [selected, setSelected] = useState(1);

  const periods = [
    { id: 1, label: "1 شهر"},
    { id: 3, label: "3 شهر" },
    { id: 6, label: "6 شهر" },
    { id: 12, label: "12 شهر"},
  ];


  const plans = [
  {
    id: 1,
    price: "10",
    duration: "شهر",
    points: "1000 نقطة ذهبية",
    details: [
      "مدة صلاحية الباقة: 30 يوم",
      "نظام صلاحية ثابت",
      "إمكانية متابعة الطلب عبر نظام Zetime",
      "قيمة سماح صيانة إضافية في حالة عدم الوصول للهدف",
    ],
  },
  {
    id: 2,
    price: "550",
    duration: "شهر",
    points: "1000 نقطة ذهبية",
    details: [
      "مدة صلاحية الباقة: 30 يوم",
      "نظام صلاحية ثابت",
      "إمكانية متابعة الطلب عبر نظام Zetime",
      "قيمة سماح صيانة إضافية في حالة عدم الوصول للهدف",
    ],
  },
  {
    id: 3,
    price: "550",
    duration: "شهر",
    points: "1000 نقطة ذهبية",
    details: [
      "مدة صلاحية الباقة: 30 يوم",
      "نظام صلاحية ثابت",
      "إمكانية متابعة الطلب عبر نظام Zetime",
      "قيمة سماح صيانة إضافية في حالة عدم الوصول للهدف",
    ],
  },
  {
    id: 4,
    price: "550",
    duration: "شهر",
    points: "1000 نقطة ذهبية",
    details: [
      "مدة صلاحية الباقة: 30 يوم",
      "نظام صلاحية ثابت",
      "إمكانية متابعة الطلب عبر نظام Zetime",
      "قيمة سماح صيانة إضافية في حالة عدم الوصول للهدف",
    ],
  },
];

 const [current, setCurrent] = useState(0);
  const visibleCards = 3;

  return (
    <MainLayout>

      <section className='mb-12.5'>
        <p className='text-[#0F022E] text-2xl font-medium'>{t('Choose your subscription period')}</p>
        <p className='text-[#697586] text-xl font-normal mt-4'>{t('Professional to suit you anytime')}</p>
      </section>  
      <div className='flex justify-center mb-6'>
        <p className=''>{t('Choose the type of subscription?')}</p>
      </div>

      <section className="flex flex-col items-center gap-6">
      {/* خيارات الاشتراك */}
      <div className="bg-[#EEF2F6] w-fit p-2 rounded-[6px]">
        <div className="flex gap-3">
          {periods.map((period) => (
            <div
              key={period.id}
              onClick={() => setSelected(period.id)}
              className={`cursor-pointer py-3 px-2 w-28.5 h-12.5 flex justify-center items-center rounded-[6px] transition-all
                ${
                  selected === period.id
                    ? "bg-[var(--color-primary)] text-white"
                    : "text-[#697586] bg-transparent hover:bg-[#DCE4F2]"
                }`}
            >
              <p className="text-lg font-medium">{period.label}</p>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <section className="relative w-full max-w-6xl mx-auto mt-10 overflow-hidden mb-8">
          {/* Cards Container */}
          <div
            className="flex transition-transform duration-500 ease-in-out "
            style={{ transform: `translateX(${current * (100 / visibleCards)}%)` }}
          >
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="min-w-[33.33333%] px-4 mt-8"
              >
                <div className="bg-white rounded-[6px] border border-[#E3E8EF]  hover:border-[#D4AF37] hover:bg-[#FCFCFD]  hover:-translate-y-2  hover:h-[400px]  transition py-6 px-5 text-center">
                  {/* price */}
                  <div className='flex justify-center'>
                    <div className="bg-[#FEF0C7] text-base w-fit p-3 rounded-[20px]">
                      <span className='text-[#364152] font-medium'>{plan.price}جنية</span>
                      <span className="text-[#4B5565] font-normal">/ {periods.find((p) => p.id === selected)?.label}</span>
                    </div>
                  </div>

                  {/* points */}
                  <div className="text-[var(--color-primary)] text-base font-medium my-4">
                    {t('Number of points')} : {plan.points} 
                  </div>

                  <ul className="text-[#364152] text-sm text-right space-y-2 mb-6">
                    {plan.details.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 mb-5">
                        {/* ✅  */}
                        <img src="/images/verify.svg" alt="" className='w-5 h-5'/>
                        <p className='text-[#4B5565] text-sm font-normal'>{item}</p>
                      </li>
                    ))}
                  </ul>
                  

                  <button className="bg-[var(--color-primary)] hover:bg-[#B78A28] text-white py-2.5 px-4 rounded-[6px] w-full cursor-pointer">
                    {t('View details')}
                  </button>



                </div>
              </div>
            ))}
          </div>


          {/* Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {plans.slice(0, plans.length - visibleCards + 1).map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer ${
                  current === index ? "bg-[#B78A28]" : "bg-[#E3E8EF]"
                }`}
              ></div>
            ))}
          </div>
        </section>
      )}
    </section>
    </MainLayout>
  )
}

export default SelectSubscriptionDurationPage
