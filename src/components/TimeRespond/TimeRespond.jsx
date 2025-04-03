import React, { useState } from 'react';
import styles from './TimeRespond.module.scss';

export const TimeRespond = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const updateTime = (part, direction) => {
    const updater = prev => {
      if (part === 'hours') {
        return direction === 'up' ? (prev + 1) % 24 : (prev - 1 + 24) % 24;
      }
      return direction === 'up' ? (prev + 1) % 60 : (prev - 1 + 60) % 60;
    };

    part === 'hours' ? setHours(updater) : setMinutes(updater);
  };

  const formatTime = (value) => value.toString().padStart(2, '0');
  return (
    <>
      <h3 className={styles.time_respond_title}>Время на ответ</h3>
      <div>
        <div className={styles.time_respond_display}>
          <div className={styles.time_respond_hours_controls}>
            <button
              className={styles.time_respond_btn_up}
              onClick={() => updateTime('hours', 'up')}
            />
            <div className={styles.time_respond_part}>{formatTime(hours)}</div>
            <button
              className={styles.time_respond_btn_down}
              onClick={() => updateTime('hours', 'down')}
            />
          </div>
          <div className={styles.time_respond_colon}>:</div>
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
        </div>
        <input
          type="text"
          value={`${formatTime(hours)}:${formatTime(minutes)}`}
          readOnly
          hidden
        />
      </div>
    </>
  );
};