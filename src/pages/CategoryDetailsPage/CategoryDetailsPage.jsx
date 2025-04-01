import React from 'react';
import styles from './CategoryDetailsPage.module.scss';
import { Link, useParams } from 'react-router-dom';
import { CategoriesHead } from '../../components/CategoriesHead/CategoriesHead';
import { CategoriesNav } from '../../components/CategoriesNav/CategoriesNav';
import { mockCategories } from '../../utils/mock_categories';

export const CategoryDetailsPage = () => {
  const { categoryId } = useParams();
  // Находим выбранную категорию
  const selectedCategory = mockCategories.find(
    (cat) => cat.id.toString() === categoryId
  );
  console.log(selectedCategory)
  if (!selectedCategory) {
    return <div>Категория не найдена</div>;
  }

  return (
    <section className={styles.subcategories}>
      <CategoriesHead />
      <CategoriesNav />
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
              {/* <p className={styles.categories_contant_subtext}>
                                    {selectedCategory.subcategories.length} подкатегории
                                  </p> */}
              {/* <ul className={styles.categories_contant_block_list}>
                                    {selectedCategory.subcategories.map((subcat, index) => (
                                      <li key={subcat.id} className={styles.subcategory_item}>
                                        <Link
                                          key={index}
                                          to={`/category/${selectedCategory.id}/subcategory/${subcat.id}`}
                                          className={styles.subcategory_link}
                                        >
                                          <span className={styles.subcategory_name}>{subcat.name}</span>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};