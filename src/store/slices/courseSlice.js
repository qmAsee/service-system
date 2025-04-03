import { createSlice } from "@reduxjs/toolkit";
import { new_mock_training_courses } from "@/utils/mock_training_courses";

const initialState = {
    courses: new_mock_training_courses,
    course: {
        id: '',
        image: "",
        title: "",
        description: "",
        completedLessons: 0,
        completedTests: 0,
        lessons: [],
        tests: [],
        difficulty: "базовый",
    },
};

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        addCourse: (state, action) => {
            state.courses.push(action.payload);
            state.course = initialState.course;
        },

        // Для обновления существующего курса
        updateCourse: (state, action) => {
            const updatedCourse = action.payload;
            state.courses = state.courses.map((course) =>
              course.id === updatedCourse.id ? updatedCourse : course
            );
            if (state.course?.id === updatedCourse.id) {
              state.course = updatedCourse;
            }
        },
        setCourses: (state, action) => {
            state.courses = action.payload;
        },

        setCourse: (state, action) => {
            state.course = action.payload;
        },
    },
});

export const { setCourses, setCourse, updateCourse, addCourse } =
    courseSlice.actions;
export default courseSlice.reducer;
