'use client'
import React, { useState } from 'react'
import MapDialog from '../Dialog/MapDialog'
import { useTranslation } from 'react-i18next'
import DeleteDialog from '../Dialog/DeleteDialog'

function HaveWorkplacesPage({Workplaces}) {
  const {t} = useTranslation()
    const [openMap, setOpenMap] = useState(false)
    const [openDelete , setOpenDelete] = useState(false)
    const [selectedAreaId, setSelectedAreaId] = useState(null)
    
  return (
    <>
      <div className='grid grid-cols-1 lg1:grid-cols-2 gap-6 px-6 pt-6'>
        {Workplaces?.areas?.map((Workplace ,index)=>(
          <section className='flex justify-between border border-[#E3E8EF] py-4 px-3 rounded-lg' key={Workplace?.id}>
            <div className='flex gap-1.5'>
              <p  className='flex items-center'>
                <img src="/images/icons/location.svg" alt="" className='w-4 h-4' />
              </p>
              <div className='flex gap-1.5 text-[#364152] text-base font-normal'>
                <p>{Workplace?.city}</p>
                <p className='flex items-center' >
                  <img src="/images/icons/Ellipse.svg" alt="" className='w-1 h-1' />
                </p>
                <p>{Workplace?.state}</p>
              </div>
            </div>

            <button className='cursor-pointer' onClick={()=>{setSelectedAreaId(Workplace?.id); setOpenDelete(true)}}>
              <img src="/images/icons/xxxx.svg" alt="" className='w-4 h-4' />
            </button>

          </section>
        ))}
        
        

      </div>

      <div className='px-6'>
        <button 
          onClick={() => setOpenMap(true)}
          className='flex items-center justify-center gap-2 w-[50%] lg1:w-[30%] h-14 bg-[var(--color-primary)] text-white rounded-[6px] cursor-pointer my-6'
        >
          <span>{t('Add a place')}</span>
          <img src="/images/icons/AddIcon.svg" alt="" className='w-6 h-6'/>
        </button>
      </div>
      

    <MapDialog open={openMap}  handleClose={() => setOpenMap(false)} />
    <DeleteDialog open={openDelete}  setOpen={setOpenDelete} areaId={selectedAreaId}/>
    </>
  )
}

export default HaveWorkplacesPage

