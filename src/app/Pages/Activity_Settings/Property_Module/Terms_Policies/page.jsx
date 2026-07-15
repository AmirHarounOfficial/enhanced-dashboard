'use client'
import React, { Suspense, useEffect, useState } from 'react'
import HaveTerms_PoliciesPage from './HaveTerms_Policies/page'
import NoTerms_PoliciesPage from './NoTerms_Policies/page'
import Addpage from './Add/page'
import EditPage from './Edit/page'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux'
import { getPoliciesThunk } from '@/redux/slice/Setting/SettingSlice'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import Loader from '@/app/Components/Loader/Loader'

function TermsPoliciesContent() {
  const [showAddForm, setShowAddForm] = useState(false)
  
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const editId = searchParams.get('edit')

  //api
  const dispatch = useDispatch()
  const {policies,loading,error} = useSelector((state)=>state.setting)
  
  useEffect(()=>{
    dispatch(getPoliciesThunk())
  },[dispatch])

  // Derive selected policy from URL
  const selectedPolicy = editId ? policies.find(p => p.id === Number(editId) || p.id === String(editId)) : null
  const showEditForm = !!editId && !!selectedPolicy

  const handleEditClick = (policy) => {
    // Update URL to include edit param
    const params = new URLSearchParams(searchParams)
    params.set('edit', policy.id)
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleEditSuccess = () => {
    // Remove edit param from URL
    const params = new URLSearchParams(searchParams)
    params.delete('edit')
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="border border-[#E3E8EF] rounded-[8px] mb-8 overflow-hidden">
      <Header/>
      
      {showEditForm ? (
        <EditPage 
          policy={selectedPolicy} 
          onSuccess={handleEditSuccess} 
        />
      ) : showAddForm ? (
        <Addpage onSuccess={() => setShowAddForm(false)} />
      ) : policies && policies.length > 0 ? (
        <HaveTerms_PoliciesPage  
          onAddClick={() => setShowAddForm(true)} 
          onEditClick={handleEditClick}
          policies={policies}
          loading={loading}

        />
      ) : (
        <NoTerms_PoliciesPage 
          onAddClick={() => setShowAddForm(true)} 
        />
      )}

    </div>
  )
}

function Terms_PoliciesPage() {
  return (
    <Suspense fallback={<Loader />}>
      <TermsPoliciesContent />
    </Suspense>
  )
}

export default Terms_PoliciesPage
