import React from 'react';
import styles from './AnswerVariant.module.scss';
import { Trash, Check, X, Plus } from "lucide-react";

export const AnswerVariant = ({
  id,
  text,
  isCorrect,
  onChangeText,
  onChangeCorrect,
  onDelete,
  canDelete = true,
}) => {
  const handleTextChange = (e) => {
    onChangeText(id, e.target.value);
  };

  const handleCorrectChange = (e) => {
    onChangeCorrect(id, e.target.value === 'correct');
  };

  return (
    <div className={`${styles.popup_variants_block} ${isCorrect ? styles.correct : styles.incorrect}`}>
      <div className={styles.answer_indicator}>
        {isCorrect ? (
          <Check size={16} className={styles.check_icon} />
        ) : (
          <X size={16} className={styles.x_icon} />
        )}
      </div>
      
      <textarea 
        className={styles.popup_variants_block_textarea} 
        placeholder='Вариант ответа'
        value={text}
        onChange={handleTextChange}
      />
      
      <div className={styles.popup_variants_block_settings}>
        <select 
          value={isCorrect ? 'correct' : 'incorrect'}
          onChange={handleCorrectChange}
          className={`${styles.answer_select} ${isCorrect ? styles.correct_select : styles.incorrect_select}`}
        >
          <option value="correct">Верный</option>
          <option value="incorrect">Неверный</option>
        </select>

        <button className={styles.add_photo_btn}>
          <Plus size={14}/>
          Фото
        </button>
      </div>
      
      {canDelete && (
        <button 
          className={styles.popup_variants_block_del}
          onClick={() => onDelete(id)}
          disabled={!canDelete}
        >
          <Trash size={18} color="rgb(224, 222, 222)" strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
};