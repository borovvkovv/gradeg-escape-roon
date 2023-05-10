import { Point } from './types/geo-map';

export const hasLetterAndNumber = (text: string): boolean => {
  const hasLetter = /\D/i.test(text);
  const hasNumber = /\d/.test(text);
  return hasLetter && hasNumber;
};

export const getHeadquarterGeoMapPoint = (): Point => ({
  id: '',
  location: {
    address: '',
    coords: [59.968322, 30.31735],
  },
});

export function getElementById<Type extends { id: string }>(
  array: Type[],
  id: string
): Type | null {
  return array.find((item) => item.id === id) ?? null;
}
