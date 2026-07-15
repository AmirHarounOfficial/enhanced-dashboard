'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ItemsPage from './Items/page'
import CategoryPage from './Category/page'
import Add_CategoryPage from './Category/Add_Category/page'
import Item_Of_CategoryPage from './Items/Item_Of_Category/page'
import Add_ItemsPage from './Items/Add_Items/page'

function MenusPage() {
  const {t} = useTranslation()
  const [activeTab, setActiveTab] = useState('Category')
  const [openAdd , setOpenAdd] = useState(false)
  const [openAddItem , setOpenAddItem] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const isCategoryActive = activeTab === 'Category' || activeTab === 'Item_Of_Category';

  return (
    <MainLayout>
      {/* Header */}
      <div className='page-hero flex justify-between items-center gap-4 flex-wrap'>
        <div>
          <p className='text-[#364152] text-xl font-semibold leading-tight'>{t('menu')}</p>
          <p className='text-[#697586] text-sm mt-0.5'>{t('Manage your menu categories and items.')}</p>
        </div>
        {isCategoryActive ? (
          <button
            onClick={() => setOpenAdd(true)}
            className='btn-primary bg-[var(--color-primary)] flex justify-center items-center gap-2 h-11 px-5 rounded-[8px] cursor-pointer'
          >
            <img src="/images/icons/AddIcon.svg" alt="" className="w-4.5 h-4.5" />
            <span className='text-white text-sm font-medium'>{t('Add a new category')}</span>
          </button>
        ) : (
          <button
            onClick={() => setOpenAddItem(true)}
            className='btn-primary bg-[var(--color-primary)] flex justify-center items-center gap-2 h-11 px-5 rounded-[8px] cursor-pointer'
          >
            <img src="/images/icons/AddIcon.svg" alt="" className="w-4.5 h-4.5" />
            <span className='text-white text-sm font-medium'>{t('Add a new item')}</span>
          </button>
        )}
      </div>

      {/* Tab switcher */}
      <div className='inline-flex border border-[#E3E8EF] bg-[#F8FAFC] gap-1.5 p-1.5 rounded-[8px]'>
        <button
          onClick={() => setActiveTab('Category')}
          className={`flex items-center justify-center gap-2 px-5 py-2 rounded-[6px] cursor-pointer transition-all duration-150 text-sm font-medium ${
            isCategoryActive
              ? 'bg-[var(--color-primary)] text-white shadow-sm'
              : 'text-[#697586] hover:text-[#364152]'
          }`}
        >
          <img
            src={`/images/icons/${isCategoryActive ? 'serving-food-white.svg' : 'serving-food-black.svg'}`}
            className="w-4.5 h-4.5"
          />
          {t('Classification')}
        </button>

        <button
          onClick={() => setActiveTab('items')}
          className={`flex items-center justify-center gap-2 px-5 py-2 rounded-[6px] cursor-pointer transition-all duration-150 text-sm font-medium ${
            activeTab === 'items'
              ? 'bg-[var(--color-primary)] text-white shadow-sm'
              : 'text-[#697586] hover:text-[#364152]'
          }`}
        >
          <img
            src={`/images/icons/${activeTab === 'items' ? 'dish-white.svg' : 'dish-black.svg'}`}
            className="w-4.5 h-4.5"
          />
          {t('Category')}
        </button>
      </div>

      {/* Content */}
      <div className='mt-8 page-enter'>
        {activeTab === 'Category' && (
          <CategoryPage
            onViewCategoryItems={(category) => {
              setSelectedCategory(category)
              setActiveTab('Item_Of_Category')
            }}
            setOpenAdd={setOpenAdd}
          />
        )}
        {activeTab === 'items' && (
          <ItemsPage setOpenAddItem={setOpenAddItem} />
        )}
        {activeTab === 'Item_Of_Category' && (
          <Item_Of_CategoryPage
            selectedCategory={selectedCategory}
            onClickBack={() => setActiveTab('Category')}
          />
        )}
      </div>

      <Add_CategoryPage open={openAdd} setOpen={setOpenAdd} />
      <Add_ItemsPage open={openAddItem} setOpen={setOpenAddItem} />
    </MainLayout>
  )
}

export default MenusPage
