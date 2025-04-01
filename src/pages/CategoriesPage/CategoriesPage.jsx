import React from 'react';
import styles from './CategoriesPage.module.scss';
import { Link } from 'react-router-dom';
import { CategoriesHead } from '../../components/CategoriesHead/CategoriesHead';
import { CategoriesNav } from '../../components/CategoriesNav/CategoriesNav';
import { mockCategories } from '../../utils/mock_categories';

export const CategoriesPage = () => {
  return (
    <section className={styles.categories}>
      <CategoriesHead />
      <CategoriesNav />
      <div className={styles.categories_contant}>
        <div className={styles.categories_contant_blocks}>
          {mockCategories.map((category) => (
            <div key={category.id} className={styles.categories_contant_block}>
              <span className={styles.categories_contant_block_date}>
                {category.dateAdded}
              </span>
              <Link to={`/categories/${category.id}`}>
                <h2 className={styles.categories_contant_block_title}>
                  {category.category}
                </h2>
              </Link>
              <p className={styles.categories_contant_subtext}>
                {category.subcategories.length} подкатегории
              </p>
              <ul className={styles.categories_contant_block_list}>
                {category.subcategories.map((subcat, index) => (
                  <li key={subcat.id} className={styles.subcategory_item}>
                    <Link
                      key={index}
                      to={`/categories/${category.id}/subcategories/${subcat.id}`}
                      className={styles.subcategory_link}
                    >
                      <span className={styles.subcategory_name}>{subcat.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};