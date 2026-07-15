'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout';
import React, { Suspense, useEffect } from 'react'
import No_Tables_Add from './No_Tables_Add';
import CardOfTable from './CardOfTable';
import { useTranslation } from 'react-i18next';
import AddBtn from '@/app/Components/Buttons/AddBtn';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { getTablesThunk } from '@/redux/slice/Halls/HallsSlice';

function TablesContent() {
  const {t} = useTranslation()

  const searchParams = useSearchParams();
  const hall_id = searchParams.get("hall_id");

  const dispatch = useDispatch()
  const {getTables}=useSelector((state)=>state.halls)
  
  useEffect(()=>{
    if(hall_id){
      dispatch(getTablesThunk(hall_id))
    }
  },[dispatch,hall_id])

  
console.log('hall' , hall_id);
  return (
    <MainLayout>
      
      {/* <No_Tables_Add/> */}
        <div>
          {/* header */}
          <div className=" flex justify-between mb-8">
            <div>
              <p className='text-[#364152] text-2xl font-medium'>{t("tables")}</p>
              <p className='text-[#697586] text-xl font-normal'>{t("Main Hall")} -  2  {t("tables")}</p>
            </div>
            <AddBtn               
              href={`/Pages/Halls/Tables/Add?hall_id=${hall_id}`}
              label="Add a new table" 
            />
          </div>
  
          {/* cards */}
          <div  className='border border-[#E3E8EF] py-8 px-6 rounded-[6px]'>
            <CardOfTable getTables={getTables} HallId={hall_id}/>
          </div>
          
  
  
          </div>
    </MainLayout>
  )
}

export default function TablesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TablesContent />
    </Suspense>
  );
}
