"use client";
import React from 'react'
import { useTranslation } from 'react-i18next';

function BoxPage({ analysisProperties }) {
  const { t } = useTranslation();
  const d = analysisProperties?.data;

  const cards = [
    {
      icon: '/images/icons/Access operations.svg',
      bg: '#DCFAE6',
      iconShadow: 'shadow-[0_2px_6px_rgb(6_118_71_/_0.15)]',
      tagClass: 'text-[#067647] bg-[#DCFAE6] border border-[#ABEFC6]',
      dotColor: 'bg-[#067647]',
      tag: t('Today'),
      label: t('Access operations'),
      value: d?.check_ins_today,
    },
    {
      icon: '/images/icons/Departure.svg',
      bg: '#FEF3F2',
      iconShadow: 'shadow-[0_2px_6px_rgb(240_68_56_/_0.15)]',
      tagClass: 'text-[#F04438] bg-[#FEF3F2] border border-[#FEE4E2]',
      dotColor: 'bg-[#F04438]',
      tag: t('Today'),
      label: t('Departure'),
      value: d?.check_outs_today,
    },
    {
      icon: '/images/icons/clock_orange.svg',
      bg: '#FEF0C7',
      iconShadow: 'shadow-[0_2px_6px_rgb(198_152_21_/_0.18)]',
      tagClass: 'text-[#C69815] bg-[#FEF0C7] border border-[#F5D469]',
      dotColor: 'bg-[#C69815]',
      tag: t('Pending'),
      label: t('Pending'),
      value: d?.pending_bookings,
    },
    {
      icon: '/images/icons/user-group_blue.svg',
      bg: '#FEF0C7',
      iconShadow: 'shadow-[0_2px_6px_rgb(198_152_21_/_0.18)]',
      tagClass: 'text-[#C69815] bg-[#FEF0C7] border border-[#F5D469]',
      dotColor: 'bg-[#C69815]',
      tag: t('Active'),
      label: t('Continuous stays'),
      value: d?.ongoing_vacancies,
    },
  ];

  return (
    <section className="mb-10 grid grid-cols-2 lg1:grid-cols-4 gap-4 stagger-children">
      {cards.map((card, i) => (
        <div key={i} className="stat-card card-warm border border-[#E3E8EF] rounded-[12px] p-5 flex flex-col gap-4 cursor-default">
          <div className="flex items-center justify-between">
            <span
              className={`w-11 h-11 flex justify-center items-center rounded-[10px] flex-shrink-0 ${card.iconShadow}`}
              style={{ background: card.bg }}
            >
              <img src={card.icon} alt="" className="w-5 h-5" />
            </span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${card.tagClass}`}>
              {card.tag}
            </span>
          </div>
          <div>
            <p className="kpi-value counter-enter">{card.value ?? 0}</p>
            <p className="text-[#697586] text-sm font-normal mt-1.5">{card.label}</p>
          </div>
          <p className="text-[#9AA4B2] text-xs border-t border-[#F3F4F6] pt-2.5 flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full inline-block ${card.dotColor}`}></span>
            {card.label}
          </p>
        </div>
      ))}
    </section>
  );
}

export default BoxPage;
