"use client"
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { getmodulesThunk } from '@/redux/slice/Services/ServicesSlice'
import { setModuleIdThunk } from '@/redux/slice/Home/HomeSlice'
import { getProfileThunk } from '@/redux/slice/Setting/SettingSlice'
import { IMAGE_BASE_URL } from '../../../../../config/imageUrl'

function Module_key({ onClose }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { getmodules, loadingDetails } = useSelector((state) => state.services);

  const userData = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const current_module_key = userData ? JSON.parse(userData)?.current_module_key : null;

  useEffect(() => {
    dispatch(getmodulesThunk());
    const fetchProfile = async () => {
      try {
        const profileData = await dispatch(getProfileThunk()).unwrap();
        const updatedUser = profileData?.provider;
        if (updatedUser) {
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(updatedUser));
          window.dispatchEvent(new Event('user_updated'));
        }
      } catch (error) {
        console.error("Failed to sync profile on mount", error);
      }
    };
    fetchProfile();
  }, [dispatch]);

  useEffect(() => {
    if (getmodules.length > 0 && current_module_key) {
      const matchingModule = getmodules.find((s) => s.module_key === current_module_key);
      if (matchingModule) setSelectedService(matchingModule.id);
    }
  }, [getmodules, current_module_key]);

  const router = useRouter();
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleServiceClick = async (serviceId) => {
    setSelectedService(serviceId);
    setLoading(true);
    try {
      await dispatch(setModuleIdThunk(serviceId)).unwrap();
      const profileData = await dispatch(getProfileThunk()).unwrap();
      const updatedUser = profileData?.provider;
      if (updatedUser) {
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(updatedUser));
        window.dispatchEvent(new Event('user_updated'));
        const { national_id, status, has_subscription } = updatedUser;
        if (national_id === null) {
          router.push('/Pages/dashboard/TemporaryDashboard/CompleteSignupData');
        } else if (status === 'pending') {
          router.push('/Pages/dashboard/TemporaryDashboard/StatusOfProvider/waitingApproval');
        } else if (status === 'rejected') {
          router.push('/Pages/dashboard/TemporaryDashboard/StatusOfProvider/RejectAccount');
        } else if (status === 'active') {
          if (onClose) onClose();
          router.push(has_subscription ? '/Pages/Home' : '/Pages/dashboard/TemporaryDashboard/StatusOfProvider/AcceptAccount/');
        }
      }
    } catch (error) {
      console.error("Error updating module or fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-enter">
      <div className="flex flex-col items-center mb-10">
        <p className="text-[#364152] text-2xl font-bold mb-2">{t('Service selection')}</p>
        <p className="text-[#697586] text-sm text-center max-w-xs leading-relaxed">
          {t('Choose the service that best suits your needs')}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 stagger-children">
        {getmodules.map((service) => {
          const isSelected = selectedService === service.id;
          return (
            <button
              key={service.id}
              onClick={() => handleServiceClick(service.id)}
              disabled={loading}
              className={`
                py-8 px-4 flex flex-col items-center gap-4
                transition-all duration-200 cursor-pointer rounded-[8px]
                border-2 outline-none
                ${isSelected
                  ? 'border-[var(--color-primary)] bg-[#C69815]/6 shadow-[var(--shadow-gold)]'
                  : 'border-[#E3E8EF] bg-white hover:border-[var(--color-primary)] hover:shadow-md hover:-translate-y-0.5'}
                ${loading && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              style={{ transition: 'all 200ms cubic-bezier(0.4,0,0.2,1)' }}
            >
              <div className={`
                w-16 h-16 flex items-center justify-center rounded-[12px]
                transition-colors duration-200
                ${isSelected ? 'bg-[#C69815]/12' : 'bg-[#F8FAFC]'}
              `}>
                <img src={`${IMAGE_BASE_URL}${service?.image}`} className="w-10 h-10 object-contain" alt={service?.name} />
              </div>
              <p className={`text-sm font-semibold transition-colors duration-200 ${isSelected ? 'text-[#C69815]' : 'text-[#364152]'}`}>
                {service?.name}
              </p>
              {isSelected && (
                <span className="flex items-center gap-1.5 text-xs font-medium text-[#067647] bg-[#DCFAE6] px-2.5 py-1 rounded-full">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {t('Selected')}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Module_key;
