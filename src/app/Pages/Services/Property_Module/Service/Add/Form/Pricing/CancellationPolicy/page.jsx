"use client"
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function CancellationPolicyPage({formData , setFormData , getPoliciesApproved}) {

  const { t } = useTranslation()
  const inputClassName = "w-5 h-5 appearance-none border rounded-full border-[#CDD5DF] bg-white checked:border-[var(--color-primary)] relative cursor-pointer checked:after:content-[''] checked:after:w-2.5 checked:after:h-2.5 checked:after:bg-[var(--color-primary)] checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
  const [selectedPolicy, setSelectedPolicy] = useState()
  const [displayCount, setDisplayCount] = useState(4)

  useEffect(() => {
    if (getPoliciesApproved?.length > 0) {
      const defaultPolicy = getPoliciesApproved.find((policy) => policy.is_selected);

      if (defaultPolicy) {
        setSelectedPolicy(defaultPolicy.id);

        setFormData((prev) => ({
          ...prev,
          cancellation_policy_id: defaultPolicy.id,
        }));
      }
    }
  }, [getPoliciesApproved]);

  const handleSelectPolicy = (id) => {
    setSelectedPolicy(id);

    setFormData((prev) => ({
      ...prev,
      cancellation_policy_id: id,
    }));
  };
  return (
    <>
      <div className='mt-6'>
        <p className='text-[#364152] text-lg font-medium'>{t('Cancellation Policy')}</p>
        <div className='border border-[#E3E8EF] p-3 mt-6'>
          <div className='grid grid-cols-2 gap-4'>
          {getPoliciesApproved?.slice(0, displayCount).map((policy) => (
            <div
              key={policy?.id}
              className={`border p-3 cursor-pointer rounded-[6px] ${
                selectedPolicy === policy.id
                  ? 'border-[var(--color-primary)]'
                  : 'border-[#E3E8EF]'
              }`}
              onClick={() => handleSelectPolicy(policy.id)}
            >
              <div className='flex gap-2'>
                <input
                  type="radio"
                  name="cancellation_policy"
                  value={policy.id}
                  checked={selectedPolicy === policy.id}
                  onChange={() => handleSelectPolicy(policy.id)}
                  className={inputClassName}
                />

                <p className='text-[#364152] text-base font-medium'>
                  {policy?.policy_name}
                </p>
              </div>

              <p className='text-[#4B5565] text-sm font-normal mt-1'>
                {policy?.policy_content}
              </p>
            </div>
          ))}
            </div>
            {getPoliciesApproved?.length > displayCount && (
              <div className='mt-4 flex justify-center cursor-pointer'>
                <button
                  type="button"
                  onClick={() => setDisplayCount(prev => prev + 2)}
                  className='text-[var(--color-primary)] font-medium text-base hover:underline underline-offset-4'
                >
                  {t('More')}
                </button>
              </div>
            )}
        </div>
        
      </div>

    </>
  )
}

export default CancellationPolicyPage

