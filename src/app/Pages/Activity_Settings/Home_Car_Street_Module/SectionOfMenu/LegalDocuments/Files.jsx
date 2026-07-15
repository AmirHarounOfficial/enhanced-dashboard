'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AddFile from './Dialog/AddFile'
import dayjs from "dayjs";

function Files({documents}) {
  const {t} = useTranslation()
  const [openAddFile , setOpenAddFile] = useState(false)
  const [selectedDocKey, setSelectedDocKey] = useState(null)

/**true-->expired  false-- not expired */
  return (
    <>

      <div className='px-6 mb-6'>
        
      {documents?.documents?.map((doc , index)=>{
          const is_uploaded = doc.is_uploaded;
          const expiry_date = doc.expiry_date;
          const status = doc.status;

          const isExpired = (dateString) => {
              if (!dateString) return false;          
              // Parse the date string
              const [day, month, year] = dateString.split('/').map(Number);
              const expiryDate = new Date(year, month - 1, day); 
              const currentDate = new Date();
              // Set time to midnight for accurate date comparison
              currentDate.setHours(0, 0, 0, 0);
              expiryDate.setHours(0, 0, 0, 0);  
              return expiryDate < currentDate;
          };
          const documentExpired = isExpired(expiry_date);

          let content;  
          { 
            if(is_uploaded === false && status === null ){
              content=(
                <p className='text-[#697586] text-xs font-normal'>{t('Add the file and expiry date')}</p>
              )
            }else if(is_uploaded === true && documentExpired === false &&   (status === 'pending' || status === 'approved')){
              content = (
                <p className='text-[#697586] text-xs font-normal'>{t('Expiry date')}{" "}{dayjs(expiry_date).format("DD/MM/YYYY")} </p>
              )       
            }else if(is_uploaded === false && status === 'rejected'){
              content =(
                <p className='text-[#F04438] text-xs font-normal'>{t('The document was rejected. Please resubmit it.')}</p>
              ) 
            }else if(is_uploaded === false && status === 'expired'){
              content =(
                <p className='text-[#F04438] text-xs font-normal'>{t('The document has expired; please add a newer copy.')}</p>
              )
            }
          }

          let imgLog;
          {
            if(is_uploaded === false && status === null ){
              imgLog=(
                <>
                  <img src="/images/uploadd.svg" className="w-8 h-10" />
                </>
              )
            }else if(is_uploaded === true && documentExpired === false &&   (status === 'pending' || status === 'approved')){
              imgLog = (
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <img src="/images/filephoto.svg" className="w-8 h-10" />
                  <span className="absolute bottom-1 right-2  text-white text-[10px] px-1 py-0.5 rounded-sm">
                      pdf
                  </span>
                </div>
              )       
            }else if(is_uploaded === false && status === 'rejected'){
              imgLog =(
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <img src="/images/filephoto.svg" className="w-8 h-10" />
                  <span className="absolute bottom-1 right-2  text-white text-[10px] px-1 py-0.5 rounded-sm">
                      pdf
                  </span>
                </div>      ) 
            }else if(is_uploaded === false  && status === 'expired'){
              imgLog =(
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <img src="/images/filephoto.svg" className="w-8 h-10" />
                  <span className="absolute bottom-1 right-2  text-white text-[10px] px-1 py-0.5 rounded-sm">
                      pdf
                  </span>
                </div>
              )
            }
          }


          let btn;  
          {
            if(is_uploaded === true && documentExpired === false &&   (status === 'pending' || status === 'approved')){
              btn=(
                <div
                    className='w-[50%] flex justify-end items-center cursor-pointer'
                  >
                    <img src="/images/icons/true_green.svg" alt="" />
                  </div>
              )
            }else (
              btn=(
                  <div
                    onClick={()=>{ setSelectedDocKey(doc.doc_key); setOpenAddFile(true); }}
                    className='w-[50%] flex justify-end items-center cursor-pointer'
                  >
                    <img src="/images/icons/checkmark-circle-false_yellow.svg" alt="" />
                  </div>
              )
            )
          }

          return(
            <div 
              key={doc?.id}
              className='flex justify-between border border-[#E3E8EF] rounded-[6px] p-4 w-full mb-4'>
              
              <div className='flex items-center gap-3 w-[50%]'>

                <div>
                  {imgLog}
                </div>

                <div className='flex flex-col gap-1'>
                  <p className='text-[#344054] text-sm font-medium'>{doc?.doc_name}</p>
                  <>{content}</>
                </div>
                
              </div>


              {btn}

            </div>
          )
      })}


      </div>


      <AddFile open={openAddFile} setOpen={setOpenAddFile} docKey={selectedDocKey} />
    </>
  )
}

export default Files

