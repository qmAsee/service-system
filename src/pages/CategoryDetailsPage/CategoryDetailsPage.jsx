import React from 'react';
import styles from './CategoryDetailsPage.module.scss';
import { Link, useParams } from 'react-router-dom';
import { CategoriesHead } from '../../components/CategoriesHead/CategoriesHead';
import { CustomBreadcrumb } from '../../components/CustomBreadcrumb/CustomBreadcrumb';
import { mockCategories } from '../../utils/mock_categories';
import { MoveRight } from "lucide-react";

export const CategoryDetailsPage = () => {
  const { categoryId } = useParams();
  console.log(categoryId)
  // Находим выбранную категорию
  const selectedCategory = mockCategories.find(
    (cat) => cat.id.toString() === categoryId
  );

  if (!selectedCategory) {
    return <div>Категория не найдена</div>;
  }

  return (
    <>
      <CustomBreadcrumb
        items={[
          { title: <Link to="/dashboard">Главная</Link> },
          { title: <Link to="/categories">Меню</Link> },
          // {title: <Link to={`/categories/${categoryId}`}></Link>},
          { title: selectedCategory.category, }
        ]}
        separator={<MoveRight size={14} />} />
      <section className={styles.subcategories}>
        <CategoriesHead />
        <div className={styles.categories_contant}>
          <div className={styles.categories_contant_blocks}>
            {selectedCategory.subcategories.map((category) => (
              <div key={category.id} className={styles.categories_contant_block}>
                <span className={styles.categories_contant_block_date}>
                  {category.dateAdded}
                </span>
                <Link to={`/categories/${categoryId}/subcategories/${category.id}`}>
                  <h2 className={styles.categories_contant_block_title}>
                    {category.name}
                  </h2>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};