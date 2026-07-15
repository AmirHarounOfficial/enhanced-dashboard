"use client";
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

function CardOfActivePage({is_marketer , cardData}) {
    const {t} = useTranslation()

    const profit_change_percentage = cardData?.profit_change_percentage;
    const subscribers_change_percentage = cardData?.subscribers_change_percentage;
    const pending_profit_change_percentage = cardData?.pending_profit_change_percentage

    const [copied, setCopied] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);

  return (
    <>
    
      
      {/* total profits */}
      <section className={`border border-[#E3E8EF] rounded-[8px] py-3 px-3 ${is_marketer ? 'bg-white shadow-sm' : 'bg-[#EEF2F6]'}`}>
        {/* title */}
        <div className='flex items-center gap-3 '>
          <div className={`w-10 h-10 flex items-center justify-center rounded-[8px] ${is_marketer ? ' bg-[#B4F0CC] ' : 'bg-[#CDD5DF]'}`}>
            {is_marketer ?
            (<img src="/images/icons/earnings.svg" alt="" className='w-6 h-6' />)
            :( <img src="/images/icons/earnings_grey.svg" alt="" className='w-6 h-6' />)
            }
          </div>
          <p className='text-[#4B5565] text-base font-normal'>{t('total profits')}</p>
        </div>

        <div className='py-2.5'>
          <p className='text-[#202939] text-base font-medium'>{cardData?.total_profit}</p>
        </div>

        <div className='flex gap-1'>
          <p className='text-[#697586] text-xs font-light'>{t('Last week')}</p>
          {profit_change_percentage >=0 ? (
            <>
            <p className='flex items-center text-sm text-[#17B26A]'>
              <span className='text-xs'>{profit_change_percentage}%</span>
              <span>+</span>  
            </p>
            <p className='flex items-center'>
              <img src="/images/icons/green_arrow_up.svg" alt="" />
            </p>
            </>
          
          ):(
            <>
            <p className='flex items-center text-sm text-[#F04438]'>
              <span className='text-xs'>{profit_change_percentage}%</span>
            </p>
            <p className='flex items-center'>
              <img src="/images/icons/red_arrow_down.svg" alt="" />
            </p>
            </>
          
          )}
          
        </div>

      </section>

      <div className='grid grid-cols-2 gap-3 mt-3'>

        {/* Total number of subscribers */}
        <section className={`border border-[#E3E8EF] rounded-[8px] py-3 px-2 ${is_marketer ? 'bg-white shadow-sm' : 'bg-[#EEF2F6]'}`}>
          {/* title */}
          <div className='flex items-center gap-3 '>
            <p className={`w-10 h-10 flex items-center justify-center rounded-[8px] ${is_marketer ? ' bg-[#FEF3F2] ' : 'bg-[#CDD5DF]'}`}>
              {is_marketer ? 
              (<img src="/images/icons/user-group.svg" alt="" className='w-6 h-6' />)
              :( <img src="/images/icons/user-group_grey.svg" alt="" className='w-6 h-6' />)}
            </p>
            <p className='text-[#4B5565] text-base font-normal'>{t('Total number of subscribers')}</p>
          </div>

          <div className='py-2.5'>
            <p className='text-[#202939] text-base font-medium'>{cardData?.total_subscribers}</p>
          </div>

          <div className='flex gap-1'>
            <p className='text-[#697586] text-xs font-light'>{t('Last week')}</p>
            {subscribers_change_percentage >=0 ? (
              <>
              <p className='flex items-center text-sm text-[#17B26A]'>
                <span className='text-xs'>{subscribers_change_percentage}%</span>
                <span>+</span>  
              </p>
              <p className='flex items-center'>
                <img src="/images/icons/green_arrow_up.svg" alt="" />
              </p>
              </>
            
            ):(
              <>
              <p className='flex items-center text-sm text-[#F04438]'>
                <span className='text-xs'>{subscribers_change_percentage}%</span>
              </p>
              <p className='flex items-center'>
                <img src="/images/icons/red_arrow_down.svg" alt="" />
              </p>
              </>
            
            )}
            
          </div>

        </section> 

        {/* pending profits */}
        <section className={`border border-[#E3E8EF] rounded-[8px] py-3 px-2 ${is_marketer ? 'bg-white shadow-sm' : 'bg-[#EEF2F6]'}`}>
          {/* title */}
          <div className='flex items-center gap-3 '>
            <p className={`w-10 h-10 flex items-center justify-center rounded-[8px] ${is_marketer ? ' bg-[#B4F0CC] ' : 'bg-[#CDD5DF]'}`}>
              {is_marketer ? 
              (<img src="/images/icons/earnings.svg" alt="" className='w-6 h-6' />)
              :( <img src="/images/icons/earnings_grey.svg" alt="" className='w-6 h-6' />)
              }
            </p>
            <p className='text-[#4B5565] text-base font-normal'>{t('pending profits')}</p>
          </div>

          <div className='py-2.5'>
            <p className='text-[#202939] text-base font-medium'>{cardData?.pending_profit}</p>
          </div>

          <div className='flex gap-1'>
            <p className='text-[#697586] text-xs font-light'>{t('Last week')}</p>
            {pending_profit_change_percentage >=0 ? (
              <>
              <p className='flex items-center text-sm text-[#17B26A]'>
                <span className='text-xs'>{pending_profit_change_percentage}%</span>
                <span>+</span>  
              </p>
              <p className='flex items-center'>
                <img src="/images/icons/green_arrow_up.svg" alt="" />
              </p>
              </>
            
            ):(
              <>
              <p className='flex items-center text-sm text-[#F04438]'>
                <span className='text-xs'>{pending_profit_change_percentage}%</span>
              </p>
              <p className='flex items-center'>
                <img src="/images/icons/red_arrow_down.svg" alt="" />
              </p>
              </>
            
            )}
            
          </div>

        </section>

        {/* Total balance due */}
        <section className={`border border-[#E3E8EF] rounded-[8px] py-3 px-2 ${is_marketer ? 'bg-white shadow-sm' : 'bg-[#EEF2F6]'}`}>
          {/* title */}
          <div className='flex items-center gap-3 '>
            <p className={`w-10 h-10 flex items-center justify-center rounded-[8px] ${is_marketer ? ' bg-[#FEF0C7] ' : 'bg-[#CDD5DF]'}`}>
              {is_marketer ? 
              (<img src="/images/icons/wallet-done.svg" alt="" className='w-6 h-6' />)
              :( <img src="/images/icons/wallet-done_grey.svg" alt="" className='w-6 h-6' />)
              }
            </p>
            <p className='text-[#4B5565] text-base font-normal'>{t('Total balance due')}</p>
          </div>

          <div className='py-2.5'>
            <p className='text-[#202939] text-base font-medium'>{cardData?.available_profit}</p>
          </div>

          

        </section>

        {/* Total amount withdrawn */}
        <section className={`border border-[#E3E8EF] rounded-[8px] py-3 px-2 ${is_marketer ? 'bg-white shadow-sm' : 'bg-[#EEF2F6]'}`}>
          {/* title */}
          <div className='flex items-center gap-3 '>
            <p className={`w-10 h-10 flex items-center justify-center rounded-[8px] ${is_marketer ? ' bg-[#FEF0C7] ' : 'bg-[#CDD5DF]'}`}>
              {is_marketer ? 
              (<img src="/images/icons/Available_withdrawal.svg" alt="" className='w-6 h-6' />)
              :( <img src="/images/icons/Available_withdrawal_grey.svg" alt="" className='w-6 h-6' />)
              }
            </p>
            <p className='text-[#4B5565] text-base font-normal'>{t('Total amount withdrawn')}</p>
          </div>

          <div className='py-2.5'>
            <p className='text-[#202939] text-base font-medium'>{cardData?.total_withdrawed}</p>
          </div>

        

        </section>
      </div>

      {/* code */}
    <section className='mt-6'>
      <p className='text-[#364152] text-sm font-normal'>{t('code')}</p>
      <div className="relative mt-1.5 ">
        <input 
          type="text" 
          value={cardData?.marketer_code ?? ""}
          readOnly
          className={`w-full p-3 border border-[#E3E8EF] rounded-[8px] focus:outline-none ${is_marketer ? ' bg-white ' : 'bg-[#EEF2F6]'}`}
        />
        <button
          onClick={() => {
            if (cardData?.marketer_code) {
              navigator.clipboard.writeText(cardData.marketer_code);
              setShowSnackbar(true);

              setTimeout(() => {
                setShowSnackbar(false);
              }, 1000);
            }
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70 transition-opacity"
          title={t("Copy code")}
        >
          <img src="/images/icons/copy.svg" alt="" />
        </button>
        
      </div>

      {showSnackbar && (
        <div className='flex justify-end'>
          <div className="w-fit mt-1">
            <div className="bg-[#067647] text-white px-4 py-2 rounded-[6px] shadow-lg flex items-center gap-2 animate-slide-up">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-sm font-medium">
                {t("Copied successfully")}
              </span>
            </div>
          </div>
        </div>

      )}

    </section>

    </>
  )
}

export default CardOfActivePage
