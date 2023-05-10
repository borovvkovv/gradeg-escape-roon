import { useEffect, useState } from 'react';
import { getIsBookingQuestSending } from '../store/data-process/selectors';
import { useAppSelector } from './use-app-selector';

export default function useFormEnable(): boolean {

  const isBookingQuestSending = useAppSelector(getIsBookingQuestSending);

  const [isButtonEnabled, setButtonEnabled] = useState(false);

  useEffect(() => {
    if (isBookingQuestSending) {
      setButtonEnabled(false);
    } else {
      setButtonEnabled(true);
    }
  }, [isBookingQuestSending]);

  return isButtonEnabled;

}
