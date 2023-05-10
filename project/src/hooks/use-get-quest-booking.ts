import { useEffect } from 'react';
import { useParams } from 'react-router';
import { fetchQuestBookingAction } from '../store/api-actions';
import { useAppDispatch } from './use-app-dispatch';

export default function useGetQuestBooking() {
  const { questId: idAsString } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (idAsString) {
      dispatch(fetchQuestBookingAction(idAsString));
    }
  }, [dispatch, idAsString]);

  return idAsString;
}
