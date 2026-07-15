"use client"
import SearchForm from '@/app/Components/Forms/SearchForm'
import { Dialog } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

function LocationPage({openLocation , setOpenLocation ,setOpenMainFilter,getPropertiesCities={}, selectedLocations=[], toggleLocation}) {
  const {t} = useTranslation()

  return (
    <>
    <Dialog
      open={openLocation}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "property-dialog" }}
    >

      <section className="flex px-6 mt-6 mb-4">
        <button
          onClick={() => {
            setOpenLocation(false);
            setOpenMainFilter(true);
          }}
        >
          <img src="/images/icons/arrow-right-black.svg" alt="" className="w-6 h-6" />
        </button>

        <p className="text-[#364152] text-2xl w-full flex justify-center items-center">
          {t('Choose the city')}
        </p>
      </section>

      <section className='px-6 mb-6 '>
        <SearchForm  placeholderKey="Searching for the city"  width="100%"/>
      </section>

      <section className='flex flex-col px-6 mb-6 '>
        <p className='text-[#364152] text-base font-normal mb-3'>
          {t('Last cities')}
        </p>
        {/* Show selected location */}
        <div className='flex gap-3 flex-wrap'>
          {selectedLocations.map(index => {
            const cityData = getPropertiesCities?.data?.[index];
            if (!cityData) return null;
            return (
              <div key={index} className='flex gap-1.5 border border-[#E2E2E2] bg-[#FEF0C7] w-fit px-3 py-1 h-9 rounded-[999px]'>
                <p className='text-[#505050] text-sm flex items-center'>{cityData.city}</p>
                <p className='flex items-center cursor-pointer' onClick={() => toggleLocation(index)}>
                  <img src="/images/icons/xx.svg" alt="remove" className="w-4 h-4" />
                </p>
              </div>
            )
          })}
        </div>
      </section>

      <section className='px-6 mb-6'>
        <p className='text-[#364152] text-base font-normal mb-4'>{t('All cities')}</p>


        {getPropertiesCities.data?.map((items , index)=>(
          <div 
            key={index}
            className={` p-4 cursor-pointer relative transition-colors ${selectedLocations.includes(index) ? 'bg-[#eff6ef] rounded-[6px] mb-2' : ''}`}
            onClick={() => toggleLocation(index)}
          >
            <div className='flex gap-3 items-center'>
              <p className='bg-[#DBEAFE] w-8 h-8 rounded-full flex justify-center items-center'>
                <img src="/images/icons/location-bluee.svg" className="w-4 h-4" />
              </p>

              <p className=''>
                <span className={`text-base font-normal`}>{items?.city} </span>
              </p>
            </div>
            {selectedLocations.includes(index) && (
              <div className='absolute top-7 left-4'>
                <img src="/images/icons/true_circle _blue.svg" alt="" className="w-5 h-5" />
              </div>
            )}
          </div>
        ))}
      
      </section>

    </Dialog>

    </>
  )
}

export default LocationPage
