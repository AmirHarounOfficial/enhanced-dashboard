"use client"
import React from 'react'
import InformationDataPage from './InformationData/page'
import { useTranslation } from 'react-i18next'

import { useState, useRef } from 'react'
import Switch from '@mui/material/Switch'
import { styled } from '@mui/material/styles'
import DeleteDialogPage from './DeleteDialog/page'
import { useDispatch } from 'react-redux'
import { AddIpnThunk } from '@/redux/slice/Setting/SettingSlice'

function NullStatusPage({is_marketer, setIsMarketer, setMarketerStatus ,userData}) {
  const {t}=useTranslation()
  
  //api
  const dispatch = useDispatch();


const handleSubmitIpn = () => {
  const formData = new FormData();
  formData.append('ipn_num', iban);
  formData.append('ipn_image', imageFile);

  if (selectedFile) {
    formData.append('file', selectedFile);
  }

  // for (let pair of formData.entries()) {
  //   console.log(pair[0], pair[1]);
  // }

  dispatch(AddIpnThunk(formData));
};


  const GreenSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
      width: 53,
      height: 24,
      padding: 0,
      '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 3,
        transitionDuration: '500ms',
        '&.Mui-checked': {
          transform: 'translateX(31px)', 
          color: '#fff',
          '& + .MuiSwitch-track': {
            backgroundColor: '#10B981',
            opacity: 1,
            border: 0,
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.5,
          },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
          color: '#33cf4d',
          border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
          color: theme.palette.grey[100],
        },
      },
      '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 18,
        height: 18,
      },
      '& .MuiSwitch-track': {
        borderRadius: 24 / 2,
        backgroundColor: '#E9E9EA',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
          duration: 500,
        }),
      },
  }));
  
  const handleToggle = (event) => {
    setIsMarketer(event.target.checked)
  }

const [iban, setIban] = useState('');

  //upload image
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl); 
    }
  };


  const handleDeleteImage = () => {
    setSelectedImage(null);
    setImageFile(null);
    setOpen(false);
  };


  const [open, setOpen] = useState(false);

  // Upload file
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)
  const mobileImageInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      console.log('File selected:', file.name, file.size, file.type);
      setSelectedFile(file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current.click()
  }

  const handleDeleteFile = () => {
    setSelectedFile(null)
  }

  return (
    <>
      <div className='border border-[#E3E8EF] p-6'>

        <div className='flex justify-between items-center px-6 py-4 mb-8 border border-[#E3E8EF] rounded-[6px]'>
          <p className='text-[#4B5565] text-base font-normal '>{t('Activating the marketer dashboard')}</p>
          <GreenSwitch checked={is_marketer} onChange={handleToggle} />
        </div>

        <InformationDataPage userData={userData}/>
        
        <div>
          <p className='text-[#364152] text-lg font-normal'>{t('Bank account details')}</p>

          <div className='mt-4'>
            <p className=' text-[#364152] text-sm font-normal mb-1.5'>{t('IBAN number')}</p>
            <div className="relative">
              <input 
                type="text" 
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                className={`w-full h-14 p-3 border border-[#E3E8EF] text-[#9A9A9A] rounded-[6px] outline-none placeholder:text-sm 
                            ${!is_marketer ? 'bg-[#EEF2F6] placeholder:text-[#9A9A9A]' : 'bg-white placeholder:text-[#9A9A9A]'}
                          `} 
                placeholder={t('Enter your IBAN number')}
                disabled={!is_marketer? true : false}
              />
              <button 
                className="absolute left-3 top-1/2 -translate-y-1/2 lg1:hidden cursor-pointer"
                onClick={() => mobileImageInputRef.current?.click()}
              >
                <img src="/images/icons/scan.svg" alt="Scan" className="w-6 h-6" />
              </button>
            </div>

            {/* Image Upload Input */}
            <div className='mt-4'>
              <div className={`relative w-full rounded-[6px]  overflow-hidden `}>
                {selectedImage ? (
                  <div className="relative w-full h-full  "> 
                    <img src={selectedImage} alt="Selected" className="w-full h-40 object-cover  " />
                    {/* delete img */}
                    <button 
                      onClick={() => setOpen(true)}
                      className="absolute top-2 left-2 w-7 h-7 p-1.5 border border-[#F04438] bg-[#FEE4E2] rounded-[6px] flex items-center justify-center cursor-pointer "
                    >
                      <img src="/images/icons/delete-darkRed.svg" alt="Delete" className="w-5 h-5" />
                    </button>

                  </div>
                ) : (
                  <>
                    <div className={`flex items-center justify-center gap-1.5 px-3 h-14 pointer-events-none border border-[#E3E8EF] text-[#364152] ${!is_marketer ? ' bg-[#E3E8EF] ' : 'bg-white'}`}>
                      {/* Show "Take a photo" on mobile/tablet, "Upload a picture" on desktop */}
                      <span className='text-sm font-normal block lg1:hidden'>{t('Take a photo')}</span>
                      <span className='text-sm font-normal hidden lg1:block'>{t('Upload a picture')}</span>
                      <img src="/images/icons/camera.svg" alt="" />
                    </div>
                    {/* Input for Mobile/Tablet - Opens Camera */}
                    <input
                      type="file"
                      ref={mobileImageInputRef}
                      accept="image/*"
                      capture="environment"
                      disabled={!is_marketer}
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed lg1:hidden"
                    />
                    {/* Input for Desktop - Opens Gallery/Files */}
                    <input
                      type="file"
                      accept="image/*"
                      disabled={!is_marketer}
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed hidden lg1:block"
                    />
                  </>
                )}
              </div>

              <p className='border border-[#FEF0C7] bg-[#FFFAEB] p-2 mt-2 text-[#775B0D] text-base font-normal'>
                {t('The image must be an official document showing the IBAN number and the marketer name.')}
              </p>
            </div>

            {/* file upload */}
            <div className='mt-8 '>
              <p className='text-[#364152] text-sm font-normal mb-1.5'>{t('Upload files')}</p>
              <div className='flex flex-col justify-center items-center border border-dashed border-[#C8C8C8]  py-4'>
                <p className='text-[#0F022E] text-xs font-medium mb-2'>{t('Upload a file')}</p>
                <p className='text-xs font-normal'>
                  <span className='text-[#697586]'>{t('Supports these formats')} :</span>
                  <span className='text-[#202939]'> AVIF, WORD, PDF </span>
                </p>
                <button 
                  type="button"
                  onClick={handleUploadClick}
                  disabled={!is_marketer}
                  className= {`w-62.5 h-10 mt-4 ${!is_marketer ? 'bg-[#E3E8EF] text-[#9AA4B2]' : 'bg-[var(--color-primary)] text-white '} text-base font-medium rounded-[6px] cursor-pointer`}
                >
                  {t('Raise')}
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  onChange={handleFileChange} 
                  accept=".avif, .doc, .docx, .pdf"
                />
              </div>

              {selectedFile && (
                <div className='flex justify-between items-center mt-4 p-3 border border-[#E3E8EF] rounded-[6px] bg-[#fff]'>
                  {/* {console.log('Rendering selectedFile block:', selectedFile.name)} */}
                  <div className='flex items-center gap-3'>
                  {(() => {
                    const ext = selectedFile.name.split('.').pop().toLowerCase();
                    const isPdf = ext === 'pdf';
                    const isWord = ['doc', 'docx'].includes(ext);
                    const bgColor = isPdf ? 'bg-[#F04438]' : isWord ? 'bg-[#1570EF]' : 'bg-[#E3E8EF]';
                    const textColor = (isPdf || isWord) ? 'text-white' : 'text-[#4B5565]';
                    
                    return (
                      <div className={`w-10 h-10 ${bgColor} rounded flex items-center justify-center ${textColor} text-xs font-bold uppercase`}>
                        {ext}
                      </div>
                    );
                  })()}
                    <div>
                      <p className='text-[#344054] text-sm font-medium '>{selectedFile.name}</p>
                      <p className='text-[#697586] text-xs font-normal'>KB {(selectedFile.size / 1024).toFixed(2)}  تم الرفع</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleDeleteFile}
                    className='text-[#F04438]  p-1.5 rounded cursor-pointer'
                  >
                    <img src="/images/icons/delete-darkRed.svg" alt="Delete" className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>



          <button 
            disabled={!selectedImage}
            onClick={handleSubmitIpn}
            // onClick={() => setMarketerStatus('pending')}
            className={`mt-8 w-62.5 h-12 ${!selectedImage ? 'bg-[#E3E8EF] text-[#9AA4B2] cursor-not-allowed' : 'bg-[var(--color-primary)] text-white cursor-pointer'} text-base font-medium rounded-[6px]`}
          >
            {t('It was completed')}
          </button>

          </div> 
        </div>

      </div>

        <DeleteDialogPage open={open} setOpen={setOpen} handleDeleteImage={handleDeleteImage}/>

    </>
  )
}

export default NullStatusPage


