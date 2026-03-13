"use client";

import { AlertCircle } from 'lucide-react';
import { useState, type CSSProperties } from 'react';
import styles from './timetable-section.module.css';
import {
  timetableDays,
  type DayDotTone,
  type TimetableDay,
  type TimetableEvent,
  type TimetableTone,
} from '@/src/data/timetableData';

const toneStyles: Record<TimetableTone, CSSProperties> = {
  gray: {
    '--card-bg': '#f5f5f5',
    '--card-border': 'rgba(24, 24, 24, 0.08)',
    '--card-title': 'var(--text-primary)',
    '--card-text': 'var(--text-body)',
    '--card-desc': 'var(--text-body)',
  } as CSSProperties,
  light: {
    '--card-bg': '#fefab0',
    '--card-border': 'rgba(188, 181, 72, 0.24)',
    '--card-title': 'var(--text-primary)',
    '--card-text': 'rgba(114, 102, 14, 0.82)',
    '--card-desc': 'rgba(114, 102, 14, 0.9)',
  } as CSSProperties,
  dark: {
    '--card-bg': 'var(--color-key-purple)',
    '--card-border': 'rgba(94, 127, 149, 0.24)',
    '--card-title': 'var(--text-primary)',
    '--card-text': 'rgba(32, 50, 64, 0.8)',
    '--card-desc': 'rgba(32, 50, 64, 0.9)',
  } as CSSProperties,
  accent: {
    '--card-bg': '#c7fa84',
    '--card-border': 'rgba(122, 173, 54, 0.26)',
    '--card-title': 'var(--text-primary)',
    '--card-text': 'rgba(24, 24, 24, 0.72)',
    '--card-desc': 'rgba(24, 24, 24, 0.84)',
  } as CSSProperties,
};

const dotToneClassName: Record<DayDotTone, string> = {
  dark: styles.dayDotDark,
  accent: styles.dayDotAccent,
};

const formatHourAxis = (hour: number) => {
  const meridiem = hour < 12 ? '오전' : '오후';
  const normalizedHour = hour % 12 || 12;

  return (
    <div className={styles.hourLabel}>
      <span className={`${styles.hourMeridiem} typo-h6-medium`}>{meridiem}</span>
      <span className={`${styles.hourValue} typo-h5-bold`}>{normalizedHour}시</span>
    </div>
  );
};

const formatTime = (timeText: string) => {
  const [hour, minute] = timeText.split(':').map(Number);
  const meridiem = hour < 12 ? '오전' : '오후';
  const normalizedHour = hour % 12 || 12;

  return `${meridiem} ${normalizedHour}:${minute.toString().padStart(2, '0')}`;
};

const HIDDEN_HOUR_HEIGHT = 20;

const getHourHeight = (day: TimetableDay, hour: number) =>
  day.hourHeights[hour] ??
  (day.hiddenHours.includes(hour) ? HIDDEN_HOUR_HEIGHT : day.defaultHourHeight);

const calculateRawY = (timeText: string, day: TimetableDay) => {
  const [hour, minute] = timeText.split(':').map(Number);
  let position = 0;

  for (let currentHour = day.startHour; currentHour < hour; currentHour += 1) {
    position += getHourHeight(day, currentHour);
  }

  position += (minute / 60) * getHourHeight(day, hour);
  return position;
};

const getTimelineStartOffset = (day: TimetableDay) =>
  day.timelineStart ? calculateRawY(day.timelineStart, day) : 0;

const calculateY = (timeText: string, day: TimetableDay) =>
  calculateRawY(timeText, day) - getTimelineStartOffset(day);

const calculateHeight = (event: TimetableEvent, day: TimetableDay) =>
  calculateY(event.end, day) - calculateY(event.start, day);

const getTotalHeight = (day: TimetableDay) => {
  let height = 0;

  for (let hour = day.startHour; hour < day.endHour; hour += 1) {
    height += getHourHeight(day, hour);
  }

  return height - getTimelineStartOffset(day);
};

const getEventColumnClassName = (column: TimetableEvent['column']) => {
  if (column === 'full') {
    return styles.eventSlotFull;
  }

  return column === 1 ? styles.eventSlotLeft : styles.eventSlotRight;
};

const renderDay = (day: TimetableDay) => {
  const hours = Array.from(
    { length: day.endHour - day.startHour + 1 },
    (_, index) => day.startHour + index,
  );
  const totalHeight = getTotalHeight(day);

  return (
    <div className={styles.timeline} style={{ height: `${totalHeight}px` }}>
      {hours.map((hour) => {
        const markerTop = calculateY(`${hour}:00`, day);

        if (day.hiddenHours.includes(hour) || markerTop < 0) {
          return null;
        }

        return (
          <div
            key={hour}
            className={styles.hourMarker}
            style={{ top: `${markerTop}px` }}
          >
            {formatHourAxis(hour)}
            <div className={styles.hourLine} />
          </div>
        );
      })}

      <div className={styles.eventsLayer}>
        {day.events.map((event) => (
          <div
            key={`${day.label}-${event.start}-${event.title}`}
            className={`${styles.eventSlot} ${getEventColumnClassName(event.column)}`}
            style={{
              top: `${calculateY(event.start, day)}px`,
              height: `${calculateHeight(event, day)}px`,
            }}
          >
            <article className={styles.card} style={toneStyles[event.tone]}>
              <div className={styles.cardBody}>
                <h5 data-force-ko-heading className={`${styles.cardTitle} heading-ko`}>
                  {event.title}
                </h5>
                <div className={`${styles.cardTime} typo-h6-medium`}>
                  <svg
                    className={styles.clock}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>
                    {formatTime(event.start)} ~ {formatTime(event.end)}
                  </span>
                </div>
                {event.desc ? (
                  <div className={`${styles.cardDescription} typo-h6-medium`}>{event.desc}</div>
                ) : null}
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
};

type TimetableTab = {
  label: string;
  days: TimetableDay[];
};

const timetableTabs: TimetableTab[] = (() => {
  const friday = timetableDays[0];
  const saturday = timetableDays[1];
  const sunday = timetableDays[2];

  if (!saturday && !sunday) {
    return timetableDays.map((day) => ({ label: day.label, days: [day] }));
  }

  const tabs: TimetableTab[] = [];

  if (saturday) {
    tabs.push({
      label: saturday.label,
      days: friday ? [friday, saturday] : [saturday],
    });
  }

  if (sunday) {
    tabs.push({
      label: sunday.label,
      days: [sunday],
    });
  }

  return tabs;
})();

export function TimetableSection() {
  const [activeTabLabel, setActiveTabLabel] = useState(() => timetableTabs[0]?.label ?? '');
  const activeTab = timetableTabs.find((tab) => tab.label === activeTabLabel) ?? timetableTabs[0];

  return (
    <section className={styles.section}>
      <div className={styles.shell}>
        <div className={styles.panel}>
          <div className="flex justify-center mb-[30px] pt-4">
            <div className="bg-gray-100 p-1 rounded-full inline-flex flex-wrap justify-center border border-black/5">
              {timetableTabs.map((tab) => (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTabLabel(tab.label)}
                  className={`px-8 py-2.5 rounded-full typo-h6-medium transition-colors ${
                    activeTabLabel === tab.label
                      ? 'bg-white text-black shadow-sm'
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.intro}>
            <div className={styles.heading}>
              <h2>타임테이블</h2>
            </div>
            <p className={`${styles.introBody} typo-body-medium`}>9/11(금) 15:00-17:00 사전등록 가능합니다.</p>
          </div>

          <div className={styles.days}>
            {activeTab?.days.map((day) => (
              <div
                key={day.label}
                className={`${styles.dayBlock} ${
                  day.label === '9/11 (금)' ? styles.fridayDayBlock : ''
                }`}
              >
                <div className={styles.dayHeader}>
                  <span
                    className={`${styles.dayDot} ${dotToneClassName[day.dotTone]}`}
                    aria-hidden="true"
                  />
                  <h4>{day.label}</h4>
                </div>
                {renderDay(day)}
              </div>
            ))}
          </div>

          <p className={`${styles.notice} typo-h6-medium`}>
            <AlertCircle className={styles.noticeIcon} aria-hidden="true" />
            타임테이블은 일부 변경될 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
