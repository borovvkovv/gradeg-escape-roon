import { useEffect } from 'react';
import { useParams } from 'react-router';
import { fetchQuestBookingListAction } from '../store/api-actions';
import { getBookingInfoList } from '../store/data-process/selectors';
import { useAppDispatch } from './use-app-dispatch';
import { useAppSelector } from './use-app-selector';

export default function useGetQuestBooking() {
  const { questId: idAsString } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (idAsString) {
      dispatch(fetchQuestBookingListAction(idAsString));
    }
  }, [dispatch, idAsString]);

  const bookingInfoList = useAppSelector(getBookingInfoList);

  return { idAsString, bookingInfoList };
}
