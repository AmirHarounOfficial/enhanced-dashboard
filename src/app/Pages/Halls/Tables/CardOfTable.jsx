'use client'
import React, { useState } from 'react'
import { IMAGE_BASE_URL } from '../../../../../config/imageUrl';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { DeleteTableThunk, getTablesThunk } from '@/redux/slice/Halls/HallsSlice';

function CardOfTable({getTables, HallId}) {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()

  const handleDelete = async (tableId) => {
    const result = await dispatch(DeleteTableThunk(tableId))
    if (!result.error) {
      dispatch(getTablesThunk(HallId))
    }
  }

  const actionBtn = 'flex items-center justify-center gap-1.5 rounded-[6px] border border-[#E3E8EF] px-2 h-10 w-full cursor-pointer transition-colors duration-150 hover:bg-[#F8FAFC] text-[#364152] text-sm'

  return (
    <>
      <div className='grid grid-cols-1 lg1:grid-cols-2 gap-4'>
        {getTables?.data?.tables?.map((table, index) => (
          <div
            key={table?.id}
            className='bg-white border border-[#E3E8EF] rounded-[8px] p-4 shadow-sm hover:shadow-md transition-shadow duration-200'
          >
            <div className='grid grid-cols-4 gap-4'>
              <div className='bg-[#C69815]/15 text-[#C69815] flex justify-center items-center rounded-[6px] text-2xl font-semibold h-full min-h-[60px]'>
                {table?.code}
              </div>

              <div className='col-span-3'>
                <div className='flex justify-between items-start'>
                  <div className='flex flex-col gap-2'>
                    <p className='text-[#364152] text-base font-semibold'>{table?.views?.[0]?.name ?? 'Not Found'}</p>
                    <span className='inline-flex items-center gap-1 border border-[#E3E8EF] bg-[#F8FAFC] px-2 py-1 rounded-full w-fit'>
                      <img src="/images/icons/user-group_grey.svg" className="w-3.5 h-3.5" />
                      <span className='text-[#697586] text-sm'>{table?.capacity}</span>
                    </span>
                  </div>
                  <div className='flex flex-col gap-1.5 items-end'>
                    {table?.is_bookable ? (
                      <span className='inline-flex items-center gap-1 text-xs font-medium h-7 px-2.5 rounded-2xl border bg-[#DCFAE6] border-[#067647] text-[#067647]'>
                        <img src="/images/icons/true.svg" alt="" className='w-3 h-3' />
                        {t('Available for booking')}
                      </span>
                    ) : (
                      <span className='inline-flex items-center gap-1 text-xs font-medium h-7 px-2.5 rounded-2xl border bg-[#FEE4E2] border-[#F97066] text-[#D92D20]'>
                        <img src="/images/icons/xxx.svg" alt="" className='w-3 h-3' />
                        {t('Not available for booking')}
                      </span>
                    )}
                    {table?.is_active ? (
                      <span className='inline-flex items-center gap-1 text-xs font-medium h-7 px-2.5 rounded-2xl border bg-[#DCFAE6] border-[#067647] text-[#067647]'>
                        {t('active')}
                      </span>
                    ) : (
                      <span className='inline-flex items-center gap-1 text-xs font-medium h-7 px-2.5 rounded-2xl border bg-[#FEE4E2] border-[#F97066] text-[#D92D20]'>
                        {t('closed')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <hr className='border-[#E3E8EF] my-3' />

            <div className='grid grid-cols-3 gap-3'>
              <button onClick={() => router.push(`/Pages/Halls/Tables/Edit?id=${table?.id}&hall_id=${HallId}`)} className={actionBtn}>
                <img src="/images/icons/EditYellow.svg" className='w-4 h-4' alt="" />
                {t('modification')}
              </button>
              {table?.is_active ? (
                <button className={actionBtn}>
                  <img src="/images/icons/shut-down.svg" className='w-4 h-4' alt="" />
                  {t('closing')}
                </button>
              ) : (
                <button className={actionBtn}>
                  <img src="/images/icons/checkmark-circle-true.svg" className='w-4 h-4' alt="" />
                  {t('reactivation')}
                </button>
              )}
              <button onClick={() => handleDelete(table?.id)} className='flex items-center justify-center gap-1.5 rounded-[6px] border border-[#FEE4E2] px-2 h-10 w-full cursor-pointer transition-colors duration-150 hover:bg-[#FEE4E2] text-[#D92D20] text-sm'>
                <img src="/images/icons/delete-darkRed.svg" className='w-4 h-4' alt="" />
                {t('delete')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default CardOfTable
