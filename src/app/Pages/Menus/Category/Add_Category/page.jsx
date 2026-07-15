'use client'
import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Form from './Form'
import { useDispatch } from 'react-redux'
import { addCategoryThunk } from '@/redux/slice/Menus/MenusSlice'

function Add_CategoryPage({open , setOpen}) {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
      name: {
        ar: "",
        en: "",
      },
      description: {
        ar: "",
        en: "",
      },
      status: 1,
      is_visible: 1,
    });

    const handleSubmit = async () => {
      console.log(formData);
      try {
        const result = await dispatch(addCategoryThunk(formData)).unwrap();
        console.log(result);
  
        setOpen(false);
      } catch (error) {
        console.log(error);
      }
    };


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
            <p className="text-[#364152] text-2xl font-medium mb-3">{t("Add category")}</p>
            <p className="text-[#697586] text-xl font-normal mb-5">
              {t("Enter the classification data to view it more clearly.")}
            </p>
          </section>
          <span className="border-[0.5px] border-[#E3E8EF]" />
    
          
          <div className='p-6'>
            <Form formData={formData} setFormData={setFormData}/>
          </div>
    
          {/* btn */}
          <div className='px-6 flex gap-4 mb-6'>
            <button onClick={handleSubmit}  className=' w-[40%] bg-[var(--color-primary)] text-white text-base font-medium py-3 px-6 rounded-[6px]  cursor-pointer'>
              {t('Save the classification')}
            </button>
            <button onClick={()=>setOpen(false)} className='w-[20%] border border-[var(--color-primary)] text-[var(--color-primary)] text-base font-medium py-3 px-6 rounded-[6px]  cursor-pointer'>
              {t('cancel')}
            </button>
            
          </div>
        
        </Dialog>

    </>
  )
}

export default Add_CategoryPage

