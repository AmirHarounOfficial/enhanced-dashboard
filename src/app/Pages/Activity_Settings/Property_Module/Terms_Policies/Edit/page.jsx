

'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import TextEditor from './TextEditor'
import { useDispatch, useSelector } from 'react-redux'
import { editPoliciesThunk, getPoliciesThunk } from '@/redux/slice/Setting/SettingSlice'
import { toast } from 'react-toastify'

function EditPage({ policy, onSuccess }) {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const {loading} = useSelector((state)=>state.setting)
  const editorRef = useRef(null)
  
  const [policyName , setPolicyName] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (policy) {
      setPolicyName(policy.policy_name || '')
      setContent(policy.policy_content || '')
    }
  }, [policy])

  const handleSubmit = async () => {
    // Get Delta content
    const editor = editorRef.current?.getEditor();
    const delta = editor ? editor.getContents() : null;

    if (!policyName) {
      toast.error(t('Address is required'))
      return
    }

    // Construct FormData
    const formData = new FormData();
    formData.append('id', policy.id);
    formData.append('policy_name', policyName);
    formData.append('policy_content', JSON.stringify(delta));

    try {
      await dispatch(editPoliciesThunk(formData)).unwrap()
      await dispatch(getPoliciesThunk()) // Refresh
      toast.success(t('Policy updated successfully'))
      if(onSuccess) onSuccess()
    } catch (error) {
      toast.error(error?.message || t('Failed to update policy'))
    }
  }

  return (
    <>
      <div className='p-6'>
        {/*  */}
        <div>
          <p className='text-[#4B5565] text-sm font-normal'>{t('the address')}</p>
          <input 
            type="text"
            value={policyName}
            onChange={(e)=>setPolicyName(e.target.value)}
            className='w-full h-11 border border-[#E3E8EF] mt-1.5 rounded-[6px] outline-none px-4'  
          />
        </div>
        {/*  */}
        <div className='mt-4'>
          <p className='text-[#4B5565] text-sm font-normal'>{t('Proposed text')}</p>
          <TextEditor 
            ref={editorRef} 
            value={content}
            onChange={setContent}
          />
        </div>

        <div className='mt-8 flex justify-start'>
          <button 
            onClick={handleSubmit} 
            disabled={loading}
            className='bg-[var(--color-primary)] text-white px-6 h-14 w-62.5 rounded-[6px] cursor-pointer font-medium '
          >
            {loading ? t('Saving...') : t('save')}
          </button>
        </div>

      </div>
    </>
  )
}

export default EditPage

