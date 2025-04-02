import React, { useState, useEffect } from 'react';
import styles from './CreateTestPage.module.scss';
import { AnswerVariant } from '../../components/AnswerVariant/AnswerVariant'
import { CreateCourseHead } from '../../components/CreateCourseHead/CreateCourseHead'
import { CreateAttachImg } from '../../components/CreateAttachImg/CreateAttachImg'

import { Plus, Check } from "lucide-react";

export const CreateTestPage = () => {
  // const [checked, setChecked] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [answerVariants, setAnswerVariants] = useState([1, 2, 3, 4]);
  // const [selectedImage, setSelectedImage] = useState(null);
  // const [imagePreview, setImagePreview] = useState(null);
  // const fileInputRef = useRef(null);

  const closePopup = () => {
    setIsPopupOpen(false);
    // Сброс изображения при закрытии попапа
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isPopupOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPopupOpen]);

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

  const addAnswerVariant = () => {
    setAnswerVariants([...answerVariants, answerVariants.length + 1]);
  };

  const deleteAnswerVariant = (index) => {
    if (answerVariants.length > 1) {
      setAnswerVariants(answerVariants.filter((_, i) => i !== index));
    }
  };

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setSelectedImage(file);
  //     // Создаем превью изображения
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const triggerFileInput = () => {
  //   fileInputRef.current.click();
  // };

  // const resetImage = () => {
  //   setSelectedImage(null);
  //   setImagePreview(null);
  //   // Сброс значения input, чтобы можно было загрузить тот же файл снова
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = '';
  //   }
  // };

  return (
    <>
      {isPopupOpen && (
        <div
          className={styles.popup_overlay}
          onClick={handleOverlayClick}
        >
          <div className={styles.popup_content}>
            <form>
              <h2>Добавить вопрос</h2>
              <div className={styles.popup_question}>
                <h3 className={styles.popup_content_title}>Вопрос</h3>
                <textarea placeholder='Напишите вопрос' />
              </div>
              <div className={styles.popup_image}>
                <h3 className={styles.popup_content_title}>Изображение</h3>
                <CreateAttachImg/>
                {/* <div className={styles.popup_image_block}>
                  <input
                    type="file"
                    id="file-input"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {imagePreview ? (
                    <div className={styles.image_preview_container}>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className={styles.image_preview}
                      />
                      <div className={styles.popup_image_btn}>
                        <button onClick={resetImage}>
                          <RefreshCcw size={24} color="rgb(224, 222, 222)" strokeWidth={1.5} />
                        </button>
                        <button onClick={resetImage}>
                          <Trash size={24} color="rgb(224, 222, 222)" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button
                        className={styles.popup_upload_btn}
                        onClick={triggerFileInput}
                      >
                        <ArrowUpFromLine size={28} color="rgb(224, 222, 222)" strokeWidth={4} />
                        Прикрепить
                      </button>
                    </>
                  )}
                </div> */}
              </div>
              <div className={styles.popup_time}>
                <h3 className={styles.popup_content_title}>Время на ответ</h3>
                <div className={styles.container}>
                  <div className={styles.time_display}>
                    <div className={styles.hours_controls}>
                      <button
                        className={styles.arrow_btn_up}
                        onClick={() => updateTime('hours', 'up')}
                      />
                      <div className={styles.time_part}>{formatTime(hours)}</div>
                      <button
                        className={styles.arrow_btn_up_down}
                        onClick={() => updateTime('hours', 'down')}
                      />
                    </div>
                    <div className={styles.colon}>:</div>
                    <div className={styles.minutes_controls}>
                      <button
                        className={styles.arrow_btn_up}
                        onClick={() => updateTime('minutes', 'up')}
                      />
                      <div className={styles.time_part}>{formatTime(minutes)}</div>
                      <button
                        className={styles.arrow_btn_up_down}
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
              </div>
              <div className={styles.popup_variants}>
                <h3 className={styles.popup_content_title}>Варианты ответа</h3>
                {answerVariants.map((el, index) => (
                  <AnswerVariant
                    key={index}
                    onDelete={() => deleteAnswerVariant(index)}
                  />
                ))}
              </div>
              <div className={styles.popup_variants_btn}>
                <button onClick={addAnswerVariant}>
                  <Plus size={14} />
                  Добавить ответ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <section className={styles.create_test}>
        <CreateCourseHead  placeholder={"Название теста"}/>
      
        <div className={styles.create_test_add_question}>
          <button
            className={styles.create_test_add_question_btn}
            onClick={togglePopup}
          >
            <Plus className="w-5 h-5" />
            Добавить вопрос
          </button>
          <div className={styles.create_test_add_question_show}>
            <input
              type="checkbox"
              id="create_test_add_question_show"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="hidden"
            />
            <div className={`w-5 h-5 rounded flex items-center justify-center 
              ${isChecked ? 'bg-blue-500' : 'bg-gray-300'}`}
            >
              {isChecked && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
            </div>
            <label htmlFor="create_test_add_question_show">
              Показывать тестируемому верные ответы
            </label>
          </div>
        </div>
        <div className={styles.create_test_add_question_block}>
          <span onClick={togglePopup}>Добавьте вопросы</span>
        </div>
      </section>
    </>
  );
};