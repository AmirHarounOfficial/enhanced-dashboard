"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import DeleteDialog from './Dialog/DeleteDialog';

function Content({onEdit , onAdd}) {
  const {t} = useTranslation()
  const status = "approved";

  const StatusRender = (Status) => {
    switch (Status) {
      case "approved": // مقبولة 
        return (
          <div className=' bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit  h-8 rounded-3xl'>
          <div className='p-1.5 flex items-center  gap-1'>
            <img src="/images/icons/Active Status.svg" alt="" className='w-4 h-4 ' />
            <span className='text-xs'>{t('Acceptable')}</span>
          </div>
        </div>
        );
      case "pending":// قيد المراجعة
        return (
          <div className=' bg-[#EFF4FF] border border-[#518BFF] text-[#004EEB] w-fit  h-8 rounded-3xl'>
          <div className='p-1.5 flex items-center gap-1'>
            <img src="/images/icons/Under review.svg" alt="" className='w-4 h-4 ' />
              <span className='text-xs'>{t('Under review')}</span>
          </div>
        </div>
        );
      case "rejected": // مرفوضة
        return (
          <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit h-8 rounded-3xl'>
            <div className='p-1.5 flex items-center gap-1'>
              <img src="/images/icons/refused Status.svg" alt="" className=' w-4 h-4'/>
              <span className='text-xs'>{t('rejected')}</span>
            </div>
          </div>
        );
    }
  };
  const [open , setOpen] = useState(false)
  return (
    <>
    <div className=' grid grid-cols-1 lg1:grid-cols-2 gap-6 '>
        
          <div className='shadow-sm ' >
          <div className='p-4'>
            <div className='flex justify-between gap-2 w-full'>
              <p className='text-[#121926] text-base font-medium w-[65%]'>تم تحديث اسم السياسة</p>
              <div className='w-[35%] flex justify-end'>{StatusRender(status)}</div>
            </div>
            <div 
              className='text-[#697586] text-sm font-normal my-4'
              dangerouslySetInnerHTML={{ __html: 'يمكنك استبدال هذا النص, يمكنك استبدال هذا النص, يمكنك استبدال هذا النص, يمكنك استبدال هذا النص' }}
            />

            <div className=' text-base font-normal w-full flex gap-4'>
              <button 
                onClick={() => onEdit && onEdit(1)}
                className='bg-[var(--color-primary)] text-white w-full h-14 rounded-[6px] cursor-pointer'>
                {t('modification')}
              </button>
              <button
                onClick={()=>setOpen(true)}
                className='border border-[#DA5305] text-[#DA5305] w-full h-14 rounded-[6px] cursor-pointer'>
                {t('delete')}
              </button>
            </div>
          </div>
          </div>
      
        

      

      </div>
      <button 
        onClick={onAdd}
        className='bg-[var(--color-primary)] rounded-[6px] mt-12 mb-4 cursor-pointer text-white flex items-center justify-center gap-2 w-[25%] h-14 '
      >
        <span className='text-base font-semibold'>{t('Add policy')}</span>
        <img src="/images/icons/AddIcon.svg" alt="" />
      </button>

      <DeleteDialog
        open={open}
        setOpen={setOpen}
      />
    </>
  )
}

export default Content


