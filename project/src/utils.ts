import { BookingDate } from './const';
import { Point } from './types/geo-map';

export const hasLetterAndNumber = (text: string): boolean => {
  const hasLetter = /\D/i.test(text);
  const hasNumber = /\d/.test(text);
  return hasLetter && hasNumber;
};

export const getHeadquarterGeoMapPoint = (): Point => ({
  id: '',
  location: {
    address: 'Набережная реки Карповка, д 5П',
    coords: [59.968322, 30.31735],
  },
});

export function getElementById<Type extends { id: string }>(
  array: Type[],
  id: string
): Type | null {
  return array.find((item) => item.id === id) ?? null;
}

export const cutText = (text: string, symbolsNumber: number) => {
  if (text.length > symbolsNumber) {
    return `${text.slice(0, symbolsNumber - 1)}...`;
  }
  return text;
};

export function formatDateTime(date: BookingDate, time: string): string {
  return `${date}${time.split(':')[0]}h${time.split(':')[1]}m`;
}
