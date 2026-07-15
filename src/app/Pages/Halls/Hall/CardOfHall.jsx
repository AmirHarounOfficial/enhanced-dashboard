"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux';
import { dublicateHallThunk, getHallsThunk } from '@/redux/slice/Halls/HallsSlice';
import { IMAGE_BASE_URL } from '../../../../../config/imageUrl';

function CardOfHall({ halls }) {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [selectedHall, setSelectedHall] = useState(null);

  const toggleMenu = (id) => setOpenMenuIndex(prev => prev === id ? null : id);

  const handleDuplicate = (hallId) => {
    dispatch(dublicateHallThunk({ hall_id: hallId }))
      .unwrap()
      .then(() => dispatch(getHallsThunk()))
      .catch((err) => console.error("Failed to duplicate hall:", err));
  };

  const StatusBadge = ({ status }) => (
    status === 1 ? (
      <span className="inline-flex items-center gap-1 bg-white border border-[#17B26A] text-[#067647] text-xs font-medium h-7 px-2.5 rounded-full">
        <img src="/images/icons/true_green.svg" alt="" className="w-3.5 h-3.5" />
        {t('active')}
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] text-xs font-medium h-7 px-2.5 rounded-full">
        <img src="/images/icons/refused Status.svg" alt="" className="w-3.5 h-3.5" />
        {t('closed')}
      </span>
    )
  );

  return (
    <div className="grid grid-cols-1 lg1:grid-cols-2 gap-4">
      {halls?.data?.map((hall) => (
        <div
          key={hall?.id}
          className={"relative cursor-pointer rounded-[8px] p-3 grid grid-cols-4 gap-4 border transition-shadow duration-200 " + (
            selectedHall === hall?.id
              ? "border-[var(--color-primary)] shadow-[0_0_0_2px_var(--color-primary)]"
              : "border-[#E3E8EF] hover:shadow-md hover:border-[var(--color-primary)]/40"
          )}
        >
          {/* Image */}
          <div className="rounded-[6px] overflow-hidden">
            <img src={IMAGE_BASE_URL + hall?.image} className="w-full h-full object-cover" alt="" />
          </div>

          <div className="col-span-3">
            <div className="flex justify-between items-center mb-2">
              <p
                onClick={() => {
                  router.push("/Pages/Halls/Tables?hall_id=" + hall?.id);
                  setSelectedHall(hall?.id);
                }}
                className="text-[#364152] text-base font-semibold hover:text-[var(--color-primary)] transition-colors duration-150"
              >
                {hall?.name}
              </p>
              <div className="relative">
                <button
                  onClick={() => toggleMenu(hall?.id)}
                  className="bg-[#F8FAFC] border border-[#E3E8EF] w-7 h-7 rounded-full flex items-center justify-center cursor-pointer
                             transition-colors duration-150 hover:bg-[#E3E8EF]"
                >
                  <img src="/images/icons/dots.svg" alt="" />
                </button>

                {openMenuIndex === hall?.id && (
                  <div className="absolute top-9 left-0 p-2 w-44 shadow-md rounded-[8px] bg-white border border-[#E3E8EF] z-10">
                    <button
                      onClick={() => router.push("/Pages/Halls/Views?id=" + hall?.id)}
                      className="w-full flex gap-2 items-center p-2 rounded-[6px] cursor-pointer transition-colors duration-150 hover:bg-[#F8FAFC] text-sm text-[#364152]"
                    >
                      <img src="/images/icons/eye_black.svg" className="w-4 h-4" alt="" />
                      {t('views')}
                    </button>
                    <button
                      onClick={() => router.push("/Pages/Halls/Views/Layout?id=" + hall?.id)}
                      className="w-full flex gap-2 items-center p-2 rounded-[6px] cursor-pointer transition-colors duration-150 hover:bg-[#F8FAFC] text-sm text-[#364152]"
                    >
                      <img src="/images/icons/restaurant-black.svg" className="w-4 h-4" alt="" />
                      {t('Hall organization')}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center mb-3">
              <p className="text-[#697586] text-sm">{hall?.tables_count} {t('tables')}</p>
              <StatusBadge status={hall?.status} />
            </div>

            <div className="flex gap-2">
              {[
                { icon: '/images/icons/copy_yellow.svg',         label: 'copies',       onClick: () => handleDuplicate(hall?.id) },
                { icon: '/images/icons/EditYellow.svg',          label: 'modification', onClick: () => router.push("/Pages/Halls/Hall/Edit?id=" + hall?.id) },
                { icon: hall?.status ? '/images/icons/shut-down.svg' : '/images/icons/checkmark-circle-true.svg',
                  label: hall?.status ? 'closing' : 'reactivation', onClick: () => {} },
              ].map(({ icon, label, onClick }) => (
                <button
                  key={label}
                  onClick={onClick}
                  className="flex items-center justify-center gap-1 rounded-[6px] border border-[#E3E8EF] px-2 h-10 w-full cursor-pointer
                             transition-colors duration-150 hover:bg-[#F8FAFC] hover:border-[#697586] text-sm text-[#364152]"
                >
                  <img src={icon} className="w-4 h-4" alt="" />
                  {t(label)}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CardOfHall
