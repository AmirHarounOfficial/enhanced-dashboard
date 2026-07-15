'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'

function MapLayout({ 
  tables = [], 
  views = [], 
  hallId, 
  selectedTableId, 
  setSelectedTableId,
  positions,
  setPositions,
  canvasWidth = 1000,
  canvasHeight = 700
}) {
  const { t } = t => t 
  const { t: translate } = useTranslation()
  const router = useRouter()
  const [draggingId, setDraggingId] = useState(null)

  const dragInfo = useRef({
    draggingId: null,
    dragStart: { x: 0, y: 0 },
    posStart: { x: 0, y: 0 }
  })

  const boardRef = useRef(null)

  // Sync positions state when tables from API change
  const tablesDeps = JSON.stringify(tables?.map(t => ({ id: t.id, x: t.x, y: t.y })) || []);

  useEffect(() => {
    const initialPos = {};
    tables.forEach(item => {
      initialPos[item.id] = { x: item.x || 0, y: item.y || 0 };
    });
    setPositions(initialPos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tablesDeps, setPositions]);

  // Handle global mouse/pointer movement dynamically during active dragging
  useEffect(() => {
    if (!draggingId) return;

    const handleGlobalPointerMove = (e) => {
      const { draggingId: activeId, dragStart, posStart } = dragInfo.current;
      if (!activeId) return;

      const board = boardRef.current;
      if (!board) return;

      const rect = board.getBoundingClientRect();
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      // Convert pixel deltas to percent offsets relative to board display size
      const percentX = (deltaX / rect.width) * 100;
      const percentY = (deltaY / rect.height) * 100;

      // Calculate starting position as percent of canvas coordinates
      const posStartPercentX = (posStart.x / canvasWidth) * 100;
      const posStartPercentY = (posStart.y / canvasHeight) * 100;

      let newXPercent = posStartPercentX + percentX;
      let newYPercent = posStartPercentY + percentY;

      // Boundary constraints in percentage
      newXPercent = Math.max(0, Math.min(92, newXPercent));
      newYPercent = Math.max(0, Math.min(92, newYPercent));

      // Translate back to absolute canvas coordinates
      const newX = (newXPercent / 100) * canvasWidth;
      const newY = (newYPercent / 100) * canvasHeight;

      setPositions(prev => ({
        ...prev,
        [activeId]: { x: newX, y: newY }
      }));
    };

    const handleGlobalPointerUp = () => {
      if (dragInfo.current.draggingId) {
        dragInfo.current.draggingId = null;
        setDraggingId(null);
      }
    };

    window.addEventListener('pointermove', handleGlobalPointerMove);
    window.addEventListener('pointerup', handleGlobalPointerUp);

    return () => {
      window.removeEventListener('pointermove', handleGlobalPointerMove);
      window.removeEventListener('pointerup', handleGlobalPointerUp);
    };
  }, [draggingId, canvasWidth, canvasHeight, setPositions, hallId]);



  // Helper to retrieve current table coordinate
  const getTablePosition = (item) => {
    if (positions[item.id]) {
      return positions[item.id];
    }
    return { x: item.x || 0, y: item.y || 0 };
  };

  // Start dragging handler
  const handlePointerDown = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedTableId(item.table?.id);
    setDraggingId(item.id);

    const currentPos = getTablePosition(item);
    
    dragInfo.current = {
      draggingId: item.id,
      dragStart: { x: e.clientX, y: e.clientY },
      posStart: { x: currentPos.x, y: currentPos.y }
    };
  };

  // Find views corresponding to board sides from API views structure
  const topViewItem = views.find(v => v.side === 'top')
  const bottomViewItem = views.find(v => v.side === 'bottom')
  const leftViewItem = views.find(v => v.side === 'left')
  const rightViewItem = views.find(v => v.side === 'right')

  const topView = topViewItem ? { name: topViewItem.view.name, hex_code: topViewItem.view?.hex_code } : null;
  const bottomView = bottomViewItem ? { name: bottomViewItem.view.name, hex_code: bottomViewItem.view?.hex_code } : null;
  const leftView = leftViewItem ? { name: leftViewItem.view.name, hex_code: leftViewItem.view?.hex_code } : null;
  const rightView = rightViewItem ? { name: rightViewItem.view.name, hex_code: rightViewItem.view?.hex_code } : null;

  return (
    <div className="flex flex-col gap-5 border border-[#E3E8EF] bg-white rounded-[8px] p-6 shadow-sm">

      {/* Layout Grid Board - Solid background color as Figma design */}
      <div
        ref={boardRef}
        className="relative w-full h-[500px] border border-[#E3E8EF] rounded-[6px] bg-[#EEF2F6] overflow-hidden shadow-inner"
      >
        {/* Top Side View Badge */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
          {topView ? (
            <div 
              className="flex gap-[6px] h-[45px] items-center justify-center px-[24px] py-[2px] rounded-[10px] w-[216px] text-white font-medium select-none shadow-sm cursor-pointer"
              style={{ backgroundColor: topView.hex_code || '#F04438' }}
              onClick={() => router.push(`/Pages/Halls/Views?id=${hallId}`)}
            >
              {topView.name}
            </div>
          ) : (
            <div 
              className="border border-dashed border-slate-400 text-slate-500 bg-white/80 flex gap-[6px] h-[45px] items-center justify-center px-[24px] py-[2px] rounded-[10px] w-[216px] text-xs font-normal select-none cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => router.push(`/Pages/Halls/Views?id=${hallId}`)}
            >
              + {translate('Assign Top View')}
            </div>
          )}
        </div>

        {/* Bottom Side View Badge */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          {bottomView ? (
            <div 
              className="flex gap-[6px] h-[45px] items-center justify-center px-[24px] py-[2px] rounded-[10px] w-[216px] text-white font-medium select-none shadow-sm cursor-pointer"
              style={{ backgroundColor: bottomView.hex_code || '#1485FF' }}
              onClick={() => router.push(`/Pages/Halls/Views?id=${hallId}`)}
            >
              {bottomView.name}
            </div>
          ) : (
            <div 
              className="border border-dashed border-slate-400 text-slate-500 bg-white/80 flex gap-[6px] h-[45px] items-center justify-center px-[24px] py-[2px] rounded-[10px] w-[216px] text-xs font-normal select-none cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => router.push(`/Pages/Halls/Views?id=${hallId}`)}
            >
              + {translate('Assign Bottom View')}
            </div>
          )}
        </div>

        {/* Left Side View Badge (Container rotated like Figma layout) */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[45px] h-[216px] flex items-center justify-center z-10">
          <div className="-rotate-90 flex-none">
            {leftView ? (
              <div 
                className="flex gap-[6px] h-[45px] items-center justify-center px-[12px] py-[2px] rounded-[10px] w-[216px] text-white font-medium select-none shadow-sm cursor-pointer"
                style={{ backgroundColor: leftView.hex_code || '#E9A72F' }}
                onClick={() => router.push(`/Pages/Halls/Views?id=${hallId}`)}
              >
                {leftView.name}
              </div>
            ) : (
              <div 
                className="border border-dashed border-slate-400 text-slate-500 bg-white/80 flex gap-[6px] h-[45px] items-center justify-center px-[12px] py-[2px] rounded-[10px] w-[216px] text-xs font-normal select-none cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => router.push(`/Pages/Halls/Views?id=${hallId}`)}
              >
                + {translate('Assign Left View')}
              </div>
            )}
          </div>
        </div>

        {/* Right Side View Badge (Container rotated like Figma layout) */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[45px] h-[216px] flex items-center justify-center z-10">
          <div className="-rotate-90 flex-none">
            {rightView ? (
              <div 
                className="flex gap-[6px] h-[45px] items-center justify-center px-[12px] py-[2px] rounded-[10px] w-[216px] text-white font-medium select-none shadow-sm cursor-pointer"
                style={{ backgroundColor: rightView.hex_code || '#30B952' }}
                onClick={() => router.push(`/Pages/Halls/Views?id=${hallId}`)}
              >
                {rightView.name}
              </div>
            ) : (
              <div 
                className="border border-dashed border-slate-400 text-slate-500 bg-white/80 flex gap-[6px] h-[45px] items-center justify-center px-[12px] py-[2px] rounded-[10px] w-[216px] text-xs font-normal select-none cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => router.push(`/Pages/Halls/Views?id=${hallId}`)}
              >
                + {translate('Assign Right View')}
              </div>
            )}
          </div>
        </div>

        {tables.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full gap-2 text-slate-400">
            <span className="text-4xl">🍽️</span>
            <p className="text-lg font-medium">{translate('No tables added to this hall yet.')}</p>
          </div>
        ) : (
          tables.map((item, index) => {
            const table = item.table;
            if (!table) return null;

            const pos = getTablePosition(item);
            const isSelected = selectedTableId === table.id;
            const isActive = !!table.is_active;



            // Shape styles and dimensions matching Figma EXACTLY
            let shapeClass = '';
            switch (table.shape) {
              case 'round':
                shapeClass = 'rounded-full w-[70px] h-[70px]';
                break;
              case 'oval':
                shapeClass = 'rounded-[22px] w-[90px] h-[45px]';
                break;
              case 'square':
                shapeClass = 'rounded-[5px] w-[70px] h-[70px]';
                break;
              case 'rectangle':
                shapeClass = 'rounded-[5px] w-[90px] h-[45px]';
                break;
              default:
                shapeClass = 'rounded-[5px] w-[70px] h-[70px]';
            }

            // Colors matching Figma EXACTLY: bg-[#f9f5e8] border-[#ddc173] for active, and bg-[#fcfcfd] border-[#697586] for normal/inactive
            let colorClass = '';
            if (isSelected) {
              colorClass = 'bg-[#f9f5e8] border-[#C69815] border-2 shadow-[0px_2px_8px_rgba(198,152,21,0.6)] z-20 scale-105';
            } else if (!isActive) {
              colorClass = 'bg-[#FEF3F2] text-[#F04438] border border-dashed border-[#FEE4E2] opacity-60 hover:opacity-80';
            } else {
              colorClass = 'bg-[#fcfcfd] border-[#697586] border-[0.5px] hover:border-slate-500 hover:shadow-md';
            }

            // Convert coordinates to percentages for drawing on the responsive container
            const leftPercent = (pos.x / canvasWidth) * 100;
            const topPercent = (pos.y / canvasHeight) * 100;

            return (
              <div
                key={item.id}
                onPointerDown={(e) => handlePointerDown(e, item)}
                className={`absolute select-none cursor-move flex flex-col justify-center items-center text-black font-sans transition-all duration-100 ${shapeClass} ${colorClass}`}
                style={{
                  left: `${leftPercent}%`,
                  top: `${topPercent}%`,
                  transform: draggingId === item.id ? 'scale(1.08)' : '',
                }}
              >
                {/* Drag Handle Icon on Top Left (when hovered or selected) */}
                {isSelected && (
                  <div className="absolute top-1 left-1.5 w-3 h-3 opacity-60">
                    <img src="/images/icons/edit.svg" className="w-full h-full" alt="" />
                  </div>
                )}

                {/* Table Code */}
                <span className="text-xs font-semibold leading-none">{table.code}</span>
                
                {/* Seat Capacity Row */}
                <div className="flex items-center gap-0.5 mt-1 h-3 justify-center">
                  <img src="/images/icons/user-group_grey.svg" className="w-3.5 h-3.5 opacity-80" alt="" />
                  <span className="text-[10px] font-medium leading-none text-slate-700">{table.capacity}</span>
                </div>

                {/* Arrow view direction indicator (if any view has side set) */}
                {table.side && (
                  <span className="absolute bottom-1 right-1 text-[10px] opacity-65">
                    {table.side === 'right' && '➡️'}
                    {table.side === 'left' && '⬅️'}
                    {table.side === 'top' && '⬆️'}
                    {table.side === 'bottom' && '⬇️'}
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  )
}

export default MapLayout
