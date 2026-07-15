"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { Suspense, useEffect } from 'react'
import No_Halls_Add from './No_Halls_Add'
import { useTranslation } from 'react-i18next'
import AddBtn from '@/app/Components/Buttons/AddBtn'
import CardOfHall from './CardOfHall'
import { useDispatch, useSelector } from 'react-redux'
import { getHallsThunk } from '@/redux/slice/Halls/HallsSlice'
import Loader from '@/app/Components/Loader/Loader'


function HallContent() {
  const {t} = useTranslation()

  //api
  const dispatch = useDispatch();
  const {halls, loading, error} = useSelector((state) => state.halls);
  useEffect(()=>{
    dispatch(getHallsThunk());
  }, [dispatch])

  if (loading) return <MainLayout><Loader /></MainLayout>;

  return (
    <MainLayout>
      {halls?.data?.label === 0 ? (
        <No_Halls_Add />
      ) : (
        <div>
          {/* Header */}
          <div className="page-hero flex justify-between items-center gap-4 flex-wrap">
            <div>
              <p className='text-[#364152] text-xl font-semibold leading-tight'>{t("Halls")}</p>
              <p className='text-[#697586] text-sm mt-0.5'>
                {t("It was equipped")} <span className="text-[#C69815] font-semibold">{halls?.active_halls}</span> {t("hall")}
              </p>
            </div>
            <AddBtn
              href="/Pages/Halls/Hall/Add"
              label="Adding a new hall"
            />
          </div>

          {/* Cards */}
          <div className='bg-white border border-[#E3E8EF] rounded-[8px] py-8 px-6'>
            <CardOfHall halls={halls}/>
          </div>
        </div>
      )}
    </MainLayout>
  )
}


export default function HallPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HallContent />
    </Suspense>
  );
}
