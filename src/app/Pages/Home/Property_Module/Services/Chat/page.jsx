"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function ChatPage({ conversationsLatestUnseen }) {
  const { t } = useTranslation()

  const getTimeAgo = (date) => {
    const now = new Date()
    const past = new Date(date)
    const diffInSeconds = Math.floor((now - past) / 1000)
    if (diffInSeconds < 60) return "منذ لحظات"
    const minutes = Math.floor(diffInSeconds / 60)
    if (minutes < 60) return `منذ ${minutes} دقيقة`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `منذ ${hours} ساعة`
    const days = Math.floor(hours / 24)
    return `منذ ${days} يوم`
  }

  return (
    <div className='flex flex-col gap-3'>
      {conversationsLatestUnseen?.map((conversation) => (
        <div
          key={conversation?.conversation_id}
          className='border border-[#E3E8EF] rounded-[8px] p-4 transition-shadow duration-200 hover:shadow-sm hover:border-[var(--color-primary)]/40'
        >
          <div className='flex justify-between mb-4'>
            <div className='flex items-center gap-2'>
              <div className='w-9 h-9 flex items-center justify-center bg-[#C69815]/15 text-[#C69815] rounded-full text-sm font-semibold'>
                {conversation?.user_name?.charAt(0) ?? 'a'}
              </div>
              <div>
                <p className='text-[#364152] text-sm font-medium'>{conversation?.user_name}</p>
                <p className='text-[#697586] text-xs'>{conversation?.last_message}</p>
              </div>
            </div>
            <p className='text-[#9AA4B2] text-xs'>{getTimeAgo(conversation?.created_at)}</p>
          </div>

          <button className='border border-[var(--color-primary)] flex items-center justify-center gap-2 w-full h-11 rounded-[6px] cursor-pointer
                             transition-colors duration-150 hover:bg-[var(--color-primary)]/5 active:scale-[0.98]'>
            <span className='text-[var(--color-primary)] text-sm font-medium'>{t('Start the conversation')}</span>
            <img src="/images/icons/arrow-left-yellow.svg" className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default ChatPage
