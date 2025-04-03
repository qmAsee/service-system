import React, { useState, useEffect } from "react";
import styles from "./CreateCoursePage.module.scss";
import { Radio, Space, Button, Input } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
      <p style={{ textAlign: "left" }}>{props.getValue() === "lesson" ? "Урок" : "Тест"}</p>
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
    cell: (props) => <p>{props.getValue() || "—"}</p>,
  },
  {
    accessorKey: "isPublished",
    header: "ОПУБЛИКОВАН",
    cell: (props) => <p>{props.getValue() ? "Да" : "Нет"}</p>,
  },
];

const CreateCoursePage = () => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    id: `course_${Date.now()}`, // Генерируем временный ID
    image: "", // Пустое поле для URL или placeholder
    title: "",
    description: "",
    completedLessons: 0,
    completedTests: 0,
    lessons: [],
    tests: [],
    difficulty: "базовый", // Добавим поле сложности как в вашем UI
  });
  const location = useLocation()

  const [combinedData, setCombinedData] = useState([]);

  const handleInputChange = (field) => (e) => {
    setCourseData({ ...courseData, [field]: e.target.value });
  };

  const handleDifficultyChange = (e) => {
    setCourseData({ ...courseData, difficulty: e.target.value });
  };

  const flattenLessonsAndTests = () => {
    const lessons = courseData.lessons.map((lesson, index) => ({
      number: index + 1,
      id: lesson.id,
      type: lesson.type,
      title: lesson.title,
      numberOfQuestions: null,
      isPublished: false, // Новый курс изначально не опубликован
    }));

    const tests = courseData.tests.map((test, index) => ({
      number: lessons.length + index + 1,
      id: test.id,
      type: "test",
      title: test.title,
      numberOfQuestions: test.questions?.length || 0,
      isPublished: false,
    }));

    return [...lessons, ...tests];
  };

  const handleSaveCourse = () => {
    // Здесь можно добавить валидацию
    if (!courseData.title) {
      alert("Введите название курса!");
      return;
    }

    // Логика сохранения (пока в консоль, позже - в Redux или API)
    console.log("Новый курс:", courseData);
    // Например, добавление в мок-данные:
    // new_mock_training_courses.push(courseData);
    navigate("/courses");
  };

  useEffect(() => {
    setCombinedData(flattenLessonsAndTests());
  }, [courseData.lessons, courseData.tests]);

  const loglog = () => {
    console.log('courseData', courseData)
    console.log('location.state: ', location.state)
  }

  return (
    <>
    <button onClick={loglog}>log courseData</button>
      <header>
        <h1 className={styles.course_title}>
          <Input
            placeholder="Название курса"
            value={courseData.title}
            onChange={handleInputChange("title")}
            className={styles.course_title_input}
          />
        </h1>
        <nav className={styles.course_nav}>
          <span className={`${styles.course_navlink} ${styles.course_navlink_active}`}>
            Общая информация и содержание курса
          </span>
        </nav>
      </header>
      <div className={styles.course_wrapper}>
        <article className={styles.course_general}>
          <h2 className={styles.course_general_title}>Общая информация</h2>
          <div className={styles.course_general_box}>
            <div className={styles.course_general_part}>
              <div className={styles.course_difficulty}>
                <h3 className={styles.course_section_title}>Уровень</h3>
                <Radio.Group
                  value={courseData.difficulty}
                  onChange={handleDifficultyChange}
                  buttonStyle="solid"
                >
                  <Space direction="horizontal">
                    <Radio.Button value="базовый" className={styles.button}>
                      Базовый
                    </Radio.Button>
                    <Radio.Button value="профи" className={styles.button}>
                      Профи
                    </Radio.Button>
                    <Radio.Button value="эксперт" className={styles.button}>
                      Эксперт
                    </Radio.Button>
                  </Space>
                </Radio.Group>
              </div>
              <div>
                <h3 className={styles.course_section_title}>Обложка курса</h3>
                <Input
                  placeholder="URL изображения"
                  value={courseData.image}
                  onChange={handleInputChange("image")}
                />
                {courseData.image && (
                  <img
                    src={courseData.image}
                    alt="Обложка курса"
                    className={styles.course_image}
                  />
                )}
              </div>
            </div>
            <div className={styles.course_general_part}>
              <h3 className={styles.course_section_title}>Описание курса</h3>
              <textarea
                value={courseData.description}
                onChange={handleInputChange("description")}
                className={styles.course_textarea}
                placeholder="Введите описание курса"
              />
            </div>
          </div>
        </article>
      </div>
      <div className={styles.course_wrapper}>
        <div className={styles.course_table_header}>
          <h2 className={styles.course_general_title}>Задания</h2>
          <div className={styles.course_table_header_buttons}>
            <Link to={`/courses/${courseData.id}/create_lesson`} state={{ courseData }}>
              <Button style={{ backgroundColor: "#498fcc", color: "white" }}>
                + Урок
              </Button>
            </Link>
            <Link to={`/courses/${courseData.id}/create_test`} state={{ courseData }}>
              <Button type="primary">
                + Тест
              </Button>
            </Link>
            <Button type="primary">
              + Тест с открытым вопросом
            </Button>
            <Button style={{ padding: "3px 10px" }}>
              <ArrowDownToLine size={15} />
              Импорт
            </Button>
            <Button style={{ padding: "3px 10px" }}>
              <ArrowUpToLine size={15} />
              Экспорт
            </Button>
          </div>
        </div>
        <Table data={combinedData} columns={columns} />
        <Button onClick={handleSaveCourse} type="primary" style={{ marginTop: "20px" }}>
          Сохранить курс
        </Button>
      </div>
    </>
  );
};

export default CreateCoursePage;