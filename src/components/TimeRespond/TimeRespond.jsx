import React, { useState, useEffect } from 'react';
import styles from './TimeRespond.module.scss';

export const TimeRespond = ({ onTimeChange }) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const updateTime = (part, direction) => {
    const updater = prev => {
      if (part === 'minutes') {
        return direction === 'up' ? (prev + 1) % 24 : (prev - 1 + 24) % 24;
      }
      return direction === 'up' ? (prev + 1) % 60 : (prev - 1 + 60) % 60;
    };

    part === 'minutes' ? setMinutes(updater) : setSeconds(updater);
  };

  const formatTime = (value) => value.toString().padStart(2, '0');
  // console.log(minutes, seconds)
  useEffect(() => {
    const totalSeconds = minutes * 60 + seconds;
    onTimeChange(totalSeconds);
  }, [minutes, seconds])

  return (
    <>
      <h3 className={styles.time_respond_title}>Время на ответ</h3>
      <div>
        <div className={styles.time_respond_display}>
          <div className={styles.time_respond_minutes_controls}>
            <button
              className={styles.time_respond_btn_up}
              onClick={() => updateTime('minutes', 'up')}
            />
            <div className={styles.time_respond_part}>{formatTime(minutes)}</div>
            <button
              className={styles.time_respond_btn_down}
              onClick={() => updateTime('minutes', 'down')}
            />
          </div>
          <div className={styles.time_respond_colon}>:</div>
          <div className={styles.time_respond_seconds_controls}>
            <button
              className={styles.time_respond_btn_up}
              onClick={() => updateTime('seconds', 'up')}
            />
            <div className={styles.time_respond_part}>{formatTime(seconds)}</div>
            <button
              className={styles.time_respond_btn_down}
              onClick={() => updateTime('seconds', 'down')}
            />
          </div>
        </div>
        <input
          type="text"
          value={`${formatTime(minutes)}:${formatTime(seconds)}`}
          readOnly
          hidden
        />
      </div>
    </>
  );
};