import styles from './CoursesPage.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input } from 'antd'
import { useSelector } from 'react-redux'
import { CustomBreadcrumb } from "../../components/CustomBreadcrumb/CustomBreadcrumb";
import { MoveRight, Search } from "lucide-react";
import { useState } from 'react';

const CoursesPage = () => {
  const navigate = useNavigate();
  const courses = useSelector((state) => state.courses.courses)
  const [searchInputValue, setSearchInputValue] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(courses)


  const handleSearchInputChange = (evt) => {
    const newValue = evt.target.value;
    setSearchInputValue(newValue)

    if (!newValue.trim) {
      setFilteredCourses(courses)
    } else {
      setFilteredCourses(courses.filter((course) =>
        course.title.toLowerCase().includes(newValue.toLowerCase())
      ))
    }
  };

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
        <div className={styles.interactives_container}>
          <Button type='primary' onClick={handleAddCourse}>Добавить курс</Button>
          <Input value={searchInputValue} onChange={handleSearchInputChange} placeholder='Найти' prefix={<Search className={styles.search_prefix} />} className={styles.search_input}/>
        </div>
      </div>
      <div>
        <div className={styles.courses_cols_names}>
          <span className={styles.courses_col_name}>УРОВЕНЬ</span>
          <span className={styles.courses_col_name}>ПРОГРЕСС В ОБУЧЕНИИ</span>
          <span className={styles.courses_col_name}>СТАТУС</span>
        </div>
          <ul className={styles.courses_wrapper}>
            <h2 className={styles.course_level_title}>Базовый</h2>
            {
              filteredCourses.map(course => {
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
    </>
  )
}

export default CoursesPage