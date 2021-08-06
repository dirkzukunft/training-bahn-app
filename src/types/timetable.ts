// Casted result

export type TimetableItem = {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  destination: string;
  trainNumber: string;
  nextStops: string[];
};

// Deutsche Bahn API Response Types

export type TimetableAPIObject = {
  timetable: Timetable;
};

export type Timetable = {
  station: string;
  s: TimetableElement[];
};

export type TimetableElement = {
  id: string;
  tl: TimetableTl;
  ar?: TimetableAr;
  dp?: TimetableDp;
};

export type TimetableTl = {
  f?: string;
  t: string;
  o: string;
  c: string;
  n: string;
};

export type TimetableAr = {
  pt: string;
  pp: string;
  l: string;
  ppth: string;
  wings?: string;
  pde?: string;
  tra?: string;
};

export type TimetableDp = {
  pt: string;
  pp: string;
  l: string;
  ppth: string;
  wings?: string;
  pde?: string;
  tra?: string;
};
