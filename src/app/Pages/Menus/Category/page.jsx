'use client'
import React, { useEffect, useState } from 'react'
import All_CategoryPage from './All_Category/page'
import No_Category from './No_Category'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoriesThunk } from '@/redux/slice/Menus/MenusSlice'

function CategoryPage({setOpenAdd,  onViewCategoryItems }) {

  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const {getCategories, categoriesMeta, loading} = useSelector((state)=>state.Menus)

  useEffect(()=>{
    dispatch(getCategoriesThunk(currentPage))
  },[dispatch, currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // console.log('getCategories' , getCategories);

  return (
    <div>
      {/* <No_Category setOpenAdd={setOpenAdd}/> */}
      <All_CategoryPage
        onViewCategoryItems={onViewCategoryItems}
        getCategories={getCategories}
        meta={categoriesMeta}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default CategoryPage