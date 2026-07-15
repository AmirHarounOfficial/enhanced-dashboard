"use client";
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
// import Chart from "react-apexcharts";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


function AnalysisPage({handleClose ,serviceAnalysis}) {
  const {t} = useTranslation()



 const cards = [
    {
      id: 1,
      title: t("earnings"),
      value: serviceAnalysis?.weekly_comparison?.earnings?.percent_change,
      amount: `${serviceAnalysis?.earnings}K`,
      iconBg: "#B4F0CC",
      iconSrc: "/images/icons/earnings.svg",
    },
    {
      id: 2,
      title: t("Reservations"),
      value: serviceAnalysis?.weekly_comparison?.bookings?.percent_change,
      amount: serviceAnalysis?.bookings_count,
      iconBg: "#FEF0C7",
      iconSrc: "/images/icons/Reservations.svg",
    },
    {
      id: 3,
      title: t("Views"),
      value: serviceAnalysis?.weekly_comparison?.views?.percent_change,
      amount: `${serviceAnalysis?.views}K`,
      iconBg: "#CEE8FF",
      iconSrc: "/images/icons/Views.svg",
    },
    {
      id: 4,
      title: t("Users"),
      value: serviceAnalysis?.weekly_comparison?.users?.percent_change,
      amount: `${serviceAnalysis?.users}K`,
      iconBg: "#FEF3F2",
      iconSrc: "/images/icons/Users.svg",
    },
  ];

  const [chartOptions] = useState({
    chart: {
      id: "stacked-bar",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    grid: {
      borderColor: "#f1f1f1",
      strokeDashArray: 4,
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => `${val}K`,
        style: {
          fontSize: "14px",
          fontWeight: 500,
        },
      },
    },
    fill: {
      opacity: 1,
      colors: ["#C69815", "#946DF1"],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
      markers: {
        radius: 12,
      },
      labels: {
        colors: "#000",
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "40%",
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}K`,
      },
    },
  });

  const [seriesData] = useState([
    {
      name: "الدفع بالكارت",
      data: [70, 40, 30, 80, 160, 50, 30],
    },
    {
      name: "الدفع النقدي",
      data: [40, 60, 40, 50, 29, 30, 40],
    },
  ]);


  return (
    <>
    {/* cards */}
    <div className="grid grid-cols-2 gap-4 px-6 mt-8">
      {cards.map((item) => {
        const value = item.value ?? 0;
        const isPositive = value > 0;
        const isNegative = value < 0;
        const isNeutral = value === 0;

        return (
          <section key={item.id} className="border border-[#E3E8EF] p-3">
            {/* Header */}
            <div className="flex gap-1.5 mb-2.5">
              <p
                className="w-8 h-8 flex justify-center items-center rounded-[6.211px]"
                style={{ backgroundColor: item.iconBg }}
              >
                <img src={item.iconSrc} alt="" />
              </p>
              <p className="text-[#313131] text-base font-medium flex items-center">
                {item.title}
              </p>
            </div>

            {/* Main value */}
            <p className="text-[#202939] text-base font-semibold mb-2.5">
              {item.amount}
            </p>

            {/* Comparison */}
            <div className="flex gap-1">
              <p className="text-[#697586] text-sm font-light">
                {t("From last week")}
              </p>
              <div className="flex gap-1 items-center">
                <p
                  className={`flex text-sm font-medium ${
                    isPositive
                      ? "text-[#17B26A]"
                      : isNegative
                      ? "text-[#F04438]"
                      : "text-[#98A2B3]" // neutral gray if value = 0
                  }`}
                >
                  <span>%</span>
                  <span>{Math.abs(value)}</span>
                </p>

                {/* arrow */}
                {!isNeutral && (
                  <img
                    src={
                      isPositive
                        ? "/images/icons/upArrow green.svg"
                        : "/images/icons/downArrow red.svg"
                    }
                    alt=""
                  />
                )}
              </div>
            </div>
          </section>
        );
      })}
    </div>






    {/* chart */}
      <div className='px-6'>
        <div className='p-4 border border-[#E3E8EF] my-6'>
          <div className='flex gap-1.5 mb-3'>
            <p className='bg-[#ECFDF3] w-8 h-8 flex justify-center items-center rounded-[6.211px]'>
              <img src="/images/icons/earnings.svg" alt="" />
            </p>
            <p className='text-[#313131] text-base font-medium flex items-center'>{t('Sales')}</p>
          </div>


          <div className="p-4 ">
            <Chart
              options={chartOptions}
              series={seriesData}
              type="bar"
              width="100%"
              height={300}
            />
          </div>

        </div>

      </div>






    <div className="w-full h-px bg-[#CDD5DF] "></div>
    {/* btns */}
    <div className='px-6 my-5'>
      <button onClick={handleClose} className='border border-[#C69815] text-[#C69815] h-11 w-40 rounded-[6px] text-base font-medium'>
        {t('cancel')}
      </button>
    </div>

    </>
  )
}

export default AnalysisPage


