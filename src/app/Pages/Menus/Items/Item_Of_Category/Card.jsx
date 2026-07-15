'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Details_Of_ItemsPage from '../Details_Of_Items/page'
import { IMAGE_BASE_URL } from '../../../../../../config/imageUrl'

function Card({ item }) {
    const {t} = useTranslation()
    const [openDetailsItem , setOpenDetailsItem] = useState(false)
    const [selectItemID , setSelectItemID] = useState(null)
  return (
    <>
      <div className='bg-white border border-[#E3E8EF] shadow-sm hover:shadow-md transition-shadow duration-200 rounded-[6px] pt-4 px-4'>
        <div className=' flex justify-between'>
          <div className='flex  gap-2'>
            <div className=' pb-2'>
              <img src={item?.image ? `${IMAGE_BASE_URL}${item.image}` : "/images/P.p.svg"} className="w-25 h-20 object-cover" alt={item?.name} />
            </div>
            <div className='flex flex-col justify-center '>
              <p className='text-[#364152] text-xl font-normal'>{item?.name}</p>
              <p className='text-[var(--color-primary)] text-lg font-normal'>{item?.base_price} {t('EGP')}</p>
            </div>
          </div>
          <div className='flex items-center '>
          
            {/* details */}
            <button 
              type="button"
              onClick={()=>{
                    console.log('item.id', item.id);
                setOpenDetailsItem(true)
                setSelectItemID(item.id)
              }
              }  
              className='w-8 h-8  bg-[#EEF2F6] rounded-full flex justify-center items-center cursor-pointer'
            >
              <img src="/images/icons/arrow-right-blackk.svg" className="w-6 h-6" />
            </button>

          </div>
        </div>
      </div>
      
      <Details_Of_ItemsPage
        open={openDetailsItem}
        setOpen={setOpenDetailsItem}
        itemID = {selectItemID}
      />

    </>
  )
}

export default Card

