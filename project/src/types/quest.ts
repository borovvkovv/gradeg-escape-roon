import { QuestGenre, QuestLevel } from '../const';

export type QuestCardInfo = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: QuestLevel;
  type: QuestGenre;
  peopleMinMax: [number, number];
};

export type QuestInfo = QuestCardInfo & {
  description: string;
  coverImg: string;
  coverImgWebp: string;
};

