import React from 'react'
import TitleOfTransactionsPage from './TitleOfTransactions/page'
import TableOfTransactionsPage from './TableOfTransactions/page'
import Pagination from './TableOfTransactions/Pagination'

function TransactionsPage({TransactionsData ,loading, pagination, onPageChange, onFilterApply}) {

  return (
    <>
      <div className='border border-[#E3E8EF] py-4 px-6 rounded-[6px] mb-12'>

        <TitleOfTransactionsPage onFilterApply={onFilterApply}/>

        <TableOfTransactionsPage TransactionsData={TransactionsData} loading={loading}/>
        <Pagination pagination={pagination} onPageChange={onPageChange}/>

      </div>
    </>
  )
}

export default TransactionsPage
