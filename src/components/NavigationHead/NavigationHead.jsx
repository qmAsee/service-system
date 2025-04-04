import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { MoveRight } from "lucide-react";
import styles from './NavigationHead.module.scss';
import { mockCategories } from '../../utils/mock_categories';

export const NavigationHead = () => {
  const location = useLocation();
  const { courseId, categoryId, subcategoryId } = useParams();
  const paths = location.pathname.split('/').filter(Boolean);

  // Находим текущую категорию и подкатегорию
  const currentCategory = mockCategories.find(cat => cat.id.toString() === categoryId);
  const currentSubcategory = currentCategory?.subcategories.find(sub => sub.id.toString() === subcategoryId);

  // Функция для преобразования пути в читаемое название
  const getDisplayName = (path, index) => {
    // Обработка числовых ID (категорий, подкатегорий и курсов)
    if (!isNaN(Number(path)) || path.startsWith('course_')) {
      // Для страницы курсов
      if (paths[0] === 'courses' && index === 1) {
        return 'Редактирование курса'; // Или другое название, если нужно
      }
      // Для страницы категорий
      if (paths[0] === 'categories') {
        if (index === 1) return currentCategory?.category || 'Категория';
        if (index === 3) return currentSubcategory?.name || 'Подкатегория';
      }
      return null;
    }

    // Обработка текстовых путей
    switch (path) {
      case 'courses': return 'Учебные курсы';
      case 'categories': return 'Категории';
      case 'subcategories': return null; // Скрываем этот сегмент
      case 'dashboard': return 'Главная';
      case 'create_lesson': return 'Создание урока';
      case 'create_test': return 'Создание теста';
      case 'create_open_test': return 'Создание теста с открытым вопросом';
      default: return path;
    }
  };

  return (
    <nav className={styles.navigation}>
      <ul className={styles.breadcrumbs}>
        {/* Всегда показываем ссылку на главную */}
        <li className={styles.breadcrumbItem}>
          <Link to="/dashboard">Главная</Link>
        </li>

        {/* Динамические хлебные крошки */}
        {paths.map((path, index) => {
          const displayName = getDisplayName(path, index);
          if (!displayName) return null;

          const isLast = index === paths.length - 1;
          const pathTo = `/${paths.slice(0, index + 1).join('/')}`;

          return (
            <React.Fragment key={pathTo}>
              <li className={styles.breadcrumbSeparator}>
                <MoveRight size={16} />
              </li>
              <li className={styles.breadcrumbItem}>
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
    </nav>
  );
};