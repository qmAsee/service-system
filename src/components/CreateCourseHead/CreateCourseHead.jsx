import React, { useState, useEffect, useRef } from 'react';
import styles from './CreateCourseHead.module.scss';
import { ConfigProvider, Input, Switch } from 'antd';

const { TextArea } = Input;

export const CreateCourseHead = ({ placeholder, value = '', onChange, onPublishChange, description = '', onDescriptionChange,}) => {
  const [checked, setChecked] = useState(false);
  const [title, setTitle] = useState(value);
  const titleInputRef = useRef(null);

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

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    if (onDescriptionChange) {
      onDescriptionChange(newDescription);
    }
  };

  return (
    <div className={styles.create_test_settings_container}>
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
        <div className={`${styles.create_test_settings_switch} ${checked ? styles.published : ''}`}>
          <span className={styles.status_label}>
            {checked ? 'Опубликован' : 'Не опубликован'}
          </span>
          <ConfigProvider
            theme={{
              components: {
                Switch: {
                  colorPrimary: '#1890ff',
                  colorPrimaryHover: '#1890ff',
                  colorBgContainer: '#f0f0f0',
                  handleBg: checked ? '#fff' : '#f0f0f0',
                },
              },
            }}
          >
            <Switch
              checked={checked}
              onChange={(checked) => {
                setChecked(checked);
                onPublishChange(checked);
              }}
              aria-label={checked ? 'Снять с публикации' : 'Опубликовать'}
            />
          </ConfigProvider>
        </div>
      </div>
      {/* Добавляем TextArea для описания */}
      {description && (
        <TextArea
          placeholder="Описание теста"
          value={description}
          onChange={handleDescriptionChange}
          rows={3}
          maxLength={500}
          className={styles.create_test_settings_description}
        />
      )}

    </div>
  );
};