"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function SeatingDetails({getScanWaitlist}) {
  const {t} = useTranslation()
  const getScanWaitlistData = getScanWaitlist?.data

  
  return (
    <>

  <div className='bg-white border border-[#E3E8EF] shadow-sm hover:shadow-md transition-shadow duration-200 p-4'>
        <p className='flex gap-1'>
          <img src="/images/icons/restaurant-yellow.svg" alt="" />
          <span className='text-[#364152] text-xl font-medium'>{t('Seating details')}</span>
        </p>

        <div className='mt-6 grid grid-cols-2 gap-6'>
          {/* The hall */}
          <div className='font-normal'>
            <p className='text-[#697586] text-base'>{t('The hall')}</p>
            <p className='text-[#364152] text-lg'>{getScanWaitlistData?.hall?.name} </p>
          </div>
          {/* The view */}
          <div className='font-normal '>
            <p className='text-[#697586] text-base'>{t('Table number')}</p>
            <p className='text-[#364152] text-lg'>{getScanWaitlistData?.hall?.code}</p>
          </div>
          {/* The table */}
          <div className='font-normal'>
            <p className='text-[#697586] text-base'>{t('The view')}</p>
            <p className='text-[#364152] text-lg'>  {getScanWaitlistData?.selected_view?.name} </p>
          </div>

          
        </div>

        {/* Special Notes  */}
        <div className='mt-4'>
          <p className='text-[#697586] text-base mb-1'>{t('Special Notes')}</p>
          <div className='flex gap-4'>
            {getScanWaitlistData?.table?.tags?.map((item , index)=>(
              <p key={index} className='bg-[#FEF0C7] border border-[#E2E2E2] w-fit h-10 px-3 rounded-full flex  items-center'>
                <span className='text-[#505050]'> {item} </span>
              </p>

            ))}
          
          </div>
          
        </div>
      </div>

    </>
  )
}

export default SeatingDetails
