import React, { useState } from 'react'
import styles from './CoursesPage.module.scss'
import {new_mock_training_courses} from '../../utils/mock_training_courses'
import { Link } from 'react-router-dom'

const CoursesPage = () => {
  const [courses, setCourses] = useState(new_mock_training_courses) 
  
  return (
    <section className={styles.courses_page}>
      <h1 className={styles.courses_title}>Учебные курсы</h1>
      <div>
        <div className={styles.courses_cols_names}>
          <span className={styles.courses_col_name}>УРОВЕНЬ</span>
          <span className={styles.courses_col_name}>ПРОГРЕСС В ОБУЧЕНИИ</span>
          <span className={styles.courses_col_name}>СТАТУС</span>
        </div>
        <ul className={styles.courses_wrapper}>
          <h2 className={styles.course_level_title}>Базовый</h2>
          {
            courses.map(course => {
              return (
                <li className={styles.course} key={course.id}>
                  <Link to={`/courses/${course.id}`}>
                    <div className={styles.course_info_wrapper}>
                      <h3>{course.title}</h3>
                      <p className={styles.course_description}>{course.description}</p>
                    </div>
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    </section>
  )
}

export default CoursesPage
