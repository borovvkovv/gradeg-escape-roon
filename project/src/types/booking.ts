import { BookingDate, QuestGenre, QuestLevel } from '../const';

export type BookingInfo = {
  id: string;
  location: Location;
  slots: {
    [BookingDate.Today]: [TimeSlot];
    [BookingDate.Tomorrow]: [TimeSlot];
  };
};

export type TimeSlot = {
  time: string;
  isAvailable: boolean;
};

export type Location = {
  address: string;
  coords: [number, number];
};

export type InitialBookingDataInput = {
  date: BookingDate;
  time: string;
  placeId: string;
}

export type BookingDataInput = {
  date: BookingDate;
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  placeId: string;
};

export type MyBookingInfo = {
  date: BookingDate;
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  id: string;
  location: Location;
  quest: {
    id: string;
    title: string;
    previewImg: string;
    previewImgWebp: string;
    level: QuestLevel;
    type: QuestGenre;
    peopleMinMax: [number];
  };
}

export type BookingScreenInputs = {
  time: string;
  contactPerson: string;
  phone: string;
  peopleCount: number;
  agreement: boolean;
};
