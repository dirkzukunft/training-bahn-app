// Casted result

export type Station = {
  name: string;
  id: string;
};

// Deutsche Bahn API Response Types

export type StationRoot = {
  offset: number;
  limit: number;
  total: number;
  result: StationResult[];
};

export type StationResult = {
  number: number;
  name: string;
  mailingAddress: StationMailingAddress;
  category: number;
  priceCategory: number;
  hasParking: boolean;
  hasBicycleParking: boolean;
  hasLocalPublicTransport: boolean;
  hasPublicFacilities: boolean;
  hasLockerSystem: boolean;
  hasTaxiRank: boolean;
  hasTravelNecessities: boolean;
  hasSteplessAccess: string;
  hasMobilityService: string;
  hasWiFi: boolean;
  hasTravelCenter: boolean;
  hasRailwayMission: boolean;
  hasDBLounge: boolean;
  hasLostAndFound: boolean;
  hasCarRental: boolean;
  federalState: string;
  regionalbereich: StationRegionalbereich;
  aufgabentraeger: StationAufgabentraeger;
  timeTableOffice: StationTimeTableOffice;
  szentrale: StationSzentrale;
  stationManagement: StationManagement;
  evaNumbers: StationEvaNumber[];
  ril100Identifiers: StationRil100Identifier[];
  DBinformation?: StationDbinformation;
  localServiceStaff?: StationLocalServiceStaff;
};

export type StationMailingAddress = {
  city: string;
  zipcode: string;
  street: string;
};

export type StationRegionalbereich = {
  number: number;
  name: string;
  shortName: string;
};

export type StationAufgabentraeger = {
  shortName: string;
  name: string;
};

export type StationTimeTableOffice = {
  email: string;
  name: string;
};

export type StationSzentrale = {
  number: number;
  publicPhoneNumber: string;
  name: string;
};

export type StationManagement = {
  number: number;
  name: string;
};

export type StationEvaNumber = {
  number: number;
  geographicCoordinates: StationGeographicCoordinates;
  isMain: boolean;
};

export type StationGeographicCoordinates = {
  type: string;
  coordinates: number[];
};

export type StationRil100Identifier = {
  rilIdentifier: string;
  isMain: boolean;
  hasSteamPermission: boolean;
  geographicCoordinates: StationGeographicCoordinates2;
};

export type StationGeographicCoordinates2 = {
  type: string;
  coordinates: number[];
};

export type StationDbinformation = {
  availability: StationAvailability;
};

export type StationAvailability = {
  monday: StationMonday;
  tuesday: StationTuesday;
  wednesday: StationWednesday;
  thursday: StationThursday;
  friday: StationFriday;
  saturday: StationSaturday;
  sunday: StationSunday;
  holiday: StationHoliday;
};

export type StationMonday = {
  fromTime: string;
  toTime: string;
};

export type StationTuesday = {
  fromTime: string;
  toTime: string;
};

export type StationWednesday = {
  fromTime: string;
  toTime: string;
};

export type StationThursday = {
  fromTime: string;
  toTime: string;
};

export type StationFriday = {
  fromTime: string;
  toTime: string;
};

export type StationSaturday = {
  fromTime: string;
  toTime: string;
};

export type StationSunday = {
  fromTime: string;
  toTime: string;
};

export type StationHoliday = {
  fromTime: string;
  toTime: string;
};

export type StationLocalServiceStaff = {
  availability: StationAvailability;
};
