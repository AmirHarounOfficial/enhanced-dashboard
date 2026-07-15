"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

function RejectAccountPage() {
      const {t} = useTranslation();
      const [items, setItems] = useState([]);

      useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          try {
            const user = JSON.parse(userStr);
            if (user?.rejection_reason) {
              setItems([user?.rejection_reason]);
            } else {
               setItems(["لا يوجد سبب"]); 
            }
          } catch (e) {
            console.error("Error parsing user data", e);
          }
        }
      }, []);


  return (
    <>
        <MainLayout>
        <section className='flex justify-center mb-[11.11vh]'>
          <div className='bg-[var(--color-primary)] rounded-[50px] flex gap-4 py-4 px-6'>
            <div className=' flex items-center'>
              <img src="/images/rejectClose.svg" alt="" className='w-12 h-12 ' />
            </div>

            <div className='flex flex-col items-start text-[#fff]'>
              <span className=' font-medium text-2xl'>{t('Your account activation has been declined.')}</span>
              <span className='font-normal text-xl'>{t('Sorry, your account activation has not been approved after reviewing your data.')}</span>
            </div>
            
          
          </div>
        </section>


        <section className='flex justify-center '> 
          <img src="/images/RejectAccount.svg" alt="" />
        </section>

      <section className='flex justify-center'>
          <div className=' bg-[#FEE4E2] my-8 p-4 w-[60%] lg1:w-[70%]  rounded-[6px]'>
              <ul className='list-disc px-4  mb-5'>
                <li className='text-[#313131] text-normal font-semibold'>{t('Reasons for rejection')}</li>
              </ul>
            <ol className="list-decimal px-4  text-[#D92D20] text-sm font-medium  ">
              {items.map((item, index) => (
                <li key={index} className='mb-1 break-words whitespace-normal'>{item}</li>
              ))}
            </ol>
          </div>
      </section>

      <section className='mb-8 flex justify-center '>
        <button className='bg-[var(--color-primary)] rounded-[6px] flex justify-center items-center gap-2 w-65.5 h-11 cursor-pointer'>
          <span className='text-[#fff] text-base font-medium'>{t('Edit data')}</span>
          <img src="/images/editpen.svg" alt="" className='w-4.5 h-4.5' />
        </button>
      </section>

      </MainLayout>
    </>
  )
}

export default RejectAccountPage

