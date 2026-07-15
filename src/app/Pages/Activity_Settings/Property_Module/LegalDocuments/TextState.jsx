'use client'
import React from 'react'
import { useTranslation } from 'react-i18next';

function TextState({documents}) {
  const {t} = useTranslation()
  // all_fine
  // not_uploaded
  // reviewing
  // expired

  const textState = documents?.textState
  let content;


  if(textState ==='all_fine'){
    content = 'All documents were successfully completed.';
  }else if(textState ==='not_uploaded'){
    content = 'Please fill out these forms'
  }else if(textState ==='reviewing'){
    content = 'All required documents have been successfully uploaded and are currently being reviewed.'
  }else if(textState === 'expired'){
    content = 'Please update the expired files with a newer version.'
  }
  return (
    <>
    <div className='p-6'>
      <p className='text-[#364152] text-base font-medium'> 
        {t(content)}
      </p>
    </div>
    

    </>
  )
}

export default TextState