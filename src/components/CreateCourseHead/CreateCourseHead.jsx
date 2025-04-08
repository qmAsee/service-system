import React, { useState, useEffect, useRef } from 'react';
import styles from './CreateCourseHead.module.scss';
import { ConfigProvider, Input, Switch } from 'antd';

export const CreateCourseHead = ({ placeholder, value = '', onChange, isPublished, toggleIsPublished }) => {
  // const [checked, setChecked] = useState(false);
  const [title, setTitle] = useState(value);
  const titleInputRef = useRef(null)

  // Синхронизируем внутреннее состояние с внешним значением
  useEffect(() => {
    setTitle(value);
    titleInputRef.current.focus();
  }, [value]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (onChange) {
      onChange(newTitle);
    }
  };

  return (
    <div className={styles.create_test_settings}>
      <Input
        ref={titleInputRef}
        type="text"
        placeholder={placeholder}
        className={styles.create_test_settings_title}
        value={title}
        onChange={handleTitleChange}
        maxLength={100}
      />
      
      <div className={`${styles.create_test_settings_switch} ${isPublished ? styles.published : ''}`}>
        <span className={styles.status_label}>
          {isPublished ? 'Опубликован' : 'Не опубликован'}
        </span>
        
        <ConfigProvider
          theme={{
            components: {
              Switch: {
                colorPrimary: '#1890ff',
                colorPrimaryHover: '#1890ff',
                colorBgContainer: '#f0f0f0',
                handleBg: isPublished ? '#fff' : '#f0f0f0',
              },
            },
          }}
        >
          <Switch
            checked={isPublished}
            onChange={toggleIsPublished}
            aria-label={isPublished ? 'Снять с публикации' : 'Опубликовать'}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};