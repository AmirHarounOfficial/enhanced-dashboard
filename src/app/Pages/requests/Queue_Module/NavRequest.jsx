import FilterBtn from '@/app/Components/Buttons/FilterBtn'
import SearchForm from '@/app/Components/Forms/SearchForm'
import { getReservationsThunk } from '@/redux/slice/Requests/RequestsSlice'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import FilterPage from './Dialog/Filter/page'

function NavRequest() {
  const { t } = useTranslation()

  const filterCardStatus = [
    { id: 1, name: t('today'),                     status: 'today' },
    { id: 2, name: t('The next one'),               status: 'upcoming' },
    { id: 3, name: t('You need to take action'),    status: 'needs_action' },
    { id: 4, name: t('Complete'),                   status: 'completed' },
  ]

  const [activeBtn, setActiveBtn] = useState(1)
  const [openFilter, setOpenFilter] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getReservationsThunk({ tab: 'today' }))
  }, [dispatch])

  const handleFilter = (item) => {
    setActiveBtn(item.id)
    dispatch(getReservationsThunk({ tab: item.status }))
  }

  return (
    <>
      <section className="flex gap-3 mb-6">
        <SearchForm placeholderKey="Search by order number" />
        <FilterBtn onClick={() => setOpenFilter(true)} />
      </section>

      <section className="flex flex-wrap gap-2 mt-6">
        {filterCardStatus?.map((item) => (
          <button
            key={item?.id}
            onClick={() => handleFilter(item)}
            className={"rounded-full h-10 px-5 cursor-pointer border text-sm font-medium transition-all duration-150 " + (
              activeBtn === item?.id
                ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[#C69815]/8'
                : 'border-[#E3E8EF] text-[#697586] hover:border-[#697586]'
            )}
          >
            {item?.name}
          </button>
        ))}
      </section>

      <FilterPage open={openFilter} setOpen={setOpenFilter} />
    </>
  )
}

export default NavRequest
