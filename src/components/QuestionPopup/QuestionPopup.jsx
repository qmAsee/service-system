import React from 'react';
import { CreateAttachImg } from '../../components/CreateAttachImg/CreateAttachImg';
import { TimeRespond } from '../../components/TimeRespond/TimeRespond';
import { AnswerVariant } from '../../components/AnswerVariant/AnswerVariant';
import { Plus } from "lucide-react";
import styles from './QuestionPopup.module.scss';

export const QuestionPopup = ({ 
  isOpen, 
  onClose, 
  question, 
  isEditing, 
  onSave, 
  setQuestion,
  showCorrectAnswers,
  isOpenQuestion = false
}) => {
  if (!isOpen) return null;

  const handleQuestionChange = (e) => {
    setQuestion(prev => ({ ...prev, question: e.target.value }));
  };

  const handleCommentChange = (e) => {
    setQuestion(prev => ({ ...prev, hint: e.target.value }));
  };

  const handleCorrectAnswerChange = (e) => {
    setQuestion(prev => ({ ...prev, correctAnswers: e.target.value }));
  };

  const handleTimeChange = (totalTime) => {
    setQuestion(prev => ({ ...prev, totalTime }));
  };

  const handleImageUpload = (image) => {
    image = URL.createObjectURL(image); 
    setQuestion(prev => ({ ...prev, image }));
  };

  const handleAnswerChange = (id, text) => {
    setQuestion(prev => ({
      ...prev,
      options: prev.options.map(option => 
        option.id === id ? { ...option, text } : option
      )
    }));
  };

  const handleAnswerCorrectChange = (id) => {
    setQuestion(prev => ({
      ...prev,
      options: prev.options.map(option => ({
        ...option,
        isCorrect: option.id === id
      }))
    }));
  };

  const addAnswerVariant = () => {
    const newId = question.options.length > 0 
      ? Math.max(...question.options.map(o => o.id)) + 1 
      : 1;
      
    setQuestion(prev => ({
      ...prev,
      options: [
        ...prev.options,
        { id: newId, text: '', isCorrect: false }
      ]
    }));
  };

  const deleteAnswerVariant = (id) => {
    if (question.options.length <= 2) return;
    
    setQuestion(prev => ({
      ...prev,
      options: prev.options.filter(option => option.id !== id)
    }));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSave = (addAnother = false) => {
    onSave(question, isEditing, addAnother);
  };

  return (
    <div className={styles.popup_overlay} onClick={handleOverlayClick}>
      <div className={styles.popup_content}>
        <h2>{isEditing ? 'Редактировать вопрос' : 'Добавить вопрос'}</h2>
        
        <div className={styles.popup_question}>
          <h3 className={styles.popup_content_title}>Вопрос *</h3>
          <textarea
            value={question.question}
            onChange={handleQuestionChange}
            placeholder='Напишите вопрос'
            rows={3}
            required
          />
        </div>

        <div className={styles.popup_image}>
          <h3 className={styles.popup_content_title}>Изображение</h3>
          <CreateAttachImg
            onImageUpload={handleImageUpload}
            currentImage={question.image}
          />
        </div>

        <div className={styles.popup_time}>
          <TimeRespond
            initialTime={question.totalTime}
            onTimeChange={handleTimeChange}
          />
        </div>

        {isOpenQuestion ? (
          <div className={styles.popup_correct_answer}>
            <h3 className={styles.popup_content_title}>Правильный ответ *</h3>
            <textarea
              value={question.correctAnswers}
              onChange={handleCorrectAnswerChange}
              placeholder='Введите правильный ответ'
              rows={2}
              required
            />
          </div>
        ) : (
          <>
            <div className={styles.popup_variants}>
              <h3 className={styles.popup_content_title}>Варианты ответа *</h3>
              {question.options.map((option) => (
                <AnswerVariant
                  key={option.id}
                  id={option.id}
                  text={option.text}
                  isCorrect={option.isCorrect}
                  onChangeText={handleAnswerChange}
                  onChangeCorrect={handleAnswerCorrectChange}
                  onDelete={deleteAnswerVariant}
                  canDelete={question.options.length > 2}
                  showCorrect={showCorrectAnswers}
                />
              ))}
            </div>
            <div className={styles.popup_variants_btn}>
              <button onClick={addAnswerVariant}>
                <Plus size={14} />
                Добавить ответ
              </button>
            </div>
          </>
        )}

        <div className={styles.popup_comment}>
          <h3 className={styles.popup_content_title}>Комментарий</h3>
          <textarea
            value={question.hint}
            onChange={handleCommentChange}
            placeholder='Оставьте подсказку для тестируемых, где искать правильный ответ'
            rows={2}
          />
        </div>

        <div className={styles.popup_btn}>
          <button
            className={styles.popup_btn_close}
            onClick={onClose}
          >
            Отмена
          </button>
          <div className={styles.popup_btn_add}>
            <button onClick={() => handleSave(false)}>
              {isEditing ? 'Сохранить' : 'Добавить'}
            </button>
            {!isEditing && (
              <button onClick={() => handleSave(true)}>
                Добавить и создать еще один
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};