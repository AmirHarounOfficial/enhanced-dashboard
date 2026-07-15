"use client"
import HiddenItemsLayout from '@/app/Components/MainLayout/HiddenItemsLayout'
import React from 'react'
import Module_key from './Module_key'

function MainPage() {
  return (
    <HiddenItemsLayout>
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="bg-white border border-[#E3E8EF] rounded-[12px] p-8 w-full max-w-lg shadow-md">
          <Module_key />
        </div>
      </div>
    </HiddenItemsLayout>
  )
}

export default MainPage
