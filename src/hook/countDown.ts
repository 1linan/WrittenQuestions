import { useEffect, useState } from 'react';

const oneDay = 1000 * 60 * 60 * 24;
const oneHour = 1000 * 60 * 60;
const oneMinute = 1000 * 60;
const oneSecond = 1000;

let timer: number | null = null;
export function useCountDown(endDate: number) {
  const [days, setDay] = useState('00');
  const [hours, setHour] = useState('00');
  const [minutes, setMinute] = useState('00');
  const [seconds, setSecond] = useState('00');

  const [endTime] = useState(endDate);

  useEffect(() => {
    const setLeftTime = () => {
      const nowTime = Math.ceil(new Date().getTime());
      const diff = endTime - nowTime;
      let msec = diff;
      const d = Math.floor(msec / oneDay);
      msec -= d * oneDay;
      const hh = Math.floor(msec / oneHour);
      msec -= hh * oneHour;
      const mm = Math.floor(msec / oneMinute);
      msec -= mm * oneMinute;
      const ss = Math.floor(msec / oneSecond);
      msec -= ss * oneSecond;
      setDay(`${d}`.replace(/^\d$/, '0$&'));
      setHour(`${hh}`.replace(/^\d$/, '0$&'));
      setMinute(`${mm}`.replace(/^\d$/, '0$&'));
      setSecond(`${ss}`.replace(/^\d$/, '0$&'));

      timer = requestAnimationFrame(setLeftTime);

      if (endTime < nowTime) {
        console.log('销毁');
        return cancelAnimationFrame(timer);
      }
      // console.log(`${mm}`.replace(/^\d$/, '0$&'),`${ss}`.replace(/^\d$/, '0$&'))
    };

    if (endTime && endTime > Math.ceil(new Date().getTime())) {
      timer = requestAnimationFrame(setLeftTime);
    }

    return () => {
      // 清除定时器
      console.log('销毁@——@');
      if (timer) cancelAnimationFrame(timer);
    };
  }, [endTime]);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}
