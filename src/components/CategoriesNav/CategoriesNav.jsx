import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { MoveRight } from "lucide-react";
import styles from './CategoriesNav.module.scss';
import { mockCategories } from '../../utils/mock_categories';

export const CategoriesNav = () => {
  const location = useLocation();
  const { categoryId, subcategoryId } = useParams();
  const paths = location.pathname.split('/').filter(Boolean);

  // Находим текущую категорию и подкатегорию по ID
  const currentCategory = mockCategories.find(
    cat => cat.id.toString() === categoryId
  );
  
  const currentSubcategory = currentCategory?.subcategories.find(
    sub => sub.id.toString() === subcategoryId
  );

  // Функция для преобразования пути в читаемое название
  const getDisplayName = (path, index) => {
    // Для числовых ID (категорий и подкатегорий) возвращаем соответствующие имена
    if (!isNaN(Number(path))) {
      if (index === 1) { // Позиция categoryId в paths
        return currentCategory?.category || path;
      }
      if (index === 3) { // Позиция subcategoryId в paths
        return currentSubcategory?.name || path;
      }
      return null; // Скрываем другие числовые ID
    }

    // Обработка текстовых путей
    switch(path) {
      case 'categories': return 'Меню';
      case 'subcategories': return null; // Скрываем этот сегмент
      default: return path;
    }
  };

  return (
    <nav className={styles.categories_contant_nav}>
      {/* Динамические хлебные крошки */}
      <ul className={styles.categories_contant_nav_list}>
        <li>
          <Link to="/">Главная</Link>
        </li>
        
        {paths.map((path, index) => {
          const displayName = getDisplayName(path, index);
          if (!displayName) return null; // Пропускаем скрытые элементы

          const isLast = index === paths.length - 1;
          const pathTo = `/${paths.slice(0, index + 1).join('/')}`;

          return (
            <React.Fragment key={pathTo}>
              <MoveRight color="rgb(165, 163, 163)" />
              <li>
                {isLast ? (
                  <span>{displayName}</span>
                ) : (
                  <Link to={pathTo}>{displayName}</Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ul>

      {/* Заголовок и кнопка */}
      <div className={styles.categories_contant_nav_title}>
        <h1>
          {currentSubcategory?.name || 
           currentCategory?.category || 
           'Меню'}
        </h1>
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          size="large"
          className={styles.categories_contant_btn}
          
        />
      </div>
    </nav>
  );
};