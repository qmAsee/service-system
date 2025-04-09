import React, { useState, useEffect, useCallback } from 'react';
import styles from './CreateTestNewPage.module.scss';
import { CustomBreadcrumb } from '../../components/CustomBreadcrumb/CustomBreadcrumb';
import { CreateCourseHead } from '../../components/CreateCourseHead/CreateCourseHead';
import { QuestionList } from '../../components/QuestionList/QuestionList';
import { QuestionPopup } from '../../components/QuestionPopup/QuestionPopup';
import { Plus, Check, MoveRight } from "lucide-react";
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateCourse } from '@/store/slices/courseSlice';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Input } from 'antd';

const { TextArea } = Input;

export const CreateTestNewPage = ({ typeTest: initialTypeTest }) => {
  const [isTypeTest, setIsTypeTest] = useState(initialTypeTest ?? false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courses = useSelector(state => state.courses.courses);
  const { courseId, testId } = useParams();
  
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [test, setTest] = useState({
    id: `test_${Date.now()}`,
    title: '',
    description: '',
    isPublished: false,
    questions: []
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [isNewTest, setIsNewTest] = useState(!testId);

  // Начальное состояние вопроса в зависимости от типа теста
  const getInitialQuestionState = useCallback(() => {
    return isTypeTest 
      ? {
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
        }
      : {
          correctAnswers: '',
          correctAnswersCount: 1,
          hint: '',
          id: Date.now(),
          image: null,
          question: '',
          totalTime: 30,
          type: 'open',
        };
  }, [isTypeTest]);

  useEffect(() => {
    setCurrentQuestion(getInitialQuestionState());
  }, [getInitialQuestionState]);

  useEffect(() => {
    if (testId) {
      const currentCourse = courses.find(c => c.id === courseId);
      if (currentCourse) {
        const existingTest = currentCourse.tests?.find(t => t.id === testId);
        if (existingTest) {
          setTest(existingTest);
          setIsNewTest(false);
          if (initialTypeTest === undefined) {
            const derivedTypeTest = existingTest.questions?.[0]?.type !== 'open';
            setIsTypeTest(derivedTypeTest);
          }
        }
      }
    }
  }, [courseId, testId, courses, initialTypeTest]);

  const resetQuestionState = useCallback(() => {
    setCurrentQuestion(getInitialQuestionState());
  }, [getInitialQuestionState]);

  const handleTitleChange = useCallback((title) => {
    setTest(prev => ({ ...prev, title }));
  }, []);

  const handleDescriptionChange = useCallback((e) => {
    setTest(prev => ({ ...prev, description: e.target.value }));
  }, []);

  const handlePublishChange = useCallback((isPublished) => {
    setTest(prev => ({ ...prev, isPublished }));
  }, []);

  const openAddQuestionPopup = () => {
    resetQuestionState();
    setEditingQuestionId(null);
    setIsPopupOpen(true);
  };

  const openEditQuestionPopup = (questionId) => {
    const questionToEdit = test.questions.find(q => q.id === questionId);
    if (questionToEdit) {
      setCurrentQuestion(questionToEdit);
      setEditingQuestionId(questionId);
      setIsPopupOpen(true);
    }
  };

  const validateQuestion = (questionData) => {
    if (!questionData.question.trim()) {
      alert('Пожалуйста, введите текст вопроса');
      return false;
    }
    
    if (isTypeTest) {
      const hasEmptyOptions = questionData.options.some(o => !o.text.trim());
      const hasNoCorrectOption = !questionData.options.some(o => o.isCorrect);

      if (hasEmptyOptions) {
        alert('Все варианты ответов должны быть заполнены');
        return false;
      }

      if (hasNoCorrectOption) {
        alert('Нужно указать правильный вариант ответа');
        return false;
      }
    } else {
      if (!questionData.correctAnswers.trim()) {
        alert('Укажите правильный ответ для вопроса');
        return false;
      }
    }
    
    return true;
  };

  const saveQuestion = useCallback((questionData, isEditing, addAnother = false) => {
    if (!validateQuestion(questionData)) return;

    setTest(prev => {
      if (isEditing) {
        return {
          ...prev,
          questions: prev.questions.map(q =>
            q.id === editingQuestionId ? questionData : q
          )
        };
      } else {
        return {
          ...prev,
          questions: [...prev.questions, questionData]
        };
      }
    });

    if (addAnother) {
      resetQuestionState();
      setEditingQuestionId(null);
    } else {
      setIsPopupOpen(false);
    }
  }, [editingQuestionId, isTypeTest]);

  const confirmDeleteQuestion = useCallback((questionId) => {
    setQuestionToDelete(questionId);
    setIsConfirmModalVisible(true);
  }, []);

  const deleteQuestion = () => {
    if (questionToDelete) {
      setTest(prev => ({
        ...prev,
        questions: prev.questions.filter(q => q.id !== questionToDelete)
      }));
      setIsConfirmModalVisible(false);
      alert('Вопрос удален');
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    resetQuestionState();
    setEditingQuestionId(null);
  };

  const handleSubmitTest = useCallback(() => {
    const currentCourse = courses.find(c => c.id === courseId);
    if (!currentCourse) {
      alert(`Курс с id ${courseId} не найден`);
      return;
    }

    if (test.questions.length === 0) {
      alert('Добавьте хотя бы один вопрос');
      return;
    }
    
    if (!test.title.trim()) {
      alert('Введите название теста');
      return;
    }

    const updatedCourse = {
      ...currentCourse,
      tests: isNewTest
        ? [...(currentCourse.tests || []), test]
        : currentCourse.tests.map(t => t.id === testId ? test : t)
    };

    dispatch(updateCourse(updatedCourse));
    alert(isNewTest ? 'Тест успешно создан' : 'Тест успешно обновлен');
    navigate(`/courses/${courseId}`);
  }, [courses, courseId, test, isNewTest, testId, dispatch, navigate]);

  return (
    <>
      <CustomBreadcrumb
        items={[
          { title: <Link to="/dashboard">Главная</Link> },
          { title: <Link to="/courses">Учебные курсы</Link> },
          { title: <Link to={`/courses/${courseId}`}>Редактирование курса</Link> },
          { title: isNewTest ? 'Создание теста' : 'Редактирование теста' }
        ]}
        separator={<MoveRight size={14} />}
      />

      <QuestionPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        question={currentQuestion}
        isEditing={!!editingQuestionId}
        onSave={saveQuestion}
        setQuestion={setCurrentQuestion}
        showCorrectAnswers={showCorrectAnswers}
        isOpenQuestion={!isTypeTest}
      />

      <Modal
        title="Подтверждение удаления"
        visible={isConfirmModalVisible}
        onOk={deleteQuestion}
        onCancel={() => setIsConfirmModalVisible(false)}
        okText="Удалить"
        cancelText="Отмена"
      >
        <p>Вы уверены, что хотите удалить этот вопрос?</p>
      </Modal>

      <section className={styles.create_test}>
        <div className={styles.create_test_head_container}>
          <div className={styles.create_test_head}>
            <CreateCourseHead
              placeholder="Название теста"
              value={test.title}
              onChange={handleTitleChange}
              toggleIsPublished={handlePublishChange}
              isPublished={test.isPublished}
            />
            <Button type='primary' onClick={handleSubmitTest}>
              {isNewTest ? 'Добавить тест' : 'Сохранить изменения'}
            </Button>
          </div>
          <Input
            value={test.description}
            onChange={handleDescriptionChange}
            placeholder="Добавьте описание теста"
            className={styles.test_description}
          />
        </div>

        <div className={styles.create_test_add_question}>
          <button
            className={styles.create_test_add_question_btn}
            onClick={openAddQuestionPopup}
          >
            <Plus className="w-5 h-5" />
            Добавить вопрос
          </button>
          
          {isTypeTest && (
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
          )}
        </div>

        <QuestionList
          questions={test.questions}
          onEdit={openEditQuestionPopup}
          onDelete={confirmDeleteQuestion}
          onAddQuestion={openAddQuestionPopup}
          showCorrectAnswers={showCorrectAnswers}
          isOpenQuestionType={!isTypeTest}
        />
      </section>
    </>
  );
};