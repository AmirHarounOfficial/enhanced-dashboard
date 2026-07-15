"use client"
import React from 'react'
import { useTranslation } from 'react-i18next';
import { IMAGE_BASE_URL } from '../../../../../../../config/imageUrl';
import { useRouter } from 'next/navigation';

const statusConfig = {
  active:   { bg: 'bg-[#DCFAE6]', border: 'border-[#067647]', text: 'text-[#067647]', icon: '/images/icons/Active Status.svg',        labelKey: 'active' },
  inactive: { bg: 'bg-[#FEE4E2]', border: 'border-[#F97066]', text: 'text-[#D92D20]', icon: '/images/icons/remove-circle-red.svg',    labelKey: 'inactive' },
};

function Cardspage({ topProperties }) {
  const { t } = useTranslation();
  const router = useRouter();

  const StatusBadge = ({ status }) => {
    const cfg = statusConfig[status];
    if (!cfg) return null;
    return (
      <span className={"inline-flex items-center gap-1.5 text-xs font-medium h-7 px-2.5 rounded-2xl border " + cfg.bg + " " + cfg.border + " " + cfg.text}>
        <img src={cfg.icon} alt="" className="w-3.5 h-3.5" />
        {t(cfg.labelKey)}
      </span>
    );
  };

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <p className="text-[#364152] text-base font-semibold">{t('My properties')}</p>
        <button
          onClick={() => router.push('/Pages/Services/Property_Module/Service')}
          className="text-[var(--color-primary)] text-sm font-medium cursor-pointer transition-opacity duration-150 hover:opacity-75"
        >
          {t('More')}
        </button>
      </div>

      <div className="mb-10 flex gap-4 overflow-x-auto pb-2">
        {topProperties?.map((property, index) => (
          <div
            key={index}
            className="w-[320px] bg-white border border-[#E3E8EF] rounded-[8px] overflow-hidden flex-shrink-0
                       transition-shadow duration-200 hover:shadow-md"
          >
            <div className="relative w-full">
              <img
                src={IMAGE_BASE_URL + property?.primary_image}
                alt={property?.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2">
                <StatusBadge status={property?.status} />
              </div>
            </div>

            <div className="p-3">
              <p className="text-[#364152] text-sm font-semibold mb-1">{property?.name}</p>
              <div className="flex gap-1.5 items-start mb-3">
                <img src="/images/icons/location-gray.svg" alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p className="text-[#697586] text-xs">{property?.address}</p>
              </div>

              {property?.status === 'active' && (
                <button
                  onClick={() => router.push("/Pages/Services/Property_Module/Service/Calendar?id=" + property?.id)}
                  className="flex gap-1.5 items-center cursor-pointer group"
                >
                  <img src="/images/icons/calendar-yellow.svg" alt="" className="w-4 h-4" />
                  <p className="text-[var(--color-primary)] text-xs font-medium transition-opacity duration-150 group-hover:opacity-75">
                    {t('Calendar view')}
                  </p>
                </button>
              )}

              {property?.status === 'inactive' && (
                <button
                  onClick={() => router.push("/Pages/Services/Property_Module/Service/Edit?id=" + property?.id)}
                  className="flex gap-1.5 items-center cursor-pointer group"
                >
                  <img src="/images/icons/EditYellow.svg" className="w-4 h-4" />
                  <p className="text-[var(--color-primary)] text-xs font-medium transition-opacity duration-150 group-hover:opacity-75">
                    {t('modification')}
                  </p>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Cardspage
