'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { Suspense, useEffect, useState } from 'react'
import No_Views_Add from './No_Views_Add'
import CardOfViews from './CardOfViews'
import { useTranslation } from 'react-i18next'
import AddPage from './Add/page'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'next/navigation'
import { deleteViewThunk, getViewsThunk, toggleViewsThunk } from '@/redux/slice/Halls/HallsSlice'

function ViewsContent() {
  const {t} = useTranslation()

  const [openAdd , setOpenAdd] = useState(false)

  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  console.log(id);
    
  //api
  const dispatch = useDispatch()
  const {getViews} = useSelector((state)=>state.halls)
  useEffect(()=>{
    if(id){
      dispatch(getViewsThunk(id))
    }
  },[dispatch , id])

  const handleDelete = async (viewId) => {
    const result = await dispatch(deleteViewThunk(viewId))
    if (!result.error) {
      dispatch(getViewsThunk(id))
    }
  }

  const handleToggle = async (viewId) => {
    const result = await dispatch(toggleViewsThunk(viewId))
    if (!result.error) {
      dispatch(getViewsThunk(id))
    }
  }
  // console.log('getViews',getViews);
  return (
    <MainLayout>
      
      {/* <No_Views_Add/> */}

      <div>
        {/* header */}
        <div className=" flex justify-between mb-8">
          <div>
            <p className='text-[#364152] text-2xl font-medium'>{t("Lounge view")}</p>
            <p className='text-[#697586] text-xl font-normal'>{t("Identifying aspects of the showroom offered to customers")}</p>
          </div>
          <button
            onClick={()=>setOpenAdd(true)}
            className='w-[20%] h-14 flex items-center justify-center gap-2  bg-[var(--color-primary)] text-[white] text- cursor-pointer'
          >
            <span>
              <img src="/images/icons/AddIcon.svg" alt="" />
            </span>
            <span>{t('Add new view')}</span>
          </button>
        </div>

        {/* cards */}
        <div  className='border border-[#E3E8EF] py-8 px-6 rounded-[6px]'>
          <CardOfViews  getViews={getViews} handleDelete={handleDelete} handleToggle={handleToggle} refreshViews={() => dispatch(getViewsThunk(id))}/>
        </div>
        
      </div>



      <AddPage
        open={openAdd}
        setOpen={setOpenAdd}
        Hallid = {id}
      />

    </MainLayout>


  )
}



export default function ViewsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ViewsContent />
    </Suspense>
  );
}
