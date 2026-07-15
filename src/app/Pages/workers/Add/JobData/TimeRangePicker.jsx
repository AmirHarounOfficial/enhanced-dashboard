'use client';
import { useState, useRef, useEffect } from 'react';


export default function TimeRangePicker({
    value = { start: '09:00', end: '17:00' },
    onChange,
    label = 'Working Hours',
    language = 'ar',
    
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [startTime, setStartTime] = useState(value.start);
    const [endTime, setEndTime] = useState(value.end);
    const [tempStart, setTempStart] = useState(value.start);
    const [tempEnd, setTempEnd] = useState(value.end);
    const [activeTab, setActiveTab] = useState('start');
    const [selectingMinutes, setSelectingMinutes] = useState(false);
    const containerRef = useRef(null);


    const isArabic = language === 'ar';
    const formatTimeTo12Hour = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        const isPM = hours >= 12;
        const display12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
        return `${String(display12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${isPM ? t.pm : t.am}`;
    };

    


    const labels = {
        ar: {
            workingHours: 'ساعات العمل',
            startTime: 'وقت البدء',
            endTime: 'وقت الانتهاء',
            hour: 'الساعة',
            minute: 'الدقيقة',
            period: 'الفترة',
            cancel: 'إلغاء',
            done: 'تم',
            duration: 'المدة:',
            error: 'يجب أن يكون وقت الانتهاء بعد وقت البدء',
            selectHours: 'اختر الساعة',
            selectMinutes: 'اختر الدقيقة',
            am: 'ص',
            pm: 'م',
        },
        en: {
            workingHours: 'Working Hours',
            startTime: 'Start Time',
            endTime: 'End Time',
            hour: 'Hour',
            minute: 'Minute',
            period: 'Period',
            cancel: 'Cancel',
            done: 'Done',
            duration: 'Duration:',
            error: 'End time must be after start time',
            selectHours: 'Select Hours',
            selectMinutes: 'Select Minutes',
            am: 'AM',
            pm: 'PM',
        },
    };



    const t = labels[language] || labels.en;


    const parseTime = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        const isPM = hours >= 12;
        const display12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
        return { hours, minutes, isPM, display12 };
    };


    const formatTime = (display12, minutes, isPM) => {
        let hours = display12 === 12 ? (isPM ? 12 : 0) : isPM ? display12 + 12 : display12;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };


    const handleApply = () => {
        if (tempStart < tempEnd) {
            setStartTime(tempStart);
            setEndTime(tempEnd);
            onChange?.({ start: tempStart, end: tempEnd });
            setIsOpen(false);
        }
    };


    const calculateDuration = (start, end) => {
        const [startHour, startMin] = start.split(':').map(Number);
        const [endHour, endMin] = end.split(':').map(Number);
        const startMinutes = startHour * 60 + startMin;
        const endMinutes = endHour * 60 + endMin;
        const diffMinutes = endMinutes - startMinutes;
        if (diffMinutes <= 0) return '0h 0m';
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;
        return `${hours}h ${minutes}m`;
    };


    const isValid = tempStart < tempEnd;


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    const ClockPicker = ({ type }) => {
        const time = type === 'start' ? tempStart : tempEnd;
        const { display12, minutes, isPM } = parseTime(time);
        const clockRef = useRef(null);


        const hours = Array.from({ length: 12 }, (_, i) => i + 1);
        const minuteMarkers = Array.from({ length: 60 }, (_, i) => i);


        const handleClockClick = (e) => {
            if (!clockRef.current) return;


            const rect = clockRef.current.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const radius = Math.min(centerX, centerY) - 15;


            const x = e.clientX - rect.left - centerX;
            const y = e.clientY - rect.top - centerY;


            let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
            if (angle < 0) angle += 360;


            if (!selectingMinutes) {
                // Hour selection (1-12)
                let hour = Math.round(angle / 30);
                if (hour === 0) hour = 12;
                const newTime = formatTime(hour, minutes, isPM);
                if (type === 'start') setTempStart(newTime);
                else setTempEnd(newTime);
            } else {
                // Minute selection (0-59)
                let minute = Math.round(angle / 6);
                if (minute === 60) minute = 0;
                const newTime = formatTime(display12, minute, isPM);
                if (type === 'start') setTempStart(newTime);
                else setTempEnd(newTime);
            }
        };


        const getClockNumber = (index) => {
            if (!selectingMinutes) {
                return hours[index];
            } else {
                return index * 5;
            }
        };


        const getAngle = (value) => {
            if (!selectingMinutes) {
                // Hour angle
                return value * 30;
            } else {
                // Minute angle
                return value * 6;
            }
        };


        const getCurrentValue = () => {
            return selectingMinutes ? minutes : display12;
        };


        return (
            <div style={styles.clockPickerContainer}>
                {/* Mode Label */}
                <div style={styles.modeLabel}>
                    {selectingMinutes ? t.selectMinutes : t.selectHours}
                </div>


                {/* Clock */}
                <svg
                    ref={clockRef}
                    width="280"
                    height="280"
                    style={styles.clock}
                    onClick={handleClockClick}
                    viewBox="0 0 280 280"
                >
                    {/* Background circle */}
                    <circle cx="140" cy="140" r="130" fill={GRAY_LIGHT} stroke={GRAY_BORDER} strokeWidth="2" />


                    {/* Hour/Minute markers */}
                    {!selectingMinutes
                        ? hours.map((hour, index) => {
                            const angle = (hour * 30 - 90) * (Math.PI / 180);
                            const x = 140 + 100 * Math.cos(angle);
                            const y = 140 + 100 * Math.sin(angle);
                            const isSelected = hour === display12;


                            return (
                                <g key={`hour-${hour}`} style={{ cursor: 'pointer' }}>
                                    <circle
                                        cx={x}
                                        cy={y}
                                        r={isSelected ? 22 : 20}
                                        fill={isSelected ? PRIMARY : 'white'}
                                        stroke={isSelected ? PRIMARY : GRAY_BORDER}
                                        strokeWidth="2"
                                    />
                                    <text
                                        x={x}
                                        y={y}
                                        textAnchor="middle"
                                        dy="0.3em"
                                        fontSize="16"
                                        fontWeight="700"
                                        fill={isSelected ? 'white' : TEXT_DARK}
                                        style={{ pointerEvents: 'none' }}
                                    >
                                        {hour}
                                    </text>
                                </g>
                            );
                        })
                        : minuteMarkers.map((minute, index) => {
                            if (minute % 5 !== 0) return null;


                            const angle = (minute * 6 - 90) * (Math.PI / 180);
                            const x = 140 + 100 * Math.cos(angle);
                            const y = 140 + 100 * Math.sin(angle);
                            const isSelected = minute === minutes;


                            return (
                                <g key={`minute-${minute}`} style={{ cursor: 'pointer' }}>
                                    <circle
                                        cx={x}
                                        cy={y}
                                        r={isSelected ? 22 : 20}
                                        fill={isSelected ? PRIMARY : 'white'}
                                        stroke={isSelected ? PRIMARY : GRAY_BORDER}
                                        strokeWidth="2"
                                    />
                                    <text
                                        x={x}
                                        y={y}
                                        textAnchor="middle"
                                        dy="0.3em"
                                        fontSize="14"
                                        fontWeight="700"
                                        fill={isSelected ? 'white' : TEXT_DARK}
                                        style={{ pointerEvents: 'none' }}
                                    >
                                        {String(minute).padStart(2, '0')}
                                    </text>
                                </g>
                            );
                        })}


                    {/* Center dot */}
                    <circle cx="140" cy="140" r="6" fill={PRIMARY} />


                    {/* Hand pointing to selected value */}
                    {
                        (() => {
                            const value = getCurrentValue();
                            const angle = (!selectingMinutes ? value * 30 : value * 6) - 90;
                            const radians = angle * (Math.PI / 180);
                            const handLength = 80;
                            const x2 = 140 + handLength * Math.cos(radians);
                            const y2 = 140 + handLength * Math.sin(radians);


                            return (
                                <line
                                    x1="140"
                                    y1="140"
                                    x2={x2}
                                    y2={y2}
                                    stroke={PRIMARY}
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    opacity="0.6"
                                />
                            );
                        })()
                    }
                </svg>


                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '30px' }}>
                    {/* AM/PM Toggle */}
                    <div style={styles.ampmContainer}>
                        <button
                            onClick={() => {
                                if (isPM) {
                                    const newTime = formatTime(display12, minutes, false);
                                    if (type === 'start') setTempStart(newTime);
                                    else setTempEnd(newTime);
                                }
                            }}
                            style={{
                                ...styles.ampmToggle,
                                ...(isPM ? {} : styles.ampmToggleActive),
                            }}
                            type="button"
                        >
                            {t.am}
                        </button>
                        <button
                            onClick={() => {
                                if (!isPM) {
                                    const newTime = formatTime(display12, minutes, true);
                                    if (type === 'start') setTempStart(newTime);
                                    else setTempEnd(newTime);
                                }
                            }}
                            style={{
                                ...styles.ampmToggle,
                                ...(isPM ? styles.ampmToggleActive : {}),
                            }}
                            type="button"
                        >
                            {t.pm}
                        </button>
                    </div>
                    {/* Time Display */}
                    <div style={styles.clockTimeDisplay}>
                        {String(display12).padStart(2, '0')}:{String(minutes).padStart(2, '0')} {isPM ? t.pm : t.am}
                    </div>


                    {/* Mode Toggle */}
                    <div style={styles.modeToggle}>
                        <button
                            onClick={() => setSelectingMinutes(false)}
                            style={{
                                ...styles.modeBtn,
                                ...(selectingMinutes ? {} : styles.modeBtnActive),
                            }}
                            type="button"
                        >
                            {t.hour}
                        </button>
                        <button
                            onClick={() => setSelectingMinutes(true)}
                            style={{
                                ...styles.modeBtn,
                                ...(selectingMinutes ? styles.modeBtnActive : {}),
                            }}
                            type="button"
                        >
                            {t.minute}
                        </button>
                    </div>


                </div>
            </div>
        );
    };


    return (
        <div
            style={{
                ...styles.outerContainer,
                direction: isArabic ? 'rtl' : 'ltr',
            }}
            ref={containerRef}
        >
            <div style={styles.container}>
                <label style={styles.label}>{label || t.workingHours}</label>


                <button
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        ...styles.mainInput,
                        ...(isOpen && styles.mainInputActive),
                    }}
                    type="button"
                >
                    <span style={styles.timeDisplayText}>
                        {formatTimeTo12Hour(startTime)} – {formatTimeTo12Hour(endTime)}
                    </span>
                    <span style={styles.durationBadge}>
                        {calculateDuration(startTime, endTime)}
                    </span>
                    <span style={styles.chevron}>▼</span>
                </button>


                {isOpen && (
                    <>
                        <div style={styles.backdrop} onClick={() => setIsOpen(false)} />
                        <div style={styles.dropdown}>
                            <div style={styles.dropdownContent}>
                                {/* Tabs */}
                                <div style={styles.tabs}>
                                    <button
                                        onClick={() => {
                                            setActiveTab('start');
                                            setSelectingMinutes(false);
                                        }}
                                        style={{
                                            ...styles.tab,
                                            ...(activeTab === 'start' ? styles.tabActive : styles.tabInactive),
                                        }}
                                        type="button"
                                    >
                                        {t.startTime}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setActiveTab('end');
                                            setSelectingMinutes(false);
                                        }}
                                        style={{
                                            ...styles.tab,
                                            ...(activeTab === 'end' ? styles.tabActive : styles.tabInactive),
                                        }}
                                        type="button"
                                    >
                                        {t.endTime}
                                    </button>
                                </div>





                                {/* Clock Picker */}
                                <ClockPicker type={activeTab} key={activeTab} />


                                {/* Error Message */}
                                {!isValid && (
                                    <div style={styles.errorMessage}>
                                        {t.error}
                                    </div>
                                )}


                                {/* Duration Preview */}
                                <div style={styles.durationPreview}>
                                    {t.duration} <strong>{calculateDuration(tempStart, tempEnd)}</strong>
                                </div>
                                                                {/* Header */}
                                <div style={styles.pickerHeader}>
                                    <button
                                        onClick={() => {
                                            setTempStart(startTime);
                                            setTempEnd(endTime);
                                            setIsOpen(false);
                                        }}
                                        style={styles.pickerHeaderBtn}
                                        type="button"
                                    >
                                        {t.cancel}
                                    </button>
                                    <button
                                        onClick={handleApply}
                                        style={{
                                            ...styles.pickerHeaderBtn,
                                            ...(isValid ? {} : styles.pickerHeaderBtnDisabled),
                                        }}
                                        disabled={!isValid}
                                        type="button"
                                    >
                                        {t.done}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}


const PRIMARY = '#C69815';
const PRIMARY_LIGHT = '#E6C969';
const PRIMARY_DARK = '#9D7510';
const GRAY_LIGHT = '#F5F3F0';
const GRAY_BORDER = '#E5E1DC';
const GRAY_TEXT = '#6B6561';
const TEXT_DARK = '#2A2824';


const styles = {
    outerContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%',
        height: '100%',
    },
    label: {
        fontSize: '16px',
        fontWeight: '400',
        color: '#364152',
    },
    mainInput: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '12px 14px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#C8C8C8',
        borderRadius: '3px',
        background: 'white',
        fontSize: '14px',
        fontWeight: '500',
        color: '#364152',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxSizing: 'border-box',
        height: '100%',
    },
    mainInputActive: {
        borderColor: PRIMARY,
        boxShadow: `0 0 0 3px ${PRIMARY}20`,
    },
    timeDisplayText: {
        flex: 1,
        textAlign: 'right',
    },
    durationBadge: {
        background: PRIMARY_LIGHT,
        color: PRIMARY_DARK,
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: '600',
        marginLeft: '10px',
        whiteSpace: 'nowrap',
    },
    chevron: {
        marginLeft: '10px',
        fontSize: '11px',
        color: GRAY_TEXT,
        whiteSpace: 'nowrap',
    },
    backdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1999,
    },
    dropdown: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'white',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: GRAY_BORDER,
        borderRadius: '12px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        zIndex: 2000,
        maxHeight: '90vh',
        overflowY: 'auto',
        width: '90%',
        maxWidth: '460px',
    },
    dropdownContent: {
        padding: '0',
    },
    tabs: {
        display: 'flex',
        gap: '0',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: GRAY_BORDER,
    },
    tab: {
        flex: 1,
        padding: '10px',
        border: 'none',
        background: 'transparent',
        fontSize: '12px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    },
    tabActive: {
        color: PRIMARY,
        borderBottomWidth: '2px',
        borderBottomStyle: 'solid',
        borderBottomColor: PRIMARY,
    },
    tabInactive: {
        color: GRAY_TEXT,
        borderBottomWidth: '2px',
        borderBottomStyle: 'solid',
        borderBottomColor: 'transparent',
    },
    pickerHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 14px',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: GRAY_BORDER,
    },
    pickerHeaderBtn: {
        padding: '12px 12px',
        border: 'none',
        background: 'transparent',
        fontSize: '12px',
        fontWeight: '600',
        color: PRIMARY,
        cursor: 'pointer',
        transition: 'color 0.2s ease',
        width: '48%',
        borderRadius: '6px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: PRIMARY,
        color: PRIMARY,
    },
    pickerHeaderBtnDisabled: {
        opacity: '0.5',
        cursor: 'not-allowed',
    },
    clockPickerContainer: {
        padding: '20px 14px',
        background: GRAY_LIGHT,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '14px',
    },
    modeLabel: {
        fontSize: '12px',
        fontWeight: '600',
        color: GRAY_TEXT,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    clock: {
        cursor: 'pointer',
        filter: `drop-shadow(0 2px 4px rgba(0, 0, 0, 0.06))`,
    },
    clockTimeDisplay: {
        fontSize: '24px',
        fontWeight: '700',
        textAlign: 'center',
        color: TEXT_DARK,
        padding: '12px 20px',
        background: 'white',
        borderRadius: '6px',
        fontFamily: 'monospace',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: PRIMARY,
        minWidth: '140px',
    },
    modeToggle: {
        display: 'flex',
        gap: '8px',
        background: 'white',
        padding: '4px',
        borderRadius: '6px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: GRAY_BORDER,
    },
    modeBtn: {
        flex: 1,
        padding: '6px 10px',
        border: 'none',
        background: 'transparent',
        fontSize: '11px',
        fontWeight: '600',
        cursor: 'pointer',
        borderRadius: '4px',
        transition: 'all 0.2s ease',
    },
    modeBtnActive: {
        background: PRIMARY,
        color: 'white',
    },
    modeBtnInactive: {
        background: 'transparent',
        color: GRAY_TEXT,
    },
    ampmContainer: {
        display: 'flex',
        gap: '6px',
        background: 'white',
        padding: '4px',
        borderRadius: '6px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: GRAY_BORDER,
    },
    ampmToggle: {
        flex: 1,
        padding: '6px 12px',
        border: 'none',
        background: 'transparent',
        fontSize: '11px',
        fontWeight: '600',
        cursor: 'pointer',
        borderRadius: '4px',
        transition: 'all 0.2s ease',
    },
    ampmToggleActive: {
        background: PRIMARY,
        color: 'white',
    },
    ampmToggleInactive: {
        background: 'transparent',
        color: GRAY_TEXT,
    },
    errorMessage: {
        fontSize: '12px',
        color: '#C53030',
        background: '#FFF5F5',
        padding: '8px 14px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#FBD8D8',
        borderRadius: '4px',
        marginBottom: '12px',
        marginLeft: '14px',
        marginRight: '14px',
    },
    durationPreview: {
        fontSize: '12px',
        color: GRAY_TEXT,
        background: GRAY_LIGHT,
        padding: '8px 14px',
        textAlign: 'center',
        borderTopWidth: '1px',
        borderTopStyle: 'solid',
        borderTopColor: GRAY_BORDER,
        borderBottomLeftRadius: '6px',
        borderBottomRightRadius: '6px',
    },
};
