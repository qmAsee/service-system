import React from 'react'
import styles from './CoursesPage.module.scss'

const CoursesPage = () => {
  return (
    <>
      <div className={styles.courses_page}>
        <h1 className={styles.courses_title}>Учебные курсы</h1>
      </div>
      <div className={styles.courses_cols_names}>
        <span className={styles.courses_col_name}>Уровень</span>
        <span className={styles.courses_col_name}>Прогресс в обучении</span>
        <span className={styles.courses_col_name}>Статус</span>
      </div>
      <section className={styles.courses_wrapper}>
        
      </section>
    </>
  )
}

export default CoursesPage
