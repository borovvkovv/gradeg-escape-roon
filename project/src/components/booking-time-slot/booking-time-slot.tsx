import { memo } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { BookingDate } from '../../const';
import { BookingScreenInputs } from '../../types/booking';

type BookingTimeSlotProps = {
  bookingDate: BookingDate;
  bookingTime: string;
  isDisabled: boolean;
  isChecked: boolean;
  onChange: (bookingDate: BookingDate, bookingTime: string) => void;
  register: UseFormRegister<BookingScreenInputs>;
};

function BookingTimeSlot({
  bookingDate,
  bookingTime,
  isDisabled,
  isChecked,
  register,
  onChange,
}: BookingTimeSlotProps): JSX.Element {
  return (
    <label className='custom-radio booking-form__date'>
      <input
        {...register('time', {
          required: 'Необходимо выбрать время',
        })}
        type='radio'
        id={`${bookingDate}${bookingTime.split(':')[0]}h${
          bookingTime.split(':')[0]
        }m`}
        value={`${bookingDate}${bookingTime.split(':')[0]}h${
          bookingTime.split(':')[0]
        }m`}
        disabled={isDisabled}
        onChange={() => onChange(bookingDate, bookingTime)}
        checked={isChecked}
      />
      <span className='custom-radio__label'>{bookingTime}</span>
    </label>
  );
}

export default memo(
  BookingTimeSlot,
  (prevProps, nextProps) =>
    prevProps.isDisabled === nextProps.isDisabled &&
    prevProps.isChecked === nextProps.isChecked
);
