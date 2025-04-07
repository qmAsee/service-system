import React, { useState, useEffect, useMemo, useRef } from "react";
import styles from "./CourseDetailPage.module.scss";
import { Radio, Space, Button, Input } from "antd";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowDownToLine, ArrowUpToLine, MoveRight } from "lucide-react";
import { Table } from "../../components/Table/Table";
import { CustomBreadcrumb } from "../../components/CustomBreadcrumb/CustomBreadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, updateCourse, addCourse } from "@/store/slices/courseSlice";
import { CreateAttachImg } from "@/components/CreateAttachImg/CreateAttachImg";

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

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const course = useSelector((state) => state.courses.course);
  const courses = useSelector((state) => state.courses.courses);

  const [isNewCourse, setIsNewCourse] = useState(false);
  const titleInputRef = useRef(null)


  // Функция для объединения уроков и тестов
  useEffect(() => {
    setIsNewCourse(!courses.some((c) => c.id === courseId))

    if (isNewCourse) {
      dispatch(setCourse({
        id: null,
        image: "",
        title: "",
        description: "",
        completedLessons: 0,
        completedTests: 0,
        lessons: [],
        tests: [],
        difficulty: "базовый"
      }));
    } else {
      const existingCourse = courses.find((c) => c.id === courseId);
      if (existingCourse) dispatch(setCourse(existingCourse));
    }
  }, [courseId, dispatch, courses, isNewCourse]);

  useEffect(() => {
    titleInputRef.current.focus()
  }, [])

  // Оптимизированное создание табличных данных
  const combinedData = useMemo(() => {
    if (!course) return [];

    return [
      ...course.lessons.map((lesson, index) => ({
        number: index + 1,
        id: lesson.id,
        type: "lesson",
        title: lesson.title,
        numberOfQuestions: null,
        isPublished: lesson.isPublished,
      })),
      ...course.tests.map((test, index) => ({
        number: course.lessons.length + index + 1,
        id: test.id,
        type: "test",
        title: test.title,
        numberOfQuestions: test.questions?.length || 0,
        isPublished: test.isPublished,
      }))
    ];
  }, [course]);

  // Обработчики изменений
  const handleInputChange = (field) => (e) => {
    dispatch(setCourse(({ ...course, [field]: e.target.value })));
  };

  const handleDifficultyChange = (e) => {
    const newDifficulty = e.target.value;
    dispatch(setCourse(({ ...course, difficulty: newDifficulty })));
  };

  // Сохранение курса
  const handleSaveCourse = () => {
    if (!course?.title) {
      alert("Введите название курса!");
      return;
    }

    if (isNewCourse) {
      const newCourse = {
        ...course,
        id: `${courseId}`
      };
      dispatch(addCourse(newCourse));
    } else {
      dispatch(updateCourse(course));
    }

    navigate("/courses");
  };

  const handleSaveCourseNoRedirect = () => {
    if (!course?.title) {
      alert("Введите название курса!");
      return;
    }

    if (isNewCourse) {
      const newCourse = {
        ...course,
        id: `${courseId}`
      };
      dispatch(addCourse(newCourse));
    } else {
      dispatch(updateCourse(course));
    }
  };

  if (!course) {
    return (<><h1>Загрузка...</h1> </>);
  }

  // const loglog = () => {
  //   console.log(course)
  // }

  const handleImageUpload = (file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Преобразуем файл в URL
      dispatch(setCourse({ ...course, image: imageUrl }));
    } else {
      // Если файл null (сброс изображения)
      dispatch(setCourse({ ...course, image: "" }));
    }
  };

  const onRowClick = (row) => {
    console.log(row.original)
    navigate(`/courses/${courseId}/lessons/${row.original.id}`)
  };

  return (
    <>
      <CustomBreadcrumb
        items={[
          { title: <Link to="/dashboard">Главная</Link> },
          { title: <Link to={`/courses`}>Редактирование курса</Link>, },
          { title: 'Редактирование курса' },
          
        ]}
        separator={<MoveRight size={14} />} />
      <header className={styles.header}>
        <h1 className={styles.header_actions}>
          <Input
            ref={titleInputRef}
            value={course.title}
            onChange={handleInputChange("title")}
            placeholder="Введите название курса"
            className={styles.course_title_input}
            variant="outlined"
          />
          <Button
            type="primary"
            onClick={handleSaveCourse}
            
          >
            {isNewCourse ? "Создать курс" : "Сохранить изменения"}
          </Button>
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
                  value={course.difficulty}
                  onChange={handleDifficultyChange}
                  buttonStyle="solid"
                >
                  <Space direction="horizontal">
                    <Radio.Button
                      value="базовый"
                      className={`${styles.button} ${course.difficulty === "базовый" ? styles.buttonChecked : styles.buttonNotChecked
                        }`}
                    >
                      Базовый
                    </Radio.Button>
                    <Radio.Button
                      value="профи"
                      className={`${styles.button} ${course.difficulty === "профи" ? styles.buttonChecked : styles.buttonNotChecked
                        }`}
                    >
                      Профи
                    </Radio.Button>
                    <Radio.Button
                      value="эксперт"
                      className={`${styles.button} ${course.difficulty === "эксперт" ? styles.buttonChecked : styles.buttonNotChecked
                        }`}
                    >
                      Эксперт
                    </Radio.Button>
                  </Space>
                </Radio.Group>
              </div>
              <div>
                <h3 className={styles.course_section_title}>Обложка курса</h3>
                {/* {course.image && (
                  <img src={course.image} alt="Обложка курса" className={styles.course_image} />
                )} */}
                <CreateAttachImg
                  onImageUpload={handleImageUpload}
                  currentImage={course.image} // Мы не передаем File, так как image уже URL
                />
              </div>
            </div>
            <div className={styles.course_general_part}>
              <h3 className={styles.course_section_title}>Описание курса</h3>
              <Input.TextArea
                value={course.description}
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
            <Link to={`/courses/${courseId}/lessons/create_lesson`}>
              <Button style={{ backgroundColor: "#498fcc", color: "white" }} onClick={handleSaveCourseNoRedirect}>
                + Урок
              </Button>
            </Link>
            <Link to={`/courses/${courseId}/create_test`}>
              <Button type="primary" onClick={handleSaveCourseNoRedirect}>
                + Тест
              </Button>
            </Link>
            <Link to={`/courses/${courseId}/create_open_test`}>
              <Button style={{ backgroundColor: "#2eb03f", color: "white" }}>
                + Тест с открытым вопросом
              </Button>
            </Link>
            <Button style={{ padding: "3px 10px" }}>
              <ArrowDownToLine size={15} />
              Импорт уроков и тестов
            </Button>
            <Button style={{ padding: "3px 10px" }}>
              <ArrowUpToLine size={15} />
              Экспорт уроков и тестов
            </Button>
          </div>
        </div>
        <Table
          data={combinedData}
          columns={columns}
          onRowClick={(row) => onRowClick(row)}
          hoverEffect={true}
        />
      </div>
    </>
  );
};

export default CourseDetailPage;