export type TimetableTone = 'gray' | 'light' | 'dark' | 'accent';
export type TimetableColumn = 1 | 2 | 'full';
export type DayDotTone = 'dark' | 'accent';

export interface TimetableEvent {
  start: string;
  end: string;
  title: string;
  desc?: string;
  tone: TimetableTone;
  column: TimetableColumn;
}

export interface TimetableDay {
  label: string;
  dotTone: DayDotTone;
  startHour: number;
  endHour: number;
  timelineStart?: string;
  hiddenHours: number[];
  defaultHourHeight: number;
  hourHeights: Partial<Record<number, number>>;
  events: TimetableEvent[];
}

export const timetableDays: TimetableDay[] = [
  {
    label: '9/11 (금)',
    dotTone: 'dark',
    startHour: 15,
    endHour: 18,
    hiddenHours: [16, 17],
    defaultHourHeight: 60,
    hourHeights: {},
    events: [
      {
        start: '15:00',
        end: '18:00',
        title: '참가자 사전 등록',
        tone: 'gray',
        column: 'full',
      },
    ],
  },
  {
    label: '9/12 (토)',
    dotTone: 'accent',
    startHour: 7,
    endHour: 18,
    timelineStart: '07:30',
    hiddenHours: [13, 14, 16],
    defaultHourHeight: 60,
    hourHeights: {
      7: 280,
      8: 200,
      9: 160,
      10: 160,
      11: 120,
      12: 60,
      13: 20,
      14: 20,
      15: 240,
      16: 20,
      17: 100,
    },
    events: [
      {
        start: '07:30',
        end: '08:00',
        title: '참가자 등록 및 장비 체크',
        desc: '물품보관소 오픈',
        tone: 'gray',
        column: 1,
      },
      {
        start: '07:40',
        end: '08:00',
        title: '오프닝 세션',
        tone: 'dark',
        column: 2,
      },
      {
        start: '08:00',
        end: '08:50',
        title: '30K 출발',
        desc: '08:00 A그룹\n08:20 B그룹',
        tone: 'accent',
        column: 2,
      },
      {
        start: '08:50',
        end: '10:30',
        title: '20K 출발',
        desc: '08:50 A그룹\n09:10 B그룹\n09:40 C그룹\n10:00 D그룹',
        tone: 'accent',
        column: 2,
      },
      {
        start: '10:30',
        end: '12:00',
        title: '12K 출발',
        desc: '10:20 A그룹\n10:40 B그룹\n11:00 C그룹',
        tone: 'accent',
        column: 2,
      },
      {
        start: '12:00',
        end: '18:00',
        title: '기념품 수령소 오픈',
        tone: 'dark',
        column: 2,
      },
      {
        start: '15:00',
        end: '15:30',
        title: '시상식',
        desc: '30K·20K 1일차 남녀 1위',
        tone: 'light',
        column: 1,
      },
      {
        start: '17:00',
        end: '18:00',
        title: '1일차 종료',
        tone: 'gray',
        column: 1,
      },
    ],
  },
  {
    label: '9/13 (일)',
    dotTone: 'dark',
    startHour: 7,
    endHour: 18,
    timelineStart: '07:30',
    hiddenHours: [13, 14, 16],
    defaultHourHeight: 60,
    hourHeights: {
      7: 280,
      8: 280,
      9: 160,
      10: 160,
      11: 120,
      12: 60,
      13: 20,
      14: 20,
      15: 240,
      16: 20,
      17: 100,
    },
    events: [
      {
        start: '07:30',
        end: '08:00',
        title: '참가자 등록 및 장비 체크',
        desc: '물품보관소 오픈',
        tone: 'gray',
        column: 1,
      },
      {
        start: '08:30',
        end: '08:50',
        title: '오프닝 세션',
        tone: 'dark',
        column: 2,
      },
      {
        start: '08:50',
        end: '10:30',
        title: '20K 출발',
        desc: '08:50 A그룹\n09:10 B그룹\n09:40 C그룹\n10:00 D그룹',
        tone: 'accent',
        column: 2,
      },
      {
        start: '10:30',
        end: '12:00',
        title: '12K 출발',
        desc: '10:20 A그룹\n10:40 B그룹\n11:00 C그룹',
        tone: 'accent',
        column: 2,
      },
      {
        start: '12:00',
        end: '17:00',
        title: '기념품 수령소 오픈',
        tone: 'dark',
        column: 2,
      },
      {
        start: '15:00',
        end: '15:30',
        title: '시상식',
        desc: '20K 2일차 남녀 1위',
        tone: 'light',
        column: 1,
      },
      {
        start: '17:00',
        end: '18:00',
        title: '2일차 종료',
        tone: 'gray',
        column: 'full',
      },
    ],
  },
];
