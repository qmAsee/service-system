import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './SubcategoryPage.module.scss';
import { CategoriesHead } from '../../components/CategoriesHead/CategoriesHead';
import { CustomBreadcrumb } from '../../components/CustomBreadcrumb/CustomBreadcrumb';
import { mockCategories } from '../../utils/mock_categories'; // Импортируем mock-данные
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { MoveRight } from "lucide-react";

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
    <>
      <CustomBreadcrumb
        items={[
          { title: <Link to="/dashboard">Главная</Link> },
          { title: <Link to="/categories">Меню</Link> },
          { title: <Link to={`/categories/${categoryId}`}>{currentCategory.category}</Link>},
          { title: currentSubcategory.name, }
        ]}
        separator={<MoveRight size={14} />} />
    <section className={styles.subcategory}>
      <CategoriesHead />
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
    </>
  );
};