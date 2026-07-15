'use client'
import { Dialog } from '@mui/material'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Form from './Form'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoriesThunk } from '@/redux/slice/Menus/MenusSlice'

function Edit_ItemsPage({open , setOpen}) {
  const {t} = useTranslation()

  //api
  const dispatch = useDispatch()
  const {getCategories} = useSelector((state)=>state.Menus)
  useEffect(()=>{
    dispatch(getCategoriesThunk())
  },[dispatch])

  return (
    <>

      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ className: "rerquest-dialog" }}
      >
        {/* header */}
        <section className="flex justify-end px-6 mt-6">
          <button
            onClick={()=>setOpen(false)}
            className="border border-[#E3E8EF] w-12 h-12 rounded-[100px] flex justify-center items-center cursor-pointer"
          >
            <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
          </button>
        </section>
        <section className="mt-4 px-6">
          <p className="text-[#364152] text-2xl font-medium mb-3">{t("Modify category")}</p>
          <p className="text-[#697586] text-xl font-normal mb-5">
            {t("Edit item data to display it more clearly")}
          </p>
        </section>
        <span className="border-[0.5px] border-[#E3E8EF]" />
  
        
        <div className='p-6'>
          <Form  getCategories={getCategories}/>
        </div>
  
        <span className="border-[0.5px] border-[#E3E8EF] my-5" />
  
        {/* btn */}
        <div className='px-6 flex gap-4 mb-6'>
          <button  className=' w-[40%] bg-[var(--color-primary)] text-white text-base font-medium py-3 px-6 rounded-[6px]  cursor-pointer'>
            {t('Preserving the item')}
          </button>
          <button onClick={()=>setOpen(false)} className='w-[20%] border border-[var(--color-primary)] text-[var(--color-primary)] text-base font-medium py-3 px-6 rounded-[6px]  cursor-pointer'>
            {t('cancel')}
          </button>
          
        </div>
        
    </Dialog>
    


    </>
  )
}

export default Edit_ItemsPage

