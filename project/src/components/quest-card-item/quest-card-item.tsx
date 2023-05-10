import { Link } from 'react-router-dom';
import { AppRoute, QuestLevelTitleMap } from '../../const';
import { QuestCardInfo } from '../../types/quest';

type QuestCardItemProps = {
  quest: QuestCardInfo;
};

function QuestCardItem({ quest }: QuestCardItemProps): JSX.Element {
  const {
    id,
    title,
    previewImg,
    previewImgWebp,
    level,
    peopleMinMax,
  } = quest;
  const [minPeople, maxPeople] = peopleMinMax;

  return (
    <div className='quest-card'>
      <div className='quest-card__img'>
        <picture>
          <source
            type='image/webp'
            srcSet={`
                      ${previewImgWebp},
                      ${previewImgWebp} 2x
                    `}
          />
          <img
            src={previewImg}
            srcSet={`${previewImg} 2x`}
            width='344'
            height='232'
            alt='Обложка квеста.'
          />
        </picture>
      </div>
      <div className='quest-card__content'>
        <div className='quest-card__info-wrapper'>
          <Link
            className='quest-card__link'
            to={AppRoute.Quest.replace(':questId', id)}
          >
            {title}
          </Link>
        </div>
        <ul className='tags quest-card__tags'>
          <li className='tags__item'>
            <svg
              width='11'
              height='14'
              aria-hidden='true'
            >
              <use xlinkHref='#icon-person'></use>
            </svg>
            {minPeople}&ndash;{maxPeople}&nbsp;чел
          </li>
          <li className='tags__item'>
            <svg
              width='14'
              height='14'
              aria-hidden='true'
            >
              <use xlinkHref='#icon-level'></use>
            </svg>
            {QuestLevelTitleMap[level]}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default QuestCardItem;
