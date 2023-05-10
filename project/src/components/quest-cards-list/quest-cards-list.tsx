import { QuestCardInfo } from '../../types/quest';
import QuestCardItem from '../quest-card-item/quest-card-item';

type QuestCardsListProps = {
  quests: QuestCardInfo[];
}

function QuestCardsList({quests}: QuestCardsListProps): JSX.Element {
  return (
    <div className='cards-grid'>
      {quests.map((quest) => (
        <QuestCardItem
          quest={quest}
          key={quest.id}
        />
      ))}
    </div>
  );
}

export default QuestCardsList;
