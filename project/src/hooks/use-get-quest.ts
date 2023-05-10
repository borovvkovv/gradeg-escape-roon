import { useEffect } from 'react';
import { useParams } from 'react-router';
import { fetchQuestAction } from '../store/api-actions';
import { getQuest } from '../store/data-process/selectors';
import { useAppDispatch } from './use-app-dispatch';
import { useAppSelector } from './use-app-selector';

export default function useGetQuest() {
  const { questId: idAsString } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (idAsString) {
      dispatch(fetchQuestAction(idAsString));
    }
  }, [dispatch, idAsString]);

  const quest = useAppSelector(getQuest);

  return { idAsString, quest };
}
