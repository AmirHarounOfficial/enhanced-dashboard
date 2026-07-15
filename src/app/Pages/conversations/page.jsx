import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React from 'react'

function ConversationsPage() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-2 mb-8">
        <p className="text-[#364152] text-2xl font-semibold">Conversations</p>
        <p className="text-[#697586] text-sm">Manage your customer conversations.</p>
      </div>
      <div className="bg-white border border-[#E3E8EF] rounded-[8px] section-enter">
        <div className="empty-state py-20">
          <div className="empty-state-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9AA4B2" strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <p className="empty-state-title">No conversations yet</p>
          <p className="empty-state-desc">Customer messages and support conversations will appear here once they start.</p>
        </div>
      </div>
    </MainLayout>
  )
}

export default ConversationsPage
