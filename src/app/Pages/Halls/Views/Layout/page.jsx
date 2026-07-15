'use client'
import React, { Suspense, useEffect, useState } from 'react'
import MapLayout from './MapLayout'
import { useTranslation } from 'react-i18next'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import Cards from './Cards'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { getHallLayoutThunk, randomizeHallLayoutThunk, saveHallLayoutThunk } from '@/redux/slice/Halls/HallsSlice'
import { toast } from 'react-toastify'

function LayoutContent() {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const hallId = searchParams.get('id')

  const [selectedTableId, setSelectedTableId] = useState(null)
  const [positions, setPositions] = useState({})

  // Fetch layout from halls state
  const { getHallLayout } = useSelector((state) => state.halls)
  const hall = getHallLayout?.data?.hall
  const layoutItems = getHallLayout?.data?.items || []
  const views = getHallLayout?.data?.views || []

  const handleRefresh = () => {
    if (hallId) {
      dispatch(getHallLayoutThunk(hallId))
    }
  }

  useEffect(() => {
    if (hallId) {
      dispatch(getHallLayoutThunk(hallId)).unwrap().then((res) => {
        if (!res?.data?.items || res.data.items.length === 0) {
          dispatch(randomizeHallLayoutThunk(hallId)).unwrap().then(() => {
            dispatch(getHallLayoutThunk(hallId));
          });
        }
      });
    }
  }, [dispatch, hallId])

  // Find the selected table object to pass down
  const selectedItem = layoutItems.find(item => item.table?.id === selectedTableId)
  const selectedTable = selectedItem?.table

  const handleSaveLayout = async () => {
    const payload = {
      items: layoutItems.map(item => {
        const pos = positions[item.id] || { x: item.x, y: item.y };
        return {
          layout_item_id: item.id,
          x: parseFloat(pos.x.toFixed(2)),
          y: parseFloat(pos.y.toFixed(2)),
          width: item.width || 60,
          height: item.height || 60,
          rotation: item.rotation || 0,
          z_index: item.z_index || 1,
          meta: item.meta || {}
        };
      })
    };

    try {
      await dispatch(saveHallLayoutThunk({ hallId, data: payload })).unwrap();
      toast.success(t('Layout saved successfully'));
      handleRefresh();
    } catch (err) {
      console.error(err);
      toast.error(t('Failed to save layout'));
    }
  };

  return (
    <MainLayout>
      <div className='flex justify-between items-center mb-10'>
        <div className='flex flex-col gap-1'>
          <p className='text-[#364152] text-2xl font-medium'>{t('Creating a hall layout')}</p>
          <p className='text-[#697586] text-xl font-normal'>{t('Configuring the lounge settings')}</p>
        </div>
        
        <div className='flex items-center gap-3'>
          {hallId && (
            <button 
              onClick={() => router.push(`/Pages/Halls/Views?id=${hallId}`)} 
              className='flex justify-center items-center bg-[var(--color-primary)] w-10 h-10 rounded-[6px] cursor-pointer hover:opacity-90 transition-opacity'
            >
              <img src="/images/icons/arrow-right-go.svg" className='w-6 h-6' alt="" />
            </button>
          )}
        </div>
      </div>

      <div className='my-8'>
        <MapLayout 
          tables={layoutItems} 
          views={views}
          hallId={hallId} 
          selectedTableId={selectedTableId} 
          setSelectedTableId={setSelectedTableId}
          positions={positions}
          setPositions={setPositions}
          canvasWidth={hall?.canvas?.canvas_width || 1000}
          canvasHeight={hall?.canvas?.canvas_height || 700}
        />
      </div>

      <Cards 
        table={selectedTable} 
        hallId={hallId} 
        onRefresh={handleRefresh} 
        setSelectedTableId={setSelectedTableId} 
      />

      <div className='flex justify-end mt-8 mb-6'>
        <button
          onClick={handleSaveLayout}
          className='bg-[var(--color-primary)] text-white text-base font-medium py-3 px-8 rounded-[6px] cursor-pointer hover:opacity-90 shadow-[3px] transition-all flex items-center justify-center w-[20%] h-14'
        >
          {t('Save changes')}
        </button>
      </div>
      
    </MainLayout>
  )
}


export default function LayoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LayoutContent />
    </Suspense>
  );
}
