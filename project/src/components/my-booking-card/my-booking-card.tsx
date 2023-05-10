import { Link } from 'react-router-dom';
import { AppRoute, BookingDateTitleMap, QuestLevelTitleMap } from '../../const';
import { MyBookingInfo } from '../../types/booking';

type MyBookingCardProps = {
  myBookingInfo: MyBookingInfo;
  onClick: (id: string) => void;
};

function MyBookingCard({
  myBookingInfo,
  onClick,
}: MyBookingCardProps): JSX.Element {
  const quest = myBookingInfo.quest;

  return (
    <div className='quest-card'>
      <div className='quest-card__img'>
        <picture>
          <source
            type='image/webp'
            srcSet={`
                      ${quest.previewImgWebp},
                      ${quest.previewImgWebp} 2x
                    `}
          />
          <img
            src={quest.previewImg}
            srcSet={`${quest.previewImg} 2x`}
            width='344'
            height='232'
            alt=''
          />
        </picture>
      </div>
      <div className='quest-card__content'>
        <div className='quest-card__info-wrapper'>
          <Link
            className='quest-card__link'
            to={AppRoute.Quest.replace(':questId', quest.id)}
          >
            {quest.title}
          </Link>
          <span className='quest-card__info'>
            {BookingDateTitleMap[myBookingInfo.date]},&nbsp;
            {myBookingInfo.time}. {myBookingInfo.location.address}
          </span>
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
            {myBookingInfo.peopleCount}&nbsp;чел
          </li>
          <li className='tags__item'>
            <svg
              width='14'
              height='14'
              aria-hidden='true'
            >
              <use xlinkHref='#icon-level'></use>
            </svg>
            {QuestLevelTitleMap[quest.level]}
          </li>
        </ul>
        <button
          className='btn btn--accent btn--secondary quest-card__btn'
          type='button'
          onClick={() => onClick(myBookingInfo.id)}
        >
          Отменить
        </button>
      </div>
    </div>
  );
}

export default MyBookingCard;
