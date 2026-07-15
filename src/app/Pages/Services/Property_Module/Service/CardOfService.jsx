"use client"
import { changeStatusByIdThunk, deletePropertyThunk } from '@/redux/slice/Services/ServicesSlice';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import DeletePage from './Module/Delete/page';
import { IMAGE_BASE_URL } from '../../../../../../config/imageUrl';

const activityStatusConfig = {
  active:   { cls: 'bg-[#DCFAE6] border-[#067647] text-[#067647]',   icon: '/images/icons/Active Status.svg',        label: 'active' },
  inactive: null,
};

const approvalStatusConfig = {
  completed: { cls: 'bg-white border-[#17B26A] text-[#067647]',       icon: '/images/icons/true_green.svg',           label: 'completed' },
  pending:   { cls: 'bg-[#FFFAEB] border-[#F79009] text-[#DC6803]',   icon: '/images/icons/loading.svg',              label: 'pending' },
  draft:     { cls: 'bg-[#EFF6FF] border-[#48A1FF] text-[#48A1FF]',   icon: '/images/icons/remove-circle_babyblue.svg', label: 'draft' },
  inactive:  { cls: 'bg-[#F8FAFC] border-[#9AA4B2] text-[#9AA4B2]',  icon: '/images/icons/remove-circle_gray.svg',   label: 'inactive' },
  rejected:  { cls: 'bg-[#FEE4E2] border-[#F97066] text-[#D92D20]',  icon: '/images/icons/refused Status.svg',       label: 'rejected' },
};

function CardOfService({getProperties}) {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const toggleMenu = (index) => setOpenMenuIndex(prev => (prev === index ? null : index));

  const handleClick = (property) => {
    const newStatus = property.activity_status === "active" ? "inactive" : "active";
    dispatch(changeStatusByIdThunk({ property_id: property.id, status: newStatus }));
  };

  const handleDelete = () => {
    if (propertyToDelete) {
      dispatch(deletePropertyThunk(propertyToDelete));
      setOpenDeleteDialog(false);
      setPropertyToDelete(null);
    }
  };

  const StatusBadge = ({ cfg }) => {
    if (!cfg) return null;
    return (
      <span className={"inline-flex items-center gap-1 text-xs font-medium h-7 px-2.5 rounded-2xl border " + cfg.cls}>
        <img src={cfg.icon} alt="" className="w-3 h-3" />
        {t(cfg.label)}
      </span>
    );
  };

  return (
    <>
      {getProperties.map((property, index) => {
        const approvalStatus = property?.approval_status;
        console.log('property', property);

        let content;
        if (approvalStatus === 'completed' || approvalStatus === 'inactive') {
          content = (
            <div className='py-4 grid grid-cols-2 gap-3'>
              <div className='flex gap-1.5 items-center'>
                <img src="/images/icons/dollar-circle_gray.svg" alt="" className="w-4 h-4" />
                <p className='text-[#4B5565] text-sm'>{property?.metrics?.this_month_profit} جنيه/شهر</p>
              </div>
              <div className='flex gap-1.5 items-center'>
                <img src="/images/icons/price.svg" alt="" className="w-4 h-4" />
                <p className='text-[#4B5565] text-sm'>{property?.metrics?.this_month_occupancy}% {t('busy')}</p>
              </div>
              <div className='flex gap-1.5 items-center'>
                <img src="/images/icons/star.svg" alt="" className="w-4 h-4" />
                <p className='text-[#4B5565] text-sm'>{property?.metrics?.ratings_count} ({property?.metrics?.average_rating})</p>
              </div>
              <div className='flex gap-1.5 items-center'>
                <img src="/images/icons/price.svg" alt="" className="w-4 h-4" />
                <p className='text-[#4B5565] text-sm'>
                  {property?.metrics?.bookings_count === null ? t('No reservations') : property?.metrics?.bookings_count + t('reservation')}
                </p>
              </div>
            </div>
          );
        } else if (approvalStatus === 'pending') {
          content = (
            <div className='my-4 py-2.5 px-3 border border-[#FEC84B] bg-[#FFFAEB] rounded-[8px]'>
              <div className='flex gap-1.5 items-center mb-1'>
                <img src="/images/icons/clock_orange_bold.svg" alt="" className="w-4 h-4" />
                <p className='text-[#364152] text-sm font-medium'>{t('Under review')}</p>
              </div>
              <p className='text-[#4B5565] text-xs'>{t('Expected approval within 2-3 business days')}</p>
            </div>
          );
        } else if (approvalStatus === 'draft') {
          content = (
            <div className='my-4 py-2.5 px-3 border border-[#48A1FF] bg-[#EFF6FF] rounded-[8px]'>
              <div className='flex gap-1.5 items-center mb-1'>
                <img src="/images/icons/i_blue.svg" alt="" className="w-4 h-4" />
                <p className='text-[#364152] text-sm font-medium'>{t('Complete the numbers')}</p>
              </div>
              <p className='text-[#4B5565] text-xs'>{property?.text_to_show}</p>
            </div>
          );
        } else if (approvalStatus === 'rejected') {
          content = (
            <div className='my-4 py-2.5 px-3 border border-[#F04438] bg-[#FEE4E2] rounded-[8px]'>
              <div className='flex gap-1.5 items-center mb-1'>
                <img src="/images/icons/warning_red.svg" alt="" className="w-4 h-4" />
                <p className='text-[#364152] text-sm font-medium'>{t('Required procedure')}</p>
              </div>
              <p className='text-[#4B5565] text-xs'>{property?.text_to_show}</p>
            </div>
          );
        }

        const mainActions = property?.main_actions || [];
        const actionBtn = (enabled) => "relative group p-2.5 rounded-[6px] transition-all duration-200 " + (enabled ? "bg-[#F9F5E8] cursor-pointer hover:bg-[#F0E6C0]" : "bg-[#EEF2F6] cursor-not-allowed opacity-60");

        return (
          <section
            key={index}
            className='bg-white border border-[#E3E8EF] rounded-[8px] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200'
          >
            {/* Image and overlay */}
            <div className='relative w-full'>
              <img
                src={property?.primary_image ? `${IMAGE_BASE_URL}${property.primary_image}` : "/images/testyImage.svg"}
                alt=""
                className="w-full h-44 object-cover"
              />
              <div className='absolute top-2 right-2'>
                <StatusBadge cfg={activityStatusConfig[property?.activity_status]} />
              </div>
              <button onClick={() => toggleMenu(index)} className='absolute top-2 left-2 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full cursor-pointer hover:bg-white transition-colors duration-150'>
                <img src="/images/icons/dots.svg" alt="" />
              </button>
              {openMenuIndex === index && (
                <div className='absolute top-10 left-2 py-1 w-48 bg-white border border-[#E3E8EF] rounded-[8px] shadow-lg z-10'>
                  {(property?.side_actions?.includes('activate') || property?.side_actions?.includes('deactivate')) && (
                    <button onClick={() => handleClick(property)} className='w-full flex gap-2 items-center px-3 py-2 cursor-pointer hover:bg-[#F8FAFC] text-[#364152] text-sm'>
                      <img src="/images/icons/checkmark-circle_black.svg" className="w-4 h-4" />
                      {property?.side_actions?.includes('activate') ? t("Activate") : t("Deactivate")}
                    </button>
                  )}
                  {property?.side_actions?.includes('view_details') && (
                    <button onClick={() => router.push(`/Pages/Services/Property_Module/Service/View?id=${property.id}`)} className='w-full flex gap-2 items-center px-3 py-2 cursor-pointer hover:bg-[#F8FAFC] text-[#364152] text-sm'>
                      <img src="/images/icons/fileBlack.svg" alt="" className="w-4 h-4" />
                      {t('Property details')}
                    </button>
                  )}
                  {property?.side_actions?.includes('share') && (
                    <button className='w-full flex gap-2 items-center px-3 py-2 cursor-pointer hover:bg-[#F8FAFC] text-[#364152] text-sm'>
                      <img src="/images/icons/shareBlack.svg" alt="" className="w-4 h-4" />
                      {t('Property sharing')}
                    </button>
                  )}
                  {property?.side_actions?.includes('view_ratings') && (
                    <button className='w-full flex gap-2 items-center px-3 py-2 cursor-pointer hover:bg-[#F8FAFC] text-[#364152] text-sm'>
                      <img src="/images/icons/remove-circle-black.svg" alt="" className="w-4 h-4" />
                      {t('Property Report')}
                    </button>
                  )}
                  {property?.side_actions?.includes('remove') && (
                    <button onClick={() => { setPropertyToDelete(property?.id); setOpenDeleteDialog(true); }} className='w-full flex gap-2 items-center px-3 py-2 cursor-pointer hover:bg-[#FEE4E2] text-[#D92D20] text-sm'>
                      <img src="/images/icons/delete-darkRed.svg" alt="" className="w-4 h-4" />
                      {t('Delete property')}
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className='p-4'>
              <div className='flex gap-2 justify-between items-start mb-1'>
                <div className='flex-1 min-w-0'>
                  <p className='text-[#364152] text-base font-semibold truncate'>{property?.title}</p>
                  <div className='flex gap-1 items-center mt-0.5'>
                    <img src="/images/icons/location-gray.svg" alt="" className="w-3.5 h-3.5" />
                    <p className='text-[#697586] text-xs truncate'>{property?.area}</p>
                  </div>
                </div>
                <StatusBadge cfg={approvalStatusConfig[property?.approval_status]} />
              </div>

              {content}

              <hr className='border-[#E3E8EF] my-3' />

              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-1.5'>
                  {(approvalStatus === 'completed' || approvalStatus === 'inactive') && (
                    <>
                      <img src="/images/icons/calender.svg" className="w-4 h-4" />
                      <p className='text-[#364152] text-xs'>{property?.text_to_show}</p>
                    </>
                  )}
                </div>
                <div className='flex gap-2'>
                  <button onClick={() => mainActions.includes('view_bookings') && router.push(`/Pages/requests/Property_Module?serviceid=${property?.id}`)} className={actionBtn(mainActions.includes('view_bookings'))}>
                    <img src={mainActions.includes('view_bookings') ? "/images/icons/book-open_Yellow.svg" : "/images/icons/book-open_Gray.svg"} />
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1.5 bg-[#364152] text-white text-xs font-medium rounded-[6px] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">{t('View Bookings')}</div>
                  </button>
                  <button onClick={() => mainActions.includes('calendar') && router.push(`/Pages/Services/Property_Module/Service/Calendar?id=${property.id}`)} className={actionBtn(mainActions.includes('calendar'))}>
                    <img src={mainActions.includes('calendar') ? "/images/icons/calender_yellow.svg" : "/images/icons/calender__gray.svg"} />
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1.5 bg-[#364152] text-white text-xs font-medium rounded-[6px] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">{t('Calendar')}</div>
                  </button>
                  <button onClick={() => mainActions.includes('edit_property') && router.push(`/Pages/Services/Property_Module/Service/Edit?id=${property.id}`)} className={actionBtn(mainActions.includes('edit_property'))}>
                    <img src={mainActions.includes('edit_property') ? "/images/icons/EditYellow.svg" : "/images/icons/EditGray.svg"} />
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1.5 bg-[#364152] text-white text-xs font-medium rounded-[6px] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">{t('Edit Property')}</div>
                  </button>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <DeletePage open={openDeleteDialog} setOpen={setOpenDeleteDialog} handleDelete={handleDelete} />
    </>
  )
}

export default CardOfService
