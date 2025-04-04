import React, { useState } from 'react'
import styles from './CoursesPage.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { CustomBreadcrumb } from "../../components/CustomBreadcrumb/CustomBreadcrumb";
import { MoveRight } from "lucide-react";
const CoursesPage = () => {
  // const { courseId } = useParams();
  const navigate = useNavigate();
  const courses = useSelector((state) => state.courses.courses)

  const handleAddCourse = () => {
    const newCourseId = `course_${Date.now()}`;
    const newCourse = {
      id: newCourseId,
      image: "",
      title: "",
      description: "",
      completedLessons: 0,
      completedTests: 0,
      lessons: [],
      tests: [],
      difficulty: "базовый",
    };
    navigate(`/courses/${newCourseId}`, { state: { courseData: newCourse } });
  };

  return (
    <>
    <CustomBreadcrumb
      items={[
        { title: <Link to="/dashboard">Главная</Link> },
        { title: 'Учебные курсы', }
      ]}
      separator={<MoveRight size={14} />} />
    <section className={styles.courses_page}>
      <div className={styles.courses_head}>
        <h1 className={styles.courses_title}>Учебные курсы</h1>
        <Button type='primary' onClick={handleAddCourse}>Добавить курс</Button>
      </div>
   
        <div className={styles.courses_cols_names}>
          <span className={styles.courses_col_name}>УРОВЕНЬ</span>
          <span className={styles.courses_col_name}>ПРОГРЕСС В ОБУЧЕНИИ</span>
          <span className={styles.courses_col_name}>СТАТУС</span>
        </div>
      </section>
    </>
  )
}

export default CoursesPage