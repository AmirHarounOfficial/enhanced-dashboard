"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function NotesPage() {
  const {t} = useTranslation()

    const noteOne = [
    {id:1 , title:t('Supervisor review (24-48 hours)')},
    {id:2 , title:t('Email notification with status')},
    {id:3 , title:t('Ownership is activated after approval')},
  ]
  return (
    <>
    <div className='flex gap-6'>

      {/*note1*/}
      <div className='border border-[#48A1FF] bg-[#EFF6FF] rounded-[6px] p-3 mt-4 w-full'>
        <div className='flex gap-2'>
          <img src="/images/icons/i_blue.svg" alt="" />
          <p className='text-[#364152] text-base font-medium'>{t('What will happen next?')}</p>
        </div>
          
        <div className='flex flex-col gap-2 mt-4'>
          {noteOne?.map((items,index)=>(
          <div key={items?.id} className='flex gap-1 w-[95%]  '>
            <img src="/images/icons/true.svg" className="w-6 h-6 " />
            <p className='text-[#4B5565] text-sm font-normal  '>{items?.title}</p>
          </div>
        ))}
        </div>


      </div>
      

      {/* note2 */}
      <div className='border border-[#75E0A7] bg-[#ECFDF3] rounded-[6px] p-3 mt-4 w-full h-fit'>
        <div className='flex gap-2'>
          <p className='flex items-center'>
            <img src="/images/icons/true_green.svg" className="w-4 h-4 " />
          </p>
          
          <p className='text-[#364152] text-base font-medium'>{t('Ready to apply')}</p>
        </div>
          
        <div className=' my-4'>
          <p className='text-[#4B5565] text-sm font-normal'>{t('All the required information has been provided. Your property will be reviewed within 24-48 hours.')}</p>
        </div>


      </div>

    </div>

    </>
  )
}

export default NotesPage
