"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import OverviewPage from './Overview/page'
import TaxesPage from './Taxes/page'
import WalletPage from './wallet/page'

const menuItems = [
  { Label: 'Overview', nameKey: 'Overview' },
  { Label: 'Taxes', nameKey: 'Taxes' },
  { Label: 'wallet', nameKey: 'wallet' },
]

function FinancePage() {
  const { t } = useTranslation()
  const [selectedMenu, setSelectedMenu] = useState('Overview')

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        {/* Page title */}
        <div className="page-hero">
          <p className='text-[#364152] text-xl font-semibold leading-tight'>{t('Finance')}</p>
          <p className='text-[#697586] text-sm mt-0.5'>{t('Track your earnings, taxes, and wallet balance.')}</p>
        </div>

        {/* Main Tab Bar */}
        <div className="flex border-b border-[#E3E8EF] gap-1 w-full">
          {menuItems.map((item) => {
            const isActive = selectedMenu === item.Label
            return (
              <button
                key={item.Label}
                onClick={() => setSelectedMenu(item.Label)}
                className={`
                  relative flex items-center justify-center gap-2 px-6 py-3
                  text-sm font-medium whitespace-nowrap cursor-pointer
                  transition-colors duration-150
                  ${isActive
                    ? 'text-[var(--color-primary)]'
                    : 'text-[#4B5565] hover:text-[#364152]'}
                `}
              >
                {t(item.nameKey)}
                {/* animated underline */}
                <span className={`
                  absolute bottom-0 left-0 right-0 h-[2px] rounded-t-full
                  transition-all duration-200
                  ${isActive ? 'bg-[var(--color-primary)] opacity-100' : 'opacity-0'}
                `} />
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="page-enter">
          {selectedMenu === 'Overview' && <OverviewPage />}
          {selectedMenu === 'Taxes' && <TaxesPage />}
          {selectedMenu === 'wallet' && <WalletPage />}
        </div>
      </div>
    </MainLayout>
  )
}

export default FinancePage
