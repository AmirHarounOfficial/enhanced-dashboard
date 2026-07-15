'use client'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { getScheduleThunk, updateScheduleThunk } from '@/redux/slice/Setting/SettingSlice'

function DayAndTime() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { schedule, loading, error } = useSelector((state) => state.setting)

  // الأيام
  const [selectedDays, setSelectedDays] = useState([])
  const days = [
    { id: 7, day: 'Saturday' },
    { id: 1, day: 'Sunday' },
    { id: 2, day: 'Monday' },
    { id: 3, day: 'Tuesday' },
    { id: 4, day: 'Wednesday' },
    { id: 5, day: 'Thursday' },
    { id: 6, day: 'Friday' },
  ]

  // أوقات العمل
  const [currentPeriod, setCurrentPeriod] = useState({ from: null, to: null })
  const [allTime, setAllTime] = useState(false)

  useEffect(() => {
    dispatch(getScheduleThunk())
  }, [dispatch])

  useEffect(() => {
    if (schedule && schedule.length > 0) {
      // نحول اسم اليوم من API إلى id عندنا
      const dayMap = {
        sunday: 1,
        monday: 2,
        tuesday: 3,
        wednesday: 4,
        thursday: 5,
        friday: 6,
        saturday: 7
      }

      const selected = schedule.map(item => dayMap[item.day.toLowerCase()])
      setSelectedDays(selected)

      // set time from API (نفترض انه عندنا يوم واحد)
      const todaySchedule = schedule[0]
      if (todaySchedule) {
        setCurrentPeriod({
          from: dayjs(todaySchedule.from, 'HH:mm'),
          to: dayjs(todaySchedule.to, 'HH:mm')
        })
      }
    }
  }, [schedule])

  const toggleDay = (dayId) => {
    setSelectedDays(prev =>
      prev.includes(dayId)
        ? prev.filter(id => id !== dayId)
        : [...prev, dayId]
    )
  }

  const toggleAllDays = () => {
    if (selectedDays.length === days.length) {
      setSelectedDays([])
    } else {
      setSelectedDays(days.map(day => day.id))
    }
  }

  const handleAllTimeChange = (e) => {
    const checked = e.target.checked
    setAllTime(checked)
    if (checked) {
      const startTime = dayjs().hour(0).minute(0).second(0)
      const endTime = dayjs().hour(23).minute(59).second(0)
      setCurrentPeriod({ from: startTime, to: endTime })
    } else {
      setCurrentPeriod({ from: null, to: null })
    }
  }


  //
  const handleSave = () => {
  if (!currentPeriod.from || !currentPeriod.to) return

  const dayNameMap = {
    1: 'sunday',
    2: 'monday',
    3: 'tuesday',
    4: 'wednesday',
    5: 'thursday',
    6: 'friday',
    7: 'saturday'
  }

  const formattedData = {
    days: selectedDays.map((id) => ({
      day: dayNameMap[id],
      from: currentPeriod.from.format('HH:mm'),
      to: currentPeriod.to.format('HH:mm')
    }))
  }

  dispatch(updateScheduleThunk(formattedData))
}

  return (
    <div className='p-6'>
      {/* الأيام */}
      <section>
        <div className="flex justify-between mb-6">
          <p className="text-[#4B5565] text-base font-medium">{t("days")}</p>
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              className="w-6 h-6 border border-[#E3E8EF] cursor-pointer"
              checked={selectedDays.length === days.length}
              onChange={toggleAllDays}
            />
            <p className="text-[#4B5565] text-base font-normal">{t("All days")}</p>
          </div>
        </div>
        <div className='grid grid-cols-3 gap-3'>
          {days.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleDay(item.id)}
              className={`border rounded-[6px] h-11 text-sm font-medium cursor-pointer transition-colors ${
                selectedDays.includes(item.id)
                  ? 'border-[var(--color-primary)] bg-[#F9F5E8] text-[var(--color-primary)]'
                  : 'border-[#E3E8EF] text-[#CDD5DF]'
              }`}
            >
              {t(item.day)}
            </button>
          ))}
        </div>
      </section>

      {/* الوقت */}
      <section className="mt-8">
        <div className="flex justify-between mb-6">
          <p className="text-[#4B5565] text-base font-medium">{t("the time")}</p>
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              className="w-6 h-6 border border-[#E3E8EF] cursor-pointer"
              checked={allTime}
              onChange={handleAllTimeChange}
            />
            <p className="text-[#4B5565] text-base font-normal">{t("All the time")}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* From Time */}
          <div className="flex flex-col">
            <div className="flex gap-6">
              <label className="flex items-center text-[#4B5565] text-xl font-normal whitespace-nowrap">{t("From")}</label>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ar">
                <MobileTimePicker
                  value={currentPeriod.from}
                  onChange={(newValue) => setCurrentPeriod({ ...currentPeriod, from: newValue })}
                  ampm
                  views={["hours", "minutes"]}
                />
              </LocalizationProvider>
            </div>
          </div>

          {/* To Time */}
          <div className="flex flex-col">
            <div className="flex gap-6">
              <label className="flex items-center text-[#4B5565] text-xl font-normal whitespace-nowrap">{t("To")}</label>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ar">
                <MobileTimePicker
                  value={currentPeriod.to}
                  onChange={(newValue) => setCurrentPeriod({ ...currentPeriod, to: newValue })}
                  ampm
                  views={["hours", "minutes"]}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>
      </section>

      {/* BTN*/}
      <button 
        onClick={handleSave}
        className='bg-[var(--color-primary)] text-white w-[30%] h-14 rounded-[6px] cursor-pointer'>
        {t('save')}
      </button>
    </div>
  )
}

export default DayAndTime



