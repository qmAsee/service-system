import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styles from './CreateTestPage.module.scss';
import { CustomBreadcrumb } from '../../components/CustomBreadcrumb/CustomBreadcrumb';
import { CreateCourseHead } from '../../components/CreateCourseHead/CreateCourseHead';
import { QuestionList } from '../../components/QuestionList/QuestionList';
import { QuestionPopup } from '../../components/QuestionPopup/QuestionPopup';
import { Plus, Check, MoveRight } from "lucide-react";
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateCourse } from '@/store/slices/courseSlice';
import { useNavigate } from 'react-router-dom';


const initialQuestionState = {
  correctAnswersCount: 1,
  hint: '',
  id: Date.now(),
  image: null,
  question: '',
  totalTime: 30,
  options: [
    { id: 1, text: '', isCorrect: false },
    { id: 2, text: '', isCorrect: false }
  ],
  type: 'single',
};

export const CreateTestPage = () => {
  const dispatch = useDispatch();
  const courses = useSelector(state => state.courses.courses);
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

  const [course, setCourse] = useState({
    tests: [{
      id: Date.now().toString(),
      title: '',
      description: '',
      isPublished: false,
      questions: []
    }]
  });

  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestionState);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  const currentTest = course.tests[currentTestIndex];

  // Обработчики для теста
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

  // Управление вопросами
  const openAddQuestionPopup = useCallback(() => {
    setCurrentQuestion(initialQuestionState);
    setEditingQuestionId(null);
    setIsPopupOpen(true);
  }, []);

  const openEditQuestionPopup = useCallback((questionId) => {
    const questionToEdit = currentTest.questions.find(q => q.id === questionId);
    if (questionToEdit) {
      setCurrentQuestion(questionToEdit);
      setEditingQuestionId(questionId);
      setIsPopupOpen(true);
    }
  }, [currentTest.questions]);

  const saveQuestion = useCallback((questionData, isEditing, addAnother = false) => {
    if (!questionData.question.trim()) {
      alert('Пожалуйста, введите текст вопроса');
      return;
    }

    const hasEmptyOptions = questionData.options.some(o => !o.text.trim());
    const hasNoCorrectOption = !questionData.options.some(o => o.isCorrect);
    
    if (hasEmptyOptions) {
      alert('Все варианты ответов должны быть заполнены');
      return;
    }
    
    if (hasNoCorrectOption) {
      alert('Нужно указать правильный вариант ответа');
      return;
    }

    setCourse(prev => {
      const newTests = [...prev.tests];
      if (isEditing) {
        newTests[currentTestIndex] = {
          ...newTests[currentTestIndex],
          questions: newTests[currentTestIndex].questions.map(q => 
            q.id === editingQuestionId ? questionData : q
          )
        };
      } else {
        newTests[currentTestIndex] = {
          ...newTests[currentTestIndex],
          questions: [
            ...newTests[currentTestIndex].questions,
            questionData
          ]
        };
      }
      return { ...prev, tests: newTests };
    });

    if (addAnother) {
      setCurrentQuestion(initialQuestionState);
      setEditingQuestionId(null);
    } else {
      setIsPopupOpen(false);
    }
  }, [currentTestIndex, editingQuestionId]);

  const confirmDeleteQuestion = useCallback((questionId) => {
    setQuestionToDelete(questionId);
    setIsConfirmModalVisible(true);
  }, []);

  const deleteQuestion = useCallback(() => {
    if (questionToDelete) {
      setCourse(prev => {
        const newTests = [...prev.tests];
        newTests[currentTestIndex] = {
          ...newTests[currentTestIndex],
          questions: newTests[currentTestIndex].questions.filter(q => q.id !== questionToDelete)
        };
        return { ...prev, tests: newTests };
      });
      setIsConfirmModalVisible(false);
    }
  }, [currentTestIndex, questionToDelete]);

  const closePopup = useCallback(() => {
    setIsPopupOpen(false);
    setCurrentQuestion(initialQuestionState);
    setEditingQuestionId(null);
  }, []);

  // Сохранение теста
  const handleSubmitTest = useCallback(() => {
    const course = courses.find(c => c.id === courseId);
    if (!course) {
      alert(`Курс с id ${courseId} не найден`);
      return;
    }

    if (currentTest.questions.length === 0) {
      alert('Добавьте хотя бы один вопрос');
      return;
    }

    const updatedCourse = {
      ...course,
      tests: [
        ...course.tests,
        currentTest
      ]
    };

    dispatch(updateCourse(updatedCourse));
    navigate(`/courses/${courseId}`);
  }, [courses, courseId, currentTest, dispatch, navigate]);

  return (
    <>
      <CustomBreadcrumb
        items={[
          {title: <Link to="/dashboard">Главная</Link>},
          {title: <Link to="/courses">Учебные курсы</Link>},
          {title: <Link to={`/courses/${courseId}`}>Редактирование курса</Link>},
          {title: 'Создание теста'}
        ]}
        separator={<MoveRight size={14} />}
      />

      <QuestionPopup 
        isOpen={isPopupOpen}
        onClose={closePopup}
        question={currentQuestion}
        isEditing={editingQuestionId}
        onSave={saveQuestion}
        setQuestion={setCurrentQuestion}
        showCorrectAnswers={showCorrectAnswers}
        isOpenQuestion={false} // This indicates it's a regular question with variants
      />

      <section className={styles.create_test}>
        <CreateCourseHead 
          placeholder="Название теста"
          value={currentTest.title}
          onChange={handleTitleChange}
          publishStatus={currentTest.isPublished}
          onPublishChange={handlePublishChange}
          description={currentTest.description}
          onDescriptionChange={handleDescriptionChange}
        />
        
        <div className={styles.create_test_add_question}>
          <button
            className={styles.create_test_add_question_btn}
            onClick={openAddQuestionPopup}
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
            <div className={`w-5 h-5 rounded flex items-center justify-center 
              ${showCorrectAnswers ? 'bg-blue-500' : 'bg-gray-300'}`}
            >
              {showCorrectAnswers && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
            </div>
            <label htmlFor="showCorrectAnswers">
              Показывать тестируемому верные ответы
            </label>
          </div>
        </div>
        
        <QuestionList
          questions={currentTest.questions}
          onEdit={openEditQuestionPopup}
          onDelete={confirmDeleteQuestion}
          onAddQuestion={openAddQuestionPopup}
          showCorrectAnswers={showCorrectAnswers}
          isOpenQuestionType={true}
        />
        
        <div className={styles.create_test_actions}>
          <button 
            className={styles.create_test_button}
            onClick={handleSubmitTest}
            disabled={currentTest.questions.length === 0}
          >
            Создать тест
          </button>
        </div>
      </section>
    </>
  );
};