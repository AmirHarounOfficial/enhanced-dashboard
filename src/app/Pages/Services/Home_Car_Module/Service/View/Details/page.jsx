"use client"
import { deleteServiceThunk } from '@/redux/slice/Services/ServicesSlice';
import { useDispatch } from 'react-redux';
import { t } from 'i18next'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import DeletePage from '../Model/Delete/page';

function DetailsPage({handleClose ,status ,service}) {
  const {t} = useTranslation();
    const [enabled, setEnabled] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClosee = () => {
    setOpen(false);
  };

  const router = useRouter();
  const dispatch = useDispatch();

  const handleEditClick = () => {
    handleClose();
    router.push(`/Pages/Services/Home_Car_Module/Service/Edit?id=${service?.id}`);
  };

  const handleDelete = async () => {
    if (service?.id) {
      const resultAction = await dispatch(deleteServiceThunk(service.id));
      if (deleteServiceThunk.fulfilled.match(resultAction)) {
        // Success
        handleClosee();
        handleClose(); 
        router.push('/Pages/Services');
      }
    }
  };

  return (
    <>
      <div className='px-6'>
        {/* title */}
        <p className='text-[#364152] text-xl font-medium '>
          {service?.service?.category?.title}
        </p>
        
        <section className=' shadow-sm bg-white rounded-[6px] mt-6 p-4'>
          <div>
            <p className='font-normal text-base mb-4'>
              <span className='text-[#4B5565]'>{t('Subcategory')}  :  </span>
              <span className='text-[#364152] '>{service?.main_category?.title}</span>
            </p>
          </div>
          <div>
            <p className='font-normal text-base'>
              <span className='text-[#4B5565]'>{t('Main category')}  :  </span>
              <span className='text-[#364152] '>{service?.module?.name} </span>
            </p>
          </div>
        </section>

        {status==='refused'?(
          <div className='my-6 bg-[#FEE4E2] px-4 py-3 rounded-[10px]'>
            <p className='text-[#313131] text-sm font-medium mb-2'>{t('Service Refused')}</p>
            <ol className="list-decimal list-inside space-y-2 text-[#D92D20] text-sm font-normal">
              <li>{t('The description is incomplete or unclear')}</li>
              <li>{t('The attached photos do not meet quality standards.')}</li>
              <li>{t('The price is inappropriate or inconsistent with the service category.')}</li>
            </ol>
          </div>
        ):''}
          {status==='stopped'?(
          <div className='my-6 bg-[#FEE4E2] px-4 py-3 rounded-[10px]'>
            <p className='text-[#313131] text-sm font-medium mb-2'>{t('Service suspended.')}</p>
            <ol className="list-decimal list-inside space-y-2 text-[#D92D20] text-sm font-normal">
              <li>{t('Failure to comply with established standards and policies.')}</li>
              <li>{t('Repeated violations of data or service content.')}</li>
            </ol>
          </div>
        ):''}

        {/* Description */}
        <section className='my-6'>
          <span className='text-[#364152] text-base font-medium '>{t('Service Description')}</span>
          <p className='text-[#697586] break-words  text-base font-normal shadow-sm bg-white p-3 mt-4 rounded-[6px]'>
          {service?.long_description}
          </p>
        </section>

        {/* Service status */}
        <section className='flex gap-4 text-[#4B5565] text-base font-medium mb-4 '>
          <div>
            <span className='text-[#364152]'>{t('Service status')}</span>
            <span>{service?.is_active!==true ? '( غير نشط)':'(نشط)'}</span>
          </div>
          <div
            onClick={() => setEnabled(!enabled)}
            className={`relative w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300
              ${service?.is_active ? "bg-[#17B26A]" : "bg-[#9AA4B2]"}`}
          >
            <div
              className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform transition-transform duration-300
                ${service?.is_active  ? "-translate-x-5" : "translate-x-0"}`}
            />
          </div>
        </section>

        {/* saleprice&&price&&Revenues&&RequestsNumber&&view */}
        <section className='shadow-sm bg-white grid grid-cols-2 justify-between rounded-[6px] gap-4 p-3 mb-6'>
            {/* sale price */}
            {service?.sale_price!==0  && (
              <div className='flex gap-1.5 w-full'>
                <img src="/images/icons/sale price.svg" alt="" />
                <p className='text-[#D92D20] font-medium text-sm line-through'>{service?.price} جنية</p>
              </div>
            )}

            {/* price */}
            {service?.price_on_inspection===true ?(
              <div className={`flex gap-1.5 w-full ${service?.sale_price!==0 ?'justify-end':""}`}>
                <img src="/images/icons/price.svg" alt="" />
                <p className='text-[#C69815] text-base font-medium'>{t('Price upon viewing')}</p>
              </div>
            ):(
            <>
                <div className={`flex gap-1.5 w-full ${service?.sale_price!==0 ?'justify-end':""}`}>
                  <img src="/images/icons/price.svg" alt=""  />
                  <p className='text-[var(--color-primary)] text-base font-medium'>{service?.sale_price} {t('Pound')}</p>
                </div>
            </>
            )}            
              
            {/* Revenues */}
            <div className={`flex   ${service?.sale_price===0 ?' justify-end':""}`}>
            <div className='w-50 flex gap-1.5'>
                <img src="/images/icons/Revenues.svg" alt=""/>
                <p className='text-base font-normal'>
                  <span className='text-[#697586] ml-1'>{t('Revenues')}</span>  
                  <span className='text-[var(--color-primary)]'>{service?.bookings_sum_price == null ? '0' : service?.bookings_sum_price}  {t('Pound')}</span>
                </p>
            </div>
            </div>
            
            {/* RequestsNumber */}
            <div className={`flex gap-1.5 w-full ${service?.sale_price!==0 ?'justify-end':""}`}>
              <img src="/images/icons/RequestsNumber.svg" className='w-5 h-5' alt=""/>
              <p className='text-[#697586] text-base font-normal'>{t('Requests')} {service?.bookings_count}</p>
            </div>
    
            {/* views */}
            <div className={`flex ${service?.sale_price===0 ?' justify-end':""}`}>
                <div className='flex w-50  gap-1.5'>
                  <img src="/images/icons/view.svg" alt="" className='text-[#8B8B8B]'/>
                  <p className='text-[#697586] text-base font-normal'>{service?.views_count} {t('View')}</p>
                </div>
            </div>
            

        </section>

        {/* date-time */}      
        <section className='mb-4 '>
          <div className='flex gap-1.5 mb-4'>
            <img src="/images/icons/date-time.svg" alt="" />
            <p className='text-[#364152]'>{t('Available times and days')}</p>
          </div>

          <div className='shadow-sm bg-white rounded-[6px] p-3'>
            
            {(!service?.days || service?.days.length === 0 ||
              !service?.days.some((d) => d.times?.length > 0)) ? (
              
              <p className='text-[#697586] text-sm font-normal'>
                {t("No available times")}
              </p>
            
            ) : (
              service?.days.map((day, index) => (
                <div key={index}>
                  <div className='flex justify-between'>
                    <p className='text-[#697586] text-sm font-normal'>{day?.day}</p>

                    <div className='flex flex-col gap-3 items-end'>
                      {day?.times.map((time, idx) => (
                        <p
                          className='text-[#697586] text-sm font-normal'
                          key={idx}
                        >
                          {time?.from} - {time?.to}
                        </p>
                      ))}
                    </div>
                  </div>

                  {index !== service?.days.length - 1 && (
                    <div className="w-full h-px bg-[#CDD5DF] my-3"></div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>


        {/* Available areas */}
        <section >
          <div className='flex gap-1.5 mb-4'>
            <img src="/images/icons/Available areas.svg" alt=""/>
              <span className='text-[#364152] text-base font-normal'>{t('Available areas')}</span>  
          </div>

          <div className='shadow-sm  rounded-[6px]  p-3 flex gap-3 flex-wrap'>
            {service?.areas?.map((area, index) => (
              <p  
                key={area.id || index} 
                className='text-[#4B5565] text-sm font-normal bg-[#FEF0C7] border border-[#E2E2E2] rounded-[35px] w-fit h-8.5 px-3 py-0.5 flex items-center justify-center'>
                  {area.city}
              </p>
            ))}
          </div>
        </section>

      </div>

      <div className="w-full h-px bg-[#CDD5DF] my-6"></div>
      

      {/* btns */}
      <section className='flex gap-3 mx-6 mb-6'>
        <button      
          onClick={handleEditClick}
          className='border bg-[var(--color-primary)] text-[#fff] flex justify-center items-center gap-2 h-11 w-50 rounded-[6px] '
        >
          <span className='text-base font-medium'>{t('Modify the service')}</span>
          <img src="/images/icons/edit.svg" alt="" className='w-5 h-5' />
          
        </button>
          {status==='stopped' || status==='refused' ?(
            <button onClick={handleClickOpen} className='border border-[#F04438] text-[#F04438] h-11 w-32.5 rounded-[6px] text-base font-medium cursor-pointer'>
              {t('delete')}
            </button>
          ):(
            <button onClick={handleClose} className='border border-[#C69815] text-[var(--color-primary)] h-11 w-32.5 rounded-[6px] text-base font-medium cursor-pointer'>
              {t('cancel')}
            </button>
          )}
      </section>

      <DeletePage 
        open={open} 
        handleClosee={handleClosee} 
        onDelete={handleDelete}
      />

  
      
    </>
  )
}

export default DetailsPage


