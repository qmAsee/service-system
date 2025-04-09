import React, { useState, useRef, useEffect } from 'react';

import { CustomBreadcrumb } from "../../components/CustomBreadcrumb/CustomBreadcrumb";
import { CreateCourseHead } from '../../components/CreateCourseHead/CreateCourseHead';
import { CreateAttachImg } from '../../components/CreateAttachImg/CreateAttachImg';
import styles from './CreateLessonPage.module.scss';
import { MonitorPlay, Youtube, Camera, Mic, Type, AlignJustify, ArrowUp, ArrowDown, Trash2, MoveRight} from "lucide-react";
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { updateCourse } from '@/store/slices/courseSlice';

export const CreateLessonPage = () => {
  const dispatch = useDispatch()
  const courses = useSelector(state => state.courses.courses);
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const [isNewCourse, setIsNewCourse] = useState(false);
  const [showContentMenu, setShowContentMenu] = useState(false);
  const [isNewLesson, setIsNewLesson] = useState(!lessonId);
  const [lesson, setLesson] = useState({
    id: `lesson_${Date.now()}`,
    type: "lesson",
    title: '',
    lessonImage: null,
    isPublished: false,
    blocks: [
      {
        id: `block_${Date.now()}`,
        type: 'chapter',
        blockText: '',
        media: []
      }
    ]
  });

  const fileImageInputRef = useRef(null);
  const fileVideoInputRef = useRef(null);
  const [activeBlockId, setActiveBlockId] = useState(lesson.blocks[0].id);

  useEffect(() => {
    const course = courses.find((c) => c.id === courseId);
   
    setIsNewCourse(course);
    if (!course) return;

    if (lessonId) {
      const existingLesson = course.lessons.find((l) => l.id === lessonId);
      if (existingLesson) {
        setLesson(existingLesson);
        setActiveBlockId(existingLesson.blocks[0]?.id || null);
      }
    } else {
      setActiveBlockId(lesson.blocks[0].id);
    }
  }, [courseId, lessonId, courses]);

  const toggleIsPublished = () => {
    setLesson(prev => ({
      ...prev,
      isPublished: !prev.isPublished,
    }));
  }

  const toggleContentMenu = () => {
    setShowContentMenu(!showContentMenu);
  };

  const updateLessonTitle = (newTitle) => {
    setLesson({
      ...lesson,
      title: newTitle
    });
  };

  const handleImageUpload = (file) => {
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setLesson({ ...lesson, image: imageUrl });
      } else {
        setLesson({ ...lesson, image: "" });
      }
    };

  const generateId = () => `block_${Date.now()}`;

  const addNewBlock = (type, content = '', media = []) => {
    const newBlock = {
      id: generateId(),
      type,
      blockText: content,
      media
    };

    const activeIndex = lesson.blocks.findIndex(b => b.id === activeBlockId);
    const newBlocks = [...lesson.blocks];
    newBlocks.splice(activeIndex + 1, 0, newBlock);

    setLesson({
      ...lesson,
      blocks: newBlocks
    });
    setActiveBlockId(newBlock.id);
    setShowContentMenu(false);
  };

  const addNewChapter = () => {
    addNewBlock('chapter', '', []);
  };

  const addTextBlock = () => {
    addNewBlock('text', '', []);
  };

  const handleMediaUpload = (e, mediaType) => {
    const file = e.target.files[0];
    if (!file) return;

    const mediaUrl = URL.createObjectURL(file);
    addNewBlock(mediaType, '', [mediaUrl]);
  };

  const triggerFileInput = (ref) => {
    ref.current.click();
  };

  const deleteBlock = (id) => {
    if (lesson.blocks.length <= 1) return;

    const newBlocks = lesson.blocks.filter(block => block.id !== id);
    setLesson({
      ...lesson,
      blocks: newBlocks
    });

    if (activeBlockId === id) {
      const index = lesson.blocks.findIndex(block => block.id === id);
      const newActiveId = index > 0 ? lesson.blocks[index - 1].id : newBlocks[0]?.id;
      if (newActiveId) setActiveBlockId(newActiveId);
    }
  };

  const updateBlockContent = (id, newContent) => {
    setLesson({
      ...lesson,
      blocks: lesson.blocks.map(block =>
        block.id === id
          ? { ...block, blockText: newContent }
          : block
      )
    });
  };

  const moveBlock = (id, direction) => {
    const index = lesson.blocks.findIndex(block => block.id === id);
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= lesson.blocks.length) return;

    const newBlocks = [...lesson.blocks];
    [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];

    setLesson({
      ...lesson,
      blocks: newBlocks
    });
  };

  const getBlockNumber = (block, index) => {
    if (block.type === 'chapter') {
      return lesson.blocks.slice(0, index).filter(b => b.type === 'chapter').length + 1;
    }
    return '';
  };

  const contentTypes = [
    { icon: <MonitorPlay size={26} />, label: "Видео", action: () => triggerFileInput(fileVideoInputRef) },
    { icon: <Youtube size={26} />, label: "YouTube", action: () => console.log("Добавить YouTube") },
    { icon: <Camera size={26} />, label: "Изображение", action: () => triggerFileInput(fileImageInputRef) },
    { icon: <Mic size={26} />, label: "Аудио", action: () => console.log("Добавить аудио") },
    { icon: <Type size={26} />, label: "Текст", action: addTextBlock },
    { icon: <AlignJustify size={26} />, label: "Глава", action: addNewChapter }
  ];

  const handleSubmitLesson = (e) => {
    e.preventDefault();
    const course = courses.find((course) => course.id === courseId);

    if (!course) {
      alert(`Курс с id ${courseId} не найден`);
      return;
    }

    let updatedLessons;
    if (lessonId) {
      updatedLessons = course.lessons.map((l) =>
        l.id === lessonId ? lesson : l
      );
    } else {
      updatedLessons = [...course.lessons, lesson];
    }

    const updatedCourse = {
      ...course,
      lessons: updatedLessons,
    };

    dispatch(updateCourse(updatedCourse));
    navigate(-1);
  };

  return (
    <>
      <CustomBreadcrumb
        items={[
          {title: <Link to="/dashboard">Главная</Link>},
          {title: <Link to="/courses">Учебные курсы</Link>},
          { 
            title: !isNewCourse ? 'Создание курса' : `Курс: ${isNewCourse.title || ''}`,
            path: `/courses/${courseId}`
          },
          {title: isNewLesson ? 'Создание урока' : `Урок: ${lesson.title}`}
        ]}
        separator={<MoveRight size={14} />}/>
      <section className={styles.create_lesson}>
        <div className={styles.create_lesson_head}>
          <CreateCourseHead
            placeholder="Название урока"
            value={lesson.title}
            onChange={updateLessonTitle}
            toggleIsPublished={toggleIsPublished}
            isPublished={lesson.isPublished}
          />
          <Button type='primary' onClick={handleSubmitLesson}>{isNewLesson ? 'Добавить урок' : 'Сохранить изменения'}</Button>
        </div>
        <div className={styles.create_lesson_container}>
          <div className={styles.create_lesson_content}>
            <h2>Содержание урока</h2>

            <div className={styles.create_lesson_cover}>
              <span className={styles.create_lesson_title}>Обложка</span>
              <CreateAttachImg onImageUpload={handleImageUpload} currentImage={lesson.lessonImage}/>
            </div>

            <input
              type="file"
              ref={fileImageInputRef}
              onChange={(e) => handleMediaUpload(e, 'image')}
              accept="image/*"
              style={{ display: 'none' }}
            />

            <input
              type="file"
              ref={fileVideoInputRef}
              onChange={(e) => handleMediaUpload(e, 'video')}
              accept="video/*"
              style={{ display: 'none' }}
            />

            {lesson.blocks.map((block, index) => (
              <div
                key={block.id}
                className={`${styles.create_lesson_content_block} ${
                  block.type === "chapter"
                    ? styles.chapter
                    : block.type === "text"
                    ? styles.text_block
                    : block.type === "image"
                    ? styles.image_block
                    : styles.video_block
                }`}
                onClick={() => setActiveBlockId(block.id)}
              >
                {block.type === 'chapter' && (
                  <>
                    <span className={styles.create_lesson_title}>
                      Глава {getBlockNumber(block, index)}
                    </span>
                    <input
                      type="text"
                      placeholder="Введите название главы"
                      value={block.blockText}
                      onChange={(e) => updateBlockContent(block.id, e.target.value)}
                    />
                  </>
                )}

                {block.type === 'text' && (
                  <>
                    <span className={styles.create_lesson_title}>Текст</span>
                    <Input.TextArea
                      placeholder="Введите текст"
                      value={block.blockText}
                      onChange={(e) => updateBlockContent(block.id, e.target.value)}
                      className={styles.textblock_input}
                    />
                  </>
                )}

                {block.type === 'image' && block.media.length > 0 && (
                  <>
                    <span className={styles.create_lesson_title}>Изображение</span>
                    <div className={styles.image_container}>
                      <img src={block.media[0]} alt="Загруженное в урок" className={styles.uploaded_image} />
                    </div>
                  </>
                )}

                {block.type === 'video' && block.media.length > 0 && (
                  <>
                    <span className={styles.create_lesson_title}>Видео</span>
                    <div className={styles.video_container}>
                      <video controls className={styles.uploaded_video}>
                        <source src={block.media[0]} type="video/mp4" />
                        Ваш браузер не поддерживает видео тег.
                      </video>
                    </div>
                  </>
                )}

                <div className={styles.create_lesson_content_block_btn}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveBlock(block.id, 'up');
                    }}
                    disabled={index === 0}
                    aria-label="Переместить вверх"
                  >
                    <ArrowUp size={18} color={index === 0 ? '#ccc' : 'rgb(201, 201, 201)'} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveBlock(block.id, 'down');
                    }}
                    disabled={index === lesson.blocks.length - 1}
                    aria-label="Переместить вниз"
                  >
                    <ArrowDown size={18} color={index === lesson.blocks.length - 1 ? '#ccc' : 'rgb(201, 201, 201)'} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteBlock(block.id);
                    }}
                    disabled={lesson.blocks.length <= 1}
                    aria-label="Удалить блок"
                    className={styles.delete_btn}
                  >
                    <Trash2 size={18} color={lesson.blocks.length <= 1 ? '#ccc' : 'rgb(201, 201, 201)'} />
                  </button>
                </div>
              </div>
            ))}

            {!showContentMenu && (
              <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                size="large"
                className={styles.create_lesson_container_btn}
                onClick={toggleContentMenu}
              />
            )}

            {showContentMenu && (
              <div className={styles.create_lesson_content_add}>
                {contentTypes.map((item, index) => (
                  <div
                    key={index}
                    className={styles.content_type_item}
                    onClick={(e) => {
                      e.stopPropagation();
                      item.action();
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};