import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styles from './CreateTestPage.module.scss';
import { AnswerVariant } from '../../components/AnswerVariant/AnswerVariant';
import { CreateCourseHead } from '../../components/CreateCourseHead/CreateCourseHead';
import { CreateAttachImg } from '../../components/CreateAttachImg/CreateAttachImg';
import { TimeRespond } from '../../components/TimeRespond/TimeRespond';
import { Plus, Check } from "lucide-react";

const initialQuestionState = {
  text: '',
  image: null,
  time: 30,
  answers: [
    { id: 1, text: '', isCorrect: false },
    { id: 2, text: '', isCorrect: false }
  ]
};

export const CreateTestPage = () => {
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [test, setTest] = useState({
    id: 1,
    title: '',
    isPublished: false,
    blocks: []
  });
  console.log(test)
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestionState);

  // Мемоизированные обработчики
  const handleTitleChange = useCallback((title) => {
    setTest(prev => ({ ...prev, title }));
  }, []);

  const handlePublishChange = useCallback((isPublished) => {
    setTest(prev => ({ ...prev, isPublished }));
  }, []);

  const handleQuestionChange = useCallback((e) => {
    setCurrentQuestion(prev => ({ ...prev, text: e.target.value }));
  }, []);

  const handleTimeChange = useCallback((time) => {
    setCurrentQuestion(prev => ({ ...prev, time }));
  }, []);

  const handleImageUpload = useCallback((image) => {
    setCurrentQuestion(prev => ({ ...prev, image }));
  }, []);

  const handleAnswerChange = useCallback((id, text) => {
    setCurrentQuestion(prev => ({
      ...prev,
      answers: prev.answers.map(answer => 
        answer.id === id ? { ...answer, text } : answer
      )
    }));
  }, []);

  const handleAnswerCorrectChange = useCallback((id) => {
    setCurrentQuestion(prev => ({
      ...prev,
      answers: prev.answers.map(answer => ({
        ...answer,
        isCorrect: answer.id === id
      }))
    }));
  }, []);

  const addAnswerVariant = useCallback(() => {
    const newId = currentQuestion.answers.length > 0 
      ? Math.max(...currentQuestion.answers.map(a => a.id)) + 1 
      : 1;
      
    setCurrentQuestion(prev => ({
      ...prev,
      answers: [
        ...prev.answers,
        { id: newId, text: '', isCorrect: false }
      ]
    }));
  }, [currentQuestion.answers.length]);

  const deleteAnswerVariant = useCallback((id) => {
    if (currentQuestion.answers.length <= 2) return;
    
    setCurrentQuestion(prev => ({
      ...prev,
      answers: prev.answers.filter(answer => answer.id !== id)
    }));
  }, [currentQuestion.answers.length]);

  const resetCurrentQuestion = useCallback(() => {
    setCurrentQuestion(initialQuestionState);
  }, []);

  const closePopup = useCallback(() => {
    setIsPopupOpen(false);
    resetCurrentQuestion();
  }, [resetCurrentQuestion]);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  }, [closePopup]);

  const addQuestion = useCallback((addAnother = false) => {
    if (!currentQuestion.text.trim()) return;
    
    const hasEmptyAnswers = currentQuestion.answers.some(a => !a.text.trim());
    const hasNoCorrectAnswer = !currentQuestion.answers.some(a => a.isCorrect);
    
    if (hasEmptyAnswers) {
      alert('Все варианты ответов должны быть заполнены');
      return;
    }
    
    if (hasNoCorrectAnswer) {
      alert('Нужно указать правильный вариант ответа');
      return;
    }
    
    const newBlock = {
      id: Date.now(),
      question: { ...currentQuestion },
      totalTime: currentQuestion.time
    };

    setTest(prev => ({
      ...prev,
      blocks: [...prev.blocks, newBlock]
    }));
    
    if (addAnother) {
      resetCurrentQuestion();
    } else {
      closePopup();
    }
  }, [currentQuestion, closePopup, resetCurrentQuestion]);

  // Эффект для управления скроллом
  useEffect(() => {
    document.body.style.overflow = isPopupOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPopupOpen]);

  // Мемоизированное отображение вопросов
  const questionsList = useMemo(() => {
    if (test.blocks.length === 0) {
      return (
        <div 
          className={styles.create_test_add_question_block}
          onClick={() => setIsPopupOpen(true)}
        >
          <span>Добавьте вопросы</span>
        </div>
      );
    }

    return test.blocks.map((block, index) => (
      <div key={block.id} className={styles.question_item}>
        <h3>Вопрос {index + 1}</h3>
        <p>{block.question.text}</p>
        {block.question.image && (
          <div className={styles.question_image}>
            <img 
              src={URL.createObjectURL(block.question.image)} 
              alt="Вопрос" 
            />
          </div>
        )}
        <p>Время: {block.question.time} сек.</p>
        <div className={styles.answers_list}>
          {block.question.answers.map((answer, i) => (
            <div 
              key={answer.id} 
              className={`${styles.answer} ${answer.isCorrect && showCorrectAnswers ? styles.correct : ''}`}
            >
              {i + 1}. {answer.text}
              {answer.isCorrect && showCorrectAnswers && (
                <span className={styles.correct_marker}>✓</span>
              )}
            </div>
          ))}
        </div>
      </div>
    ));
  }, [test.blocks, showCorrectAnswers]);

  return (
    <>
      {isPopupOpen && (
        <div className={styles.popup_overlay} onClick={handleOverlayClick}>
          <div className={styles.popup_content}>
            <h2>Добавить вопрос</h2>
            
            <div className={styles.popup_question}>
              <h3 className={styles.popup_content_title}>Вопрос</h3>
              <textarea 
                value={currentQuestion.text}
                onChange={handleQuestionChange}
                placeholder='Напишите вопрос' 
              />
            </div>
            
            <div className={styles.popup_image}>
              <h3 className={styles.popup_content_title}>Изображение</h3>
              <CreateAttachImg 
                onImageUpload={handleImageUpload} 
                currentImage={currentQuestion.image}
              />
            </div>
            
            <div className={styles.popup_time}>
              <TimeRespond 
                initialTime={currentQuestion.time} 
                onTimeChange={handleTimeChange}
              />
            </div>
            
            <div className={styles.popup_variants}>
              <h3 className={styles.popup_content_title}>Варианты ответа</h3>
              {currentQuestion.answers.map((answer) => (
                <AnswerVariant
                  key={answer.id}
                  id={answer.id}
                  text={answer.text}
                  isCorrect={answer.isCorrect}
                  onChangeText={handleAnswerChange}
                  onChangeCorrect={handleAnswerCorrectChange}
                  onDelete={deleteAnswerVariant}
                  canDelete={currentQuestion.answers.length > 2}
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
            
            <div className={styles.popup_btn}>
              <button 
                className={styles.popup_btn_close} 
                onClick={closePopup}
              >
                Отмена
              </button>
              
              <div className={styles.popup_btn_add}>
                <button onClick={() => addQuestion(false)}>Добавить</button>
                <button onClick={() => addQuestion(true)}>Добавить и создать еще один</button>
              </div>  
            </div>
          </div>
        </div>
      )}
      
      <section className={styles.create_test}>
        <CreateCourseHead 
          placeholder="Название теста" 
          value={test.title}
          onChange={handleTitleChange}
          publishStatus={test.isPublished}
          onPublishChange={handlePublishChange}
        />
        
        <div className={styles.create_test_add_question}>
          <button
            className={styles.create_test_add_question_btn}
            onClick={() => setIsPopupOpen(true)}
          >
            <Plus className="w-5 h-5" />
            Добавить вопрос
          </button>
          <div className={styles.create_test_add_question_show}>
            <input
              type="checkbox"
              id="showCorrectAnswers"
              checked={showCorrectAnswers}
              onChange={() => setShowCorrectAnswers(!showCorrectAnswers)}
              className="hidden"
            />
            <div  className={`w-5 h-5 rounded flex items-center justify-center 
              ${showCorrectAnswers ? 'bg-blue-500' : 'bg-gray-300'}`}
            >
              {showCorrectAnswers && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
            </div>
            <label htmlFor="showCorrectAnswers">
              Показывать тестируемому верные ответы
            </label>
          </div>
        </div>
        
        <div className={styles.questions_list}>
          {questionsList}
        </div>
      </section>
    </>
  );
};