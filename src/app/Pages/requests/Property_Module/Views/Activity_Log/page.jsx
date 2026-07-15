"use client"
import React from 'react'
import { useTranslation } from 'react-i18next';

function Activity_logPage({ onBack }) {
  const { t } = useTranslation();

  // 🔥 mock data بدل الـ backend
  const logs = [
    {
      id: 1,
      action_type: "positive",
      created_at: "2026-04-10T10:30:00",
      action_by_data: {
        role: "employee",
        name: "Ahmed Ali"
      },
      action_data: [
        {
          text: "تم إضافة السعر",
          details_type: "LE",
          details: 250
        }
      ]
    },
    {
      id: 2,
      action_type: "negative",
      created_at: "2026-04-11T14:15:00",
      action_by_data: {
        role: "user",
        name: "Mohamed Hassan"
      },
      action_data: [
        {
          text: "تم تغيير الموعد",
          details_type: "time",
          details: "2026-04-11T18:00:00"
        }
      ]
    }
  ];

  return (
    <>
      {/* title */}
      <div className='px-6 flex gap-6 mb-5'>
        <div
          className='flex justify-center items-center cursor-pointer'
          onClick={onBack}
        >
          <p className='bg-[var(--color-primary)] w-10 h-10 flex justify-center items-center rounded-[6px]'>
            <img src="/images/icons/arrow-left-go.svg" alt="" className='w-8 h-8' />
          </p>
        </div>

        <div>
          <p className='text-[#364152] text-lg font-medium'>{t('Activity log')}</p>
          <p className='text-[#4B5565] text-sm font-normal'>
            {t('Follow up on all decisions and procedures related to the service')}
          </p>
        </div>
      </div>

      <span className="border-[0.5px] border-[#E3E8EF] mb-6" />

      <section className='px-6'>
        {logs.map((log) => {
          const action_type = log?.action_type;

          const action_by_data = [
            { id: 'employee', label: t('employee') },
            { id: 'user', label: t('user') },
            { id: 'handyman', label: t('handyman') }
          ];

          const action_by = log?.action_by_data?.role;

          const formatTime = (v) => {
            try {
              const d = new Date(v);
              return d.toLocaleTimeString("ar-EG", {
                hour: "2-digit",
                minute: "2-digit"
              });
            } catch {
              return v;
            }
          };

          const renderDetails = (item) => {
            const { details_type, details } = item;

            switch (details_type) {
              case "LE":
                return <span>{details} جنيه</span>;

              case "time":
                return <span>{formatTime(details)}</span>;

              case "rate":
                return (
                  <span className="flex items-center gap-1">
                    <span className="text-[#C69815]">★</span>
                    {details}
                  </span>
                );

              default:
                return <span>{details}</span>;
            }
          };

          const formatDate = (dateValue) => {
            if (!dateValue) return "";

            const date = new Date(dateValue);

            return date.toLocaleString("ar-EG", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true
            });
          };

          return (
            <div key={log.id} className='flex gap-4'>
              {/* icon */}
              <div className='flex flex-col items-center'>
                <div
                  className={`w-10 h-10 flex-shrink-0 flex justify-center items-center rounded-full ${
                    action_type === 'positive'
                      ? 'bg-[#DCFAE6]'
                      : 'bg-[#FEE4E2]'
                  }`}
                >
                  <img
                    src={`/images/icons/${
                      action_type === 'positive'
                        ? 'checkmark-circle-true.svg'
                        : 'checkmark-circle-false.svg'
                    }`}
                    alt=""
                  />
                </div>

                <div className='flex-1 py-1'>
                  <div className="h-full border-r border-dashed border-[#9AA4B2]"></div>
                </div>
              </div>

              {/* content */}
              <div className='w-full'>
                <div className='grid grid-cols-2 w-full'>
                  <div className='flex flex-col gap-4'>
                    <p className='text-[#364152] text-sm'>
                      {action_by_data.find(item => item.id === action_by)?.label}
                    </p>

                    <p className='text-[#697586] text-sm'>
                      {formatDate(log.created_at)}
                    </p>
                  </div>

                  <div className='flex flex-col gap-4'>
                    <p className='text-[#364152] text-sm'>
                      {log.action_by_data?.name}
                    </p>

                    {log.action_data.map((item, index) => (
                      <div key={index} className="flex flex-wrap gap-1">
                        <p className="text-[#364152] text-sm">
                          {item.text}
                        </p>

                        <p className="text-[#4B5565] text-sm">
                          {item.details && (
                            <span>({renderDetails(item)})</span>
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-0.5 border-[#E3E8EF] my-5" />
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Activity_logPage;
