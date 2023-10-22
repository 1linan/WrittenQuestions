import React from 'react';
import { useCountDown } from '@/hook/countDown';

export function CountDownDemo() {
  const { days, hours, minutes, seconds } = useCountDown(
    new Date("2024-08-22T03:35:00.000Z").getTime()
  );

  return (
    <div>
      CountDown:
       <p>
        {days}days-{hours}时-{minutes}分-{seconds}秒
      </p>
    </div>
  );
}
