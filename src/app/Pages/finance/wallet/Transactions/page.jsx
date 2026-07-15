"use client"
import React from 'react'
import TableOfTransactionsPage from './TableOfTransactions/page'

function TransactionsPage({WalletTransactionsData ,loading ,error, currentPage, totalPages, handlePageChange, activeTab, setActiveTab }) {
    return (
    <>
      <div className='border border-[#E3E8EF] p-6 rounded-[6px] my-12'>
        <TableOfTransactionsPage 
          WalletTransactionsData={WalletTransactionsData} 
          loading={loading} 
          error={error}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      
    </>
  )
}

export default TransactionsPage
