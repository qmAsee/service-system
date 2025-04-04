import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styles from './CreateTestPage.module.scss';
import { CustomBreadcrumb } from '../../components/CustomBreadcrumb/CustomBreadcrumb';
import { AnswerVariant } from '../../components/AnswerVariant/AnswerVariant';
import { CreateCourseHead } from '../../components/CreateCourseHead/CreateCourseHead';
import { CreateAttachImg } from '../../components/CreateAttachImg/CreateAttachImg';
import { TimeRespond } from '../../components/TimeRespond/TimeRespond';
import { Plus, Check, MoveRight } from "lucide-react";
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateCourse } from '@/store/slices/courseSlice';
import { useNavigate } from 'react-router-dom';

const initialQuestionState = {
  id: Date.now(),
  text: '',
  image: null,
  totalTime: 30,
  answers: [
    { id: 1, text: '', isCorrect: false },
    { id: 2, text: '', isCorrect: false }
  ]
};

export const CreateTestPage = () => {
  const dispatch = useDispatch()
  const courses = useSelector(state => state.courses.courses);
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [course, setCourse] = useState({
    // другие поля курса...
    tests: [{
      id: Date.now().toString(),
      title: '',
      description: '',
      isPublished: false,
      questions: []
    }]
  });
  console.log(course)
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestionState);

  // Получаем текущий тест для удобства
  const currentTest = course.tests[currentTestIndex];

  // Мемоизированные обработчики
  const handleTitleChange = useCallback((title) => {
    setCourse(prev => {
      const newTests = [...prev.tests];
      newTests[currentTestIndex] = { ...newTests[currentTestIndex], title };
      return { ...prev, tests: newTests };
    });
  }, [currentTestIndex]);

  const handleDescriptionChange = useCallback((description) => {
    setCourse(prev => {
      const newTests = [...prev.tests];
      newTests[currentTestIndex] = { ...newTests[currentTestIndex], description };
      return { ...prev, tests: newTests };
    });
  }, [currentTestIndex]);

  const handlePublishChange = useCallback((isPublished) => {
    setCourse(prev => {
      const newTests = [...prev.tests];
      newTests[currentTestIndex] = { ...newTests[currentTestIndex], isPublished };
      return { ...prev, tests: newTests };
    });
  }, [currentTestIndex]);

  const handleQuestionChange = useCallback((e) => {
    setCurrentQuestion(prev => ({ ...prev, text: e.target.value }));
  }, []);

  const handleTimeChange = useCallback((totalTime) => {
    setCurrentQuestion(prev => ({ ...prev, totalTime }));
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
    
    setCourse(prev => {
      const newTests = [...prev.tests];
      newTests[currentTestIndex] = {
        ...newTests[currentTestIndex],
        questions: [
          ...newTests[currentTestIndex].questions,
          { ...currentQuestion }
        ]
      };
      return { ...prev, tests: newTests };
    });
    
    if (addAnother) {
      resetCurrentQuestion();
    } else {
      closePopup();
    }
  }, [currentQuestion, closePopup, resetCurrentQuestion, currentTestIndex]);

  // Эффект для управления скроллом
  useEffect(() => {
    document.body.style.overflow = isPopupOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPopupOpen]);

  const handleSubmitTest =  () => {
    const course = courses.find(c => c.id === courseId);

    if (!course) {
      alert(`Курс с id ${courseId} не найден`);
      return;
    }

    const updatedCourse = {
      ...course,
      tests: [
        ...course.tests,
        test
      ]
    }

    dispatch(updateCourse(updatedCourse));
    navigate(-1);
  }

  // Мемоизированное отображение вопросов
  const questionsList = useMemo(() => {
    if (currentTest.questions.length === 0) {
      return (
        <div 
          className={styles.create_test_add_question_block}
          onClick={() => setIsPopupOpen(true)}
        >
          <span>Добавьте вопросы</span>
        </div>
      );
    }

    return currentTest.questions.map((question, index) => (
      <div key={question.id} className={styles.question_item}>
        <h3>Вопрос {index + 1}</h3>
        <p>{question.text}</p>
        {question.image && (
          <div className={styles.question_image}>
            <img 
              src={URL.createObjectURL(question.image)} 
              alt="Вопрос" 
            />
          </div>
        )}
        <p>Время: {question.totalTime} сек.</p>
        <div className={styles.answers_list}>
          {question.answers.map((answer, i) => (
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
  }, [currentTest.questions, showCorrectAnswers]);

  function loglog() {
    console.log(test)
  }

  return (
    <>
      <CustomBreadcrumb
        items={[
          {title: <Link to="/dashboard">Главная</Link>},
          {title: <Link to="/courses">Учебные курсы</Link>},
          {title: <Link to={`/courses/${courseId}`}>Редактирование курса</Link>},
          {title: 'Создание урока',}
        ]}
        separator={<MoveRight size={14} />}/>
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
                initialTime={currentQuestion.totalTime} 
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
          value={currentTest.title}
          onChange={handleTitleChange}
          publishStatus={currentTest.isPublished}
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
            <button onClick={loglog}></button>
          </div>
        </div>
        <div className={styles.questions_list}>
          {questionsList}
        </div>
      </section>
    </>
  );
};