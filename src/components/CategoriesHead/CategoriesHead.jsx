import React from 'react';
import styles from './CategoriesHead.module.scss';
import { ConfigProvider, Switch } from 'antd';
import { Search } from "lucide-react";

export const CategoriesHead = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <div className={styles.categories_head}>
      <div className={styles.categories_head_filter}>
        <span>Фильтр</span>
        <ConfigProvider
          theme={{
            components: {
              Switch: {
                colorPrimary: 'rgb(97, 97, 209)', // Цвет когда включен
                colorPrimaryHover: 'rgb(97, 97, 209)', // Цвет при наведении
                colorBgContainer: '#f0f0f0', // Цвет когда выключен
              },
            },
          }}
        >
          <Switch
            checked={checked}
            onChange={(checked) => setChecked(checked)} />
        </ConfigProvider>
      </div>
      <Search color='rgb(128, 128, 128)' />
      <span className={styles.categories_head_templates}>Шаблоны</span>
    </div>
  );
};

