import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React from 'react'

function TechnicalSupport() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-2 mb-8">
        <p className="text-[#364152] text-2xl font-semibold">Technical Support</p>
        <p className="text-[#697586] text-sm">Get help and support for your account.</p>
      </div>
      <div className="bg-white border border-[#E3E8EF] rounded-[8px] section-enter">
        <div className="empty-state py-20">
          <div className="empty-state-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9AA4B2" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="empty-state-title">Support center coming soon</p>
          <p className="empty-state-desc">
            Our support team is available to help. Contact us through the chat icon or email.
          </p>
          <a
            href="mailto:support@zetime.co"
            className="btn-primary bg-[var(--color-primary)] text-white h-10 px-6 rounded-[6px] flex items-center gap-2 text-sm font-medium mt-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Contact Support
          </a>
        </div>
      </div>
    </MainLayout>
  )
}

export default TechnicalSupport
