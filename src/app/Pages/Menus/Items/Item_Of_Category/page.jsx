'use client'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Card from './Card'
import { useDispatch, useSelector } from 'react-redux'
import { getItemByIdThunk } from '@/redux/slice/Menus/MenusSlice'

function Item_Of_CategoryPage({ onClickBack, selectedCategory }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { getItemById, loading } = useSelector((state) => state.Menus)

  useEffect(() => {
    if (selectedCategory?.id) {
      dispatch(getItemByIdThunk(selectedCategory.id))
    }
  }, [dispatch, selectedCategory?.id])

  const items = getItemById?.data ?? (Array.isArray(getItemById) ? getItemById : [])
  console.log(items);
  return (
    <>
      <div className='border border-[#E3E8EF] py-8 px-6 rounded-[6px]'>
          <div className='flex justify-between items-center gap-3 mb-6'>
            <p className='text-[#364152] text-xl font-medium'>{selectedCategory?.name || t('Classification')}</p>
            <button 
              onClick={onClickBack}
              className='w-10 h-10 bg-[var(--color-primary)] rounded-[6px] flex justify-center items-center cursor-pointer '
            >
              <img src="/images/icons/arrow-right-go.svg" className="w-5 h-5" alt="back" />
            </button>
          </div>
          
          <div className='grid grid-cols-2 gap-6'>
            {items.map((item) => (
              <Card key={item?.id} item={item} />
            ))}
          </div>
      </div>
    </>
  )
}

export default Item_Of_CategoryPage
