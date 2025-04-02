import React, { useState, useRef } from 'react';
import { CreateCourseHead } from '../../components/CreateCourseHead/CreateCourseHead';
import { CreateAttachImg } from '../../components/CreateAttachImg/CreateAttachImg';
import styles from './CreateLessonPage.module.scss';
import { MonitorPlay, Youtube, Camera, Mic, Type, AlignJustify, ArrowUp, ArrowDown, Trash2 } from "lucide-react";
import { PlusOutlined } from '@ant-design/icons';
import { Button } from "antd";

export const CreateLessonPage = () => {
  const [showContentMenu, setShowContentMenu] = useState(false);
  const [contentBlocks, setContentBlocks] = useState([
    { 
      id: 1, 
      type: 'chapter',
      data: {
        customTitle: '',
      }
    }
  ]);
  const [activeBlockId, setActiveBlockId] = useState(1);
  const fileImageInputRef = useRef(null);
  const fileVideoInputRef = useRef(null);

  const toggleContentMenu = () => {
    setShowContentMenu(!showContentMenu);
  };

  const addNewChapter = () => {
    const newId = contentBlocks.length > 0 ? Math.max(...contentBlocks.map(b => b.id)) + 1 : 1;
    setContentBlocks([...contentBlocks, { 
      id: newId, 
      type: 'chapter',
      data: {
        customTitle: '',
      }
    }]);
    setActiveBlockId(newId);
    setShowContentMenu(false);
  };

  const addTextBlock = () => {
    const newId = contentBlocks.length > 0 ? Math.max(...contentBlocks.map(b => b.id)) + 1 : 1;
    
    const activeIndex = contentBlocks.findIndex(b => b.id === activeBlockId);
    
    const newBlocks = [...contentBlocks];
    newBlocks.splice(activeIndex + 1, 0, {
      id: newId,
      type: 'text',
      data: {
        content: ''
      }
    });
    
    setContentBlocks(newBlocks);
    setActiveBlockId(newId);
    setShowContentMenu(false);
  };

  const addImageBlock = (imageUrl) => {
    const newId = contentBlocks.length > 0 ? Math.max(...contentBlocks.map(b => b.id)) + 1 : 1;
    
    const activeIndex = contentBlocks.findIndex(b => b.id === activeBlockId);
    
    const newBlocks = [...contentBlocks];
    newBlocks.splice(activeIndex + 1, 0, {
      id: newId,
      type: 'image',
      data: {
        url: imageUrl
      }
    });
    
    setContentBlocks(newBlocks);
    setActiveBlockId(newId);
    setShowContentMenu(false);
  };

  const addVideoBlock = (videoUrl) => {
    const newId = contentBlocks.length > 0 ? Math.max(...contentBlocks.map(b => b.id)) + 1 : 1;
    
    const activeIndex = contentBlocks.findIndex(b => b.id === activeBlockId);
    
    const newBlocks = [...contentBlocks];
    newBlocks.splice(activeIndex + 1, 0, {
      id: newId,
      type: 'video',
      data: {
        url: videoUrl
      }
    });
    
    setContentBlocks(newBlocks);
    setActiveBlockId(newId);
    setShowContentMenu(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    addImageBlock(imageUrl);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const videoUrl = URL.createObjectURL(file);
    addVideoBlock(videoUrl);
  };

  const triggerImageInput = () => {
    fileImageInputRef.current.click();
  };

  const triggerVideoInput = () => {
    fileVideoInputRef.current.click();
  };

  const deleteBlock = (id) => {
    if (contentBlocks.length <= 1) return;
    
    const newBlocks = contentBlocks.filter(block => block.id !== id);
    setContentBlocks(newBlocks);
    
    if (activeBlockId === id) {
      const index = contentBlocks.findIndex(block => block.id === id);
      const newActiveId = index > 0 ? contentBlocks[index - 1].id : newBlocks[0]?.id;
      if (newActiveId) setActiveBlockId(newActiveId);
    }
  };

  const updateChapterTitle = (id, newTitle) => {
    setContentBlocks(contentBlocks.map(block => 
      block.id === id && block.type === 'chapter' 
        ? { ...block, data: { ...block.data, customTitle: newTitle } } 
        : block
    ));
  };

  const updateTextContent = (id, newContent) => {
    setContentBlocks(contentBlocks.map(block => 
      block.id === id && block.type === 'text'
        ? { ...block, data: { ...block.data, content: newContent } }
        : block
    ));
  };

  const moveBlockUp = (id) => {
    const index = contentBlocks.findIndex(block => block.id === id);
    if (index <= 0) return;
    
    const newBlocks = [...contentBlocks];
    [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
    setContentBlocks(newBlocks);
  };

  const moveBlockDown = (id) => {
    const index = contentBlocks.findIndex(block => block.id === id);
    if (index >= contentBlocks.length - 1) return;
    
    const newBlocks = [...contentBlocks];
    [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
    setContentBlocks(newBlocks);
  };

  const getBlockNumber = (block, index) => {
    if (block.type === 'chapter') {
      let chapterNumber = 1;
      for (let i = 0; i < index; i++) {
        if (contentBlocks[i].type === 'chapter') chapterNumber++;
      }
      return chapterNumber;
    } else if (block.type === 'text') {
      let textBlockNumber = 1;
      for (let i = 0; i < index; i++) {
        if (contentBlocks[i].type === 'text') textBlockNumber++;
      }
      return textBlockNumber;
    }
    return '';
  };

  const contentTypes = [
    { icon: <MonitorPlay size={26} />, label: "Видео", action: triggerVideoInput },
    { icon: <Youtube size={26} />, label: "Youtube", action: () => console.log("Добавить YouTube") },
    { icon: <Camera size={26} />, label: "Изображение", action: triggerImageInput },
    { icon: <Mic size={26} />, label: "Аудио", action: () => console.log("Добавить аудио") },
    { icon: <Type size={26} />, label: "Текст", action: addTextBlock },
    { icon: <AlignJustify size={26} />, label: "Глава", action: addNewChapter }
  ];

  return (
    <section className={styles.create_lesson}>
      <CreateCourseHead placeholder={"Название урока"}/>
      <div className={styles.create_lesson_container}>
        <div className={styles.create_lesson_content}>
          <h2>Содержание урока</h2>
          
          <div className={styles.create_lesson_cover}>
            <span className={styles.create_lesson_title}>Обложка</span>
            <CreateAttachImg />
          </div>
          
          <input
            type="file"
            ref={fileImageInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />
          
          <input
            type="file"
            ref={fileVideoInputRef}
            onChange={handleVideoUpload}
            accept="video/*"
            style={{ display: 'none' }}
          />
          
          {contentBlocks.map((block, index) => (
            <div 
              key={block.id}
              className={`${styles.create_lesson_content_block} ${
                block.type === 'chapter' ? styles.chapter : 
                block.type === 'text' ? styles.text_block : 
                block.type === 'image' ? styles.image_block :
                styles.video_block
              }`}
              onClick={() => setActiveBlockId(block.id)}
            >
              {block.type === 'chapter' ? (
                <>
                  <span className={styles.create_lesson_title}>
                    Глава {getBlockNumber(block, index)}
                  </span>
                  
                  <input 
                    type="text" 
                    placeholder="Введите название главы"
                    value={block.data.customTitle}
                    onChange={(e) => updateChapterTitle(block.id, e.target.value)}
                  />
                </>
              ) : block.type === 'text' ? (
                <>
                  <span className={styles.create_lesson_title}>
                    Текст {getBlockNumber(block, index)}
                  </span>
                  <textarea
                    placeholder="Введите текст"
                    value={block.data.content}
                    onChange={(e) => updateTextContent(block.id, e.target.value)}
                  />
                </>
              ) : block.type === 'image' ? (
                <>
                  <span className={styles.create_lesson_title}>
                    Изображение
                  </span>
                  <div className={styles.image_container}>
                    <img src={block.data.url} alt="Загруженное в урок" className={styles.uploaded_image} />
                  </div>
                </>
              ) : (
                <>
                  <span className={styles.create_lesson_title}>
                    Видео
                  </span>
                  <div className={styles.video_container}>
                    <video controls className={styles.uploaded_video}>
                      <source src={block.data.url} type="video/mp4" />
                      Ваш браузер не поддерживает видео тег.
                    </video>
                  </div>
                </>
              )}
              
              <div className={styles.create_lesson_content_block_btn}>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    moveBlockUp(block.id);
                  }}
                  disabled={index === 0}
                  aria-label="Переместить вверх"
                >
                  <ArrowUp size={18} color={index === 0 ? '#ccc' : 'rgb(201, 201, 201)'} />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    moveBlockDown(block.id);
                  }}
                  disabled={index === contentBlocks.length - 1}
                  aria-label="Переместить вниз"
                >
                  <ArrowDown size={18} color={index === contentBlocks.length - 1 ? '#ccc' : 'rgb(201, 201, 201)'} />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteBlock(block.id);
                  }}
                  disabled={contentBlocks.length <= 1}
                  aria-label="Удалить блок"
                  className={styles.delete_btn}
                >
                  <Trash2 size={18} color={contentBlocks.length <= 1 ? '#ccc' : 'rgb(201, 201, 201)'} />
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
  );
};