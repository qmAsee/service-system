import React, { useEffect, useState } from "react";
import styles from "./CourseDetailPage.module.scss";

import { Radio, Space, Button } from "antd";

import { Link, NavLink, useParams } from "react-router-dom";
import { new_mock_training_courses } from "../../utils/mock_training_courses";

import { ArrowDownToLine, ArrowUpToLine } from "lucide-react";

import { Table } from "../../components/Table/Table";

const columns = [
    {
      accessorKey: "number",
      header: "№",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "type",
      header: "ТИП",
      headerStyle: { justifyContent: "flex-start" },
      cell: (props) => (
        <p style={{textAlign: "left"}}>{props.getValue() === "lesson" ? "Урок" : "Тест"}</p>
      ),
    },
    {
      accessorKey: "title",
      header: "НАЗВАНИЕ",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "numberOfQuestions",
      header: "ВОПРОСОВ",
      cell: (props) => <p>{props.getValue() || "—" }</p>, 
    },
    {
      accessorKey: "isPublished",
      header: "ОПУБЛИКОВАН",
      cell: (props) => <p>{props.getValue() ? "Да" : "Нет"}</p>,
    },
  ];

const CourseDetailPage = () => {
    const [course, setCourse] = useState(null);
    const [combinedData, setCombinedData] = useState([]);
    const { courseId } = useParams();

    const [difficulty, setDifficulty] = useState("базовый");

    const flattenLessonsAndTests = (course) => {
        if (!course) return [];
    
        const lessons = course.lessons.map((lesson, index) => ({
          number: index + 1,
          id: lesson.id,
          type: lesson.type,
          title: lesson.title,
          numberOfQuestions: null,
          isPublished: true,
        }));
    
        const tests = course.tests.map((test, index) => ({
          number: lessons.length + index + 1,
          id: test.id,
          type: "test",
          title: test.title,
          numberOfQuestions: test.questions.length,
          isPublished: true,
        }));
    
        return [...lessons, ...tests];
      };

    const handleDifficultyChange = (e) => {
        setDifficulty(e.target.value);
    };

    useEffect(() => {
        const foundCourse = new_mock_training_courses.find(
          (course) => course.id === courseId
        );
        setCourse(foundCourse || null);
    
        if (foundCourse) {
          const combined = flattenLessonsAndTests(foundCourse);
          setCombinedData(combined);
        }
    }, [courseId]);

    if (!course) {
        return <h1>Загрузка...</h1>;
    }

    const loglog = () => {
        console.log(course);
    };

    return (
        <>
            {course ? (
                <>
                    <header>
                        <h1 className={styles.course_title}>{course.title}</h1>
                        <nav className={styles.course_nav}>
                            <NavLink
                                className={({ isActive }) =>
                                    `${styles.course_navlink} ${
                                        isActive
                                            ? styles.course_navlink_active
                                            : ""
                                    }`
                                }
                            >
                                Общая информация и содержание курса
                            </NavLink>
                        </nav>
                    </header>
                    <div className={styles.course_wrapper}>
                        <article className={styles.course_general}>
                            <h2 className={styles.course_general_title}>
                                Общая информация
                            </h2>
                            <div className={styles.course_general_box}>
                                <div className={styles.course_general_part}>
                                    <div className={styles.course_difficulty}>
                                        <h3
                                            className={
                                                styles.course_section_title
                                            }
                                        >
                                            Уровень
                                        </h3>
                                        <Radio.Group
                                            value={difficulty}
                                            onChange={handleDifficultyChange}
                                            buttonStyle="solid"
                                        >
                                            <Space direction="horizontal">
                                                <Radio.Button
                                                    value="базовый"
                                                    className={`${
                                                        styles.button
                                                    } ${
                                                        difficulty === "базовый"
                                                            ? styles.buttonChecked
                                                            : styles.buttonNotChecked
                                                    }`}
                                                >
                                                    Базовый
                                                </Radio.Button>
                                                <Radio.Button
                                                    value="профи"
                                                    className={`${
                                                        styles.button
                                                    } ${
                                                        difficulty === "профи"
                                                            ? styles.buttonChecked
                                                            : styles.buttonNotChecked
                                                    }`}
                                                >
                                                    Профи
                                                </Radio.Button>
                                                <Radio.Button
                                                    value="эксперт"
                                                    className={`${
                                                        styles.button
                                                    } ${
                                                        difficulty === "эксперт"
                                                            ? styles.buttonChecked
                                                            : styles.buttonNotChecked
                                                    }`}
                                                >
                                                    Эксперт
                                                </Radio.Button>
                                            </Space>
                                        </Radio.Group>
                                    </div>
                                    <div>
                                        <h3
                                            className={
                                                styles.course_section_title
                                            }
                                        >
                                            Обложка курса
                                        </h3>
                                        <img
                                            src={course.image}
                                            alt="Обложка курса"
                                            className={styles.course_image}
                                        />
                                    </div>
                                </div>
                                <div className={styles.course_general_part}>
                                    <h3 className={styles.course_section_title}>
                                        Описание курса
                                    </h3>
                                    <textarea
                                        value={course.description}
                                        className={styles.course_textarea}
                                    ></textarea>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div className={styles.course_wrapper}>
                        <div className={styles.course_responsibilities}>
                            <article className={styles.course_responsibility}>
                                <h3 className={styles.course_section_title}>
                                    Должности
                                </h3>
                                <p className={styles.course_section_text}>
                                    Кассир-бариста, повар
                                </p>
                            </article>
                            <article className={styles.course_responsibility}>
                                <h3 className={styles.course_section_title}>
                                    Рестораны
                                </h3>
                                <p className={styles.course_section_text}>
                                    Кассир-бариста, повар
                                </p>
                            </article>
                        </div>
                        <div className={styles.course_table_header}>
                            <h2 className={styles.course_general_title}>
                                Задания
                            </h2>
                            <div className={styles.course_table_header_buttons}>
                                <Button
                                    style={{
                                        backgroundColor: "#498fcc",
                                        color: "white",
                                    }}
                                >
                                    {" "}
                                    + Урок
                                </Button>
                                <Link
                                    to={`/courses/${courseId}/create_test`}
                                >
                                    <Button
                                        style={{
                                            backgroundColor: "#2eb03f",
                                            color: "white",
                                        }}
                                    >
                                        + Тест
                                    </Button>
                                </Link>
                                <Button
                                    style={{
                                        backgroundColor: "#2eb03f",
                                        color: "white",
                                    }}
                                >
                                    + Тест с открытым вопросом
                                </Button>
                                <Button
                                    style={{
                                        padding: "3px 10px",
                                    }}
                                >
                                    <ArrowDownToLine size={15} />
                                    Импорт уроков и тестов
                                </Button>
                                <Button
                                    style={{
                                        padding: "3px 10px",
                                    }}
                                >
                                    <ArrowUpToLine size={15} />
                                    Экспорт уроков и тестов
                                </Button>
                                <Button onClick={loglog}>loglog</Button>
                            </div>
                        </div>
                        <Table data={combinedData} columns={columns}/>
                    </div>
                </>
            ) : (
                <button onClick={loglog}>Log</button>
            )}
        </>
    );
};

export default CourseDetailPage;
