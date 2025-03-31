import React, { useState } from 'react';
import styles from './AnswerVariant.module.scss';
import { Plus, Trash, Check, X } from "lucide-react";

export const AnswerVariant = ({ onDelete }) => {
  const [answerType, setAnswerType] = useState('correct');

  const handleAnswerTypeChange = (e) => {
    setAnswerType(e.target.value);
  };

  return (
    <div className={`${styles.popup_variants_block} ${answerType === 'incorrect' ? styles.incorrect : styles.correct}`}>
      <div className={styles.answer_indicator}>
        {answerType === 'correct' ? (
          <Check size={16} className={styles.check_icon} />
        ) : (
          <X size={16} className={styles.x_icon} />
        )}
      </div>
      <textarea 
        className={styles.popup_variants_block_textarea} 
        placeholder='Вариант ответа'
      />
      <div className={styles.popup_variants_block_settings}>
        <select 
          value={answerType}
          onChange={handleAnswerTypeChange}
          className={`${styles.answer_select} ${answerType === 'incorrect' ? styles.incorrect_select : styles.correct_select}`}
        >
          <option value="correct">Верный</option>
          <option value="incorrect">Неверный</option>
        </select>
        <button className={styles.add_photo_btn}>
          <Plus size={14}/>
          Фото
        </button>
      </div>
      <button 
        className={styles.popup_variants_block_del}
        onClick={onDelete}
      >
        <Trash size={18} color="rgb(224, 222, 222)" strokeWidth={1.5} />
      </button>
    </div>
  );
};