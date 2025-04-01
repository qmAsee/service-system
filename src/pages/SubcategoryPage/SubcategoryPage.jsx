import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './SubcategoryPage.module.scss';
import { CategoriesHead } from '../../components/CategoriesHead/CategoriesHead';
import { CategoriesNav } from '../../components/CategoriesNav/CategoriesNav';
import { mockCategories } from '../../utils/mock_categories'; // Импортируем mock-данные
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
export const SubcategoryPage = () => {
  // Получаем параметры из URL
  const { categoryId, subcategoryId } = useParams();

  // Находим нужную категорию и подкатегорию
  const currentCategory = mockCategories.find(
    cat => cat.id.toString() === categoryId
  );

  const currentSubcategory = currentCategory?.subcategories.find(
    sub => sub.id.toString() === subcategoryId
  );

  // Получаем items текущей подкатегории
  const items = currentSubcategory?.items || [];
  const handleAddItem = () => {
    console.log('Добавление новой позиции');
    // Здесь будет логика добавления новой позиции
  };
  return (
    <section className={styles.subcategory}>
      <CategoriesHead />
      <CategoriesNav />
      <div className={styles.subcategory_blocks}>

        <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined style={{ fontSize: '38px' }} />}
          size="large"
          onClick={handleAddItem}
          className={styles.add_item_block}
        >
          Добавить позицию
        </Button>
        {items.map(item => (
          <div className={styles.subcategory_block}>
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              size="middle"
            />
            <img
              src={item.image}
              alt={item.name}
            />
            <div className={styles.subcategory_block_info}>
              <h3>{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};