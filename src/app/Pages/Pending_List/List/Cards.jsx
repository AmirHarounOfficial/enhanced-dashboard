"use client"
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SendNotificationPage from '../SendNotification/page';
import DelayPage from '../Delay/page';
import SendOtpPage from '../SendOtp/page';
import { useDispatch } from 'react-redux';
import { arrivedWaitlistThunk } from '@/redux/slice/Pending_List/Pending_ListSlice';
import { toast } from 'react-toastify';

const statusColors = {
  pending:   'bg-[#FFFAEB] border-[#F79009] text-[#DC6803]',
  confirmed: 'bg-[#DCFAE6] border-[#067647] text-[#067647]',
  seated:    'bg-[#EFF4FF] border-[#518BFF] text-[#004EEB]',
  completed: 'bg-[#DCFAE6] border-[#067647] text-[#067647]',
  cancelled: 'bg-[#FEE4E2] border-[#F97066] text-[#D92D20]',
  no_show:   'bg-[#E3E8EF] border-[#697586] text-[#4B5565]',
  arrived:   'bg-[#DCFAE6] border-[#067647] text-[#067647]',
  rejected:  'bg-[#FEE4E2] border-[#F97066] text-[#D92D20]',
};

function Cards({ activeTab, getWaitingList, refresh }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [loadingId, setLoadingId] = useState(null)
  const [openNotification, setOpenNotification] = useState(false)
  const [openDelay, setOpenDelay] = useState(false)
  const [openOtp, setOpenOtp] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [selectedDetails, setSelectedDetails] = useState(null)

  const handleArrived = async (id) => {
    try {
      setLoadingId(id)
      await dispatch(arrivedWaitlistThunk({ reservation_id: id })).unwrap()
      toast.success(t('Guest marked as arrived'))
      if (refresh) refresh()
    } catch (error) {
      console.error(error)
      toast.error(error?.message || t('Failed to mark guest as arrived'))
    } finally {
      setLoadingId(null)
    }
  }

  const actionBtn = 'flex items-center justify-center gap-1 rounded-[6px] border border-[#E3E8EF] px-2 h-10 w-full cursor-pointer transition-colors duration-150 hover:bg-[#F8FAFC] hover:border-[#697586] text-[#364152] text-sm'

  return (
    <>
      <div className="grid grid-cols-2 gap-4 my-6">
        {getWaitingList?.data?.map((items) => (
          <div key={items?.id} className="bg-white border border-[#E3E8EF] rounded-[8px] p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <div className="bg-[#C69815]/15 text-[#C69815] text-sm font-semibold w-12 h-10 rounded-[6px] flex justify-center items-center">
                  {items?.table?.code ?? '###'}
                </div>
                <p className="text-[#364152] text-base font-semibold">{items?.guest_name}</p>
              </div>
              <span className={"inline-flex items-center h-7 px-2.5 rounded-2xl border text-xs font-medium " + (statusColors[items?.status] ?? 'bg-[#FFFAEB] border-[#F79009] text-[#DC6803]')}>
                {items?.status}
              </span>
            </div>

            <div className="flex gap-4 mb-3">
              <div className="flex gap-1.5 items-center">
                <img src="/images/icons/user-group_grey.svg" alt="" className="w-4 h-4" />
                <span className="text-[#697586] text-sm">{items?.guest_count} {t('guests')}</span>
              </div>
              <p className="text-[#697586] text-sm">{items?.selected_view?.name}</p>
            </div>

            {items?.notes && (
              <div className="flex gap-2 items-start mb-3">
                <img src="/images/icons/comment-gray.svg" alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p className="text-[#697586] text-sm break-words">{items?.notes}</p>
              </div>
            )}

            <div className="mt-3 mb-4 flex justify-between text-sm">
              <p>
                <span className="text-[#697586]">{t('Log in')}: </span>
                <span className="text-[#364152] font-medium">
                  {items?.checked_in_at === null
                    ? t('Not yet determined')
                    : new Date(items.checked_in_at).toLocaleTimeString("ar-EG", { hour: "numeric", minute: "2-digit", hour12: true })}
                </span>
              </p>
              <p>
                <span className="text-[#697586]">{t('Expected arrival')}: </span>
                <span className="text-[#364152] font-medium">
                  {items?.start_time
                    ? new Date("2000-01-01T" + items.start_time).toLocaleTimeString("ar-EG", { hour: "numeric", minute: "2-digit", hour12: true })
                    : "-"}
                </span>
              </p>
            </div>

            <hr className="border-[#E3E8EF] mb-4" />

            <div className="flex gap-2">
              <button
                onClick={() => { setOpenNotification(true); setSelectedId(items?.id); setSelectedDetails(items) }}
                className={actionBtn}
              >
                {t('notice')}
              </button>

              {items?.status === 'arrived' ? (
                <button
                  onClick={() => { setSelectedId(items?.id); setSelectedDetails(items); setOpenOtp(true) }}
                  className={actionBtn}
                >
                  {t('Seating')}
                </button>
              ) : (
                <button
                  onClick={() => handleArrived(items?.id)}
                  disabled={loadingId === items?.id}
                  className={actionBtn + ' disabled:opacity-50'}
                >
                  {loadingId === items?.id ? t('loading...') : t('arrived')}
                </button>
              )}

              <button
                onClick={() => { setOpenDelay(true); setSelectedId(items?.id); setSelectedDetails(items) }}
                className={actionBtn}
              >
                {t('delay')}
              </button>
            </div>
          </div>
        ))}
      </div>

      <SendNotificationPage open={openNotification} setOpen={setOpenNotification} guestID={selectedId} guestDetails={selectedDetails} />
      <DelayPage open={openDelay} setOpen={setOpenDelay} guestID={selectedId} guestDetails={selectedDetails} />
      <SendOtpPage open={openOtp} setOpen={setOpenOtp} guestID={selectedId} guestDetails={selectedDetails} refresh={refresh} />
    </>
  );
}

export default Cards;


