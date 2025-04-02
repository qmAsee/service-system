import React, { useState } from 'react';
import styles from './CreateCourseHead.module.scss';
import { ConfigProvider, Switch } from 'antd';

export const CreateCourseHead = ({ placeholder }) => {
  const [checked, setChecked] = useState(false);
  const [title, setTitle] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className={styles.create_test_settings}>
      <input
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
                colorPrimary: 'rgb(97, 97, 209)',
                colorPrimaryHover: 'rgb(77, 77, 189)',
                colorBgContainer: '#f0f0f0',
                handleBg: checked ? '#fff' : '#f0f0f0',
              },
            },
          }}
        >
          <Switch
            checked={checked}
            onChange={(checked) => setChecked(checked)}
            aria-label={checked ? 'Снять с публикации' : 'Опубликовать'}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};