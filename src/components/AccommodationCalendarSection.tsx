import { Fragment } from "react";
import { AlertCircle } from "lucide-react";

type CalendarEventTone = "event" | "holiday";

type CalendarEvent = {
  label: string;
  tone: CalendarEventTone;
};

type CalendarCell = {
  day: string;
  muted?: boolean;
  events?: CalendarEvent[];
};

const weekHeader = ["일", "월", "화", "수", "목", "금", "토"];

const septemberCalendar: CalendarCell[][] = [
  [
    { day: "30", muted: true },
    { day: "31", muted: true },
    { day: "1" },
    { day: "2" },
    { day: "3" },
    { day: "4" },
    { day: "5" },
  ],
  [
    { day: "6" },
    { day: "7" },
    { day: "8" },
    { day: "9" },
    { day: "10" },
    { day: "11", events: [{ label: "행사 일정", tone: "event" }] },
    { day: "12", events: [{ label: "행사 일정", tone: "event" }] },
  ],
  [
    { day: "13", events: [{ label: "행사 일정", tone: "event" }] },
    { day: "14" },
    { day: "15" },
    { day: "16" },
    { day: "17" },
    { day: "18" },
    { day: "19" },
  ],
  [
    { day: "20" },
    { day: "21" },
    { day: "22" },
    { day: "23" },
    { day: "24", events: [{ label: "추석", tone: "holiday" }] },
    { day: "25", events: [{ label: "추석", tone: "holiday" }] },
    { day: "26", events: [{ label: "추석", tone: "holiday" }] },
  ],
  [
    { day: "27" },
    { day: "28" },
    { day: "29" },
    { day: "30" },
    { day: "1", muted: true },
    { day: "2", muted: true },
    { day: "3", muted: true },
  ],
];

const weekdayClass = (index: number) => {
  if (index === 0) return "text-[#FF9000]";
  if (index === 6) return "text-[#FF9000]";
  return "text-gray-500";
};

type AccommodationCalendarSectionProps = {
  embedded?: boolean;
  selectableDays?: number[];
  selectedCheckInDay?: number | null;
  selectedCheckOutDay?: number | null;
  onSelectDay?: (day: number) => void;
};

export default function AccommodationCalendarSection({
  embedded = false,
  selectableDays = [],
  selectedCheckInDay = null,
  selectedCheckOutDay = null,
  onSelectDay,
}: AccommodationCalendarSectionProps) {
  const visibleCalendarWeeks = septemberCalendar.filter((week) => week.some((cell) => !cell.muted));
  const selectableDaySet = new Set(selectableDays);
  const WrapperTag = embedded ? "div" : "section";
  const wrapperClassName = embedded
    ? "accommodation-calendar"
    : "accommodation-calendar layout-pad border-t border-black/10 bg-white md:bg-gray-50";
  const containerClassName = embedded
    ? "accommodation-calendar-wrap"
    : "accommodation-calendar-wrap max-w-[80rem] mx-auto";

  return (
    <WrapperTag
      data-section="accommodation-calendar"
      className={wrapperClassName}
    >
      <div
        data-block="accommodation-calendar-wrap"
        className={containerClassName}
      >
        <div className="rounded-[2rem] transition-colors" data-role="accommodation-calendar">
          <div
            className="overflow-hidden rounded-[1.5rem] border border-gray-200 bg-white"
            data-role="accommodation-calendar-shell"
          >
            <table
              className="w-full table-fixed border-collapse md:min-w-[46rem]"
              data-role="accommodation-calendar-table"
            >
              <thead>
                <tr className="bg-[#F5F5F5]" data-role="accommodation-calendar-head-row">
                  {weekHeader.map((day, dayIndex) => (
                    <th
                      key={day}
                      data-role="accommodation-calendar-head-cell"
                      className={`border-b border-gray-200 px-1.5 py-3 text-center typo-h6-bold md:px-3 ${weekdayClass(dayIndex)}`}
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleCalendarWeeks.map((week, rowIndex) => {
                  const isLastVisibleWeek = rowIndex === visibleCalendarWeeks.length - 1;

                  return (
                    <Fragment key={`week-${rowIndex}`}>
                      <tr key={`week-days-${rowIndex}`}>
                        {week.map((cell, colIndex) => {
                          const dayNumber = Number(cell.day);
                          const isSelectable = !cell.muted && selectableDaySet.has(dayNumber) && Boolean(onSelectDay);
                          const isCheckInSelected = !cell.muted && selectedCheckInDay === dayNumber;
                          const isCheckOutSelected = !cell.muted && selectedCheckOutDay === dayNumber;

                          return (
                            <td
                              key={`cell-${rowIndex}-${colIndex}`}
                              data-role="accommodation-calendar-day-cell"
                              data-muted={cell.muted ? "true" : "false"}
                              data-selectable={isSelectable ? "true" : "false"}
                              data-selected={isCheckInSelected || isCheckOutSelected ? "true" : "false"}
                              className={`h-14 align-top px-1 py-2 md:h-20 md:px-3 md:py-3 ${
                                colIndex !== weekHeader.length - 1 ? "border-r border-gray-200" : ""
                              } ${!isLastVisibleWeek ? "border-b border-gray-200" : ""} ${
                                cell.muted
                                  ? "bg-gray-50 text-gray-400"
                                  : isCheckInSelected
                                    ? "bg-black text-white"
                                    : isCheckOutSelected
                                      ? "bg-[#F5F5F5] text-black"
                                      : isSelectable
                                        ? "bg-white text-black"
                                        : "bg-gray-50 text-gray-300"
                              }`}
                            >
                              <div className="flex h-full flex-col items-end justify-between">
                                {!cell.muted ? (
                                  isSelectable ? (
                                    <button
                                      type="button"
                                      onClick={() => onSelectDay?.(dayNumber)}
                                      data-role="accommodation-calendar-day-button"
                                      aria-pressed={isCheckInSelected}
                                      className="flex h-full w-full flex-col items-end justify-between text-right transition-colors"
                                    >
                                      <span
                                        className={`typo-h6-bold ${
                                          isCheckInSelected
                                            ? "text-white"
                                            : isCheckOutSelected
                                              ? "text-black"
                                              : "text-black hover:text-black/70"
                                        }`}
                                      >
                                        {cell.day}
                                      </span>
                                      {isCheckInSelected ? (
                                        <span className="typo-h6-caption text-white/70">체크인</span>
                                      ) : isCheckOutSelected ? (
                                        <span className="typo-h6-caption text-black/60">체크아웃</span>
                                      ) : null}
                                    </button>
                                  ) : (
                                    <div className="flex h-full w-full flex-col items-end justify-between text-right">
                                      <span
                                        data-role="accommodation-calendar-day-badge"
                                        className={
                                          isCheckInSelected
                                            ? "typo-h6-bold text-white"
                                            : isCheckOutSelected
                                              ? "typo-h6-bold text-black"
                                              : isSelectable
                                                ? "typo-h6-bold text-black"
                                                : "typo-h6-bold text-gray-300"
                                        }
                                      >
                                        {cell.day}
                                      </span>
                                      {isCheckInSelected ? (
                                        <span className="typo-h6-caption text-white/70">체크인</span>
                                      ) : isCheckOutSelected ? (
                                        <span className="typo-h6-caption text-black/60">체크아웃</span>
                                      ) : null}
                                    </div>
                                  )
                                ) : null}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="typo-h6-medium text-gray-400 mt-6 flex items-center gap-2">
            <AlertCircle size={16} />
            상기 내용은 운영 상황에 따라 일부 변경될 수 있습니다.
          </p>
        </div>
      </div>
    </WrapperTag>
  );
}
