import React from 'react';
import { Link } from 'react-router-dom';  // Added useParams
import styles from './CategoriesPage.module.scss';
import { CategoriesHead } from '../../components/CategoriesHead/CategoriesHead';
import { CustomBreadcrumb } from '../../components/CustomBreadcrumb/CustomBreadcrumb';
import { mockCategories } from '../../utils/mock_categories';
import { MoveRight } from "lucide-react";

export const CategoriesPage = () => {
  return (
    <>
      <CustomBreadcrumb
        items={[
          { title: <Link to="/dashboard">Главная</Link> },
          { title: 'Меню', }
        ]}
        separator={<MoveRight size={14} />} />
      <section className={styles.categories}>
        <CategoriesHead />
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
                  {category.subcategories.map((subcat) => (
                    <li key={subcat.id} className={styles.subcategory_item}>
                      <Link
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
    </>
  );
};