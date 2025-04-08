import 'antd/dist/reset.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import './App.css'
import { MainLayout } from './layouts/MainLayout/MainLayout.jsx';
import { MainPage } from './pages/MainPage/MainPage.jsx';
import { RestaurantsPage } from './pages/RestaurantsPage/RestaurantsPage.jsx';
import { ManagersPage } from './pages/ManagersPage/ManagersPage.jsx';
import { EmployeesPage } from './pages/EmployeesPage/EmployeesPage.jsx';
import { PositionsPage } from './pages/PositionsPage/PositionsPage.jsx';
import { CreateTestNewPage } from "./pages/CreateTestNewPage/CreateTestNewPage.jsx"
import { CreateOpenTestPage } from "./pages/CreateOpenTestPage/CreateOpenTestPage.jsx"

import { CreateLessonPage } from "./pages/CreateLessonPage/CreateLessonPage.jsx"
import { CategoriesPage } from "./pages/CategoriesPage/CategoriesPage.jsx"
import { CategoryDetailsPage } from "./pages/CategoryDetailsPage/CategoryDetailsPage.jsx"
import { SubcategoryPage } from "./pages/SubcategoryPage/SubcategoryPage.jsx"

import CoursesPage from './pages/CoursesPage/CoursesPage.jsx';
import CourseDetailPage from './pages/CourseDetailPage/CourseDetailPage.jsx';

import { ConfigProvider } from 'antd';
// import { extendTheme } from '@chakra-ui/react'

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider theme={{
        components: {
          Button: {
            colorPrimary: "#2eb03f",
            colorPrimaryHover: "#22802f",
            colorPrimaryActive: "#22802f",
            defaultHoverBorderColor: "#9e9e9e",
            defaultHoverColor: "black"
          },
        }
      }}>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="dashboard" element={<MainPage />} />
              <Route path="restaurants" element={<RestaurantsPage />} />
              <Route path="managers" element={<ManagersPage />} />
              <Route path="employees" element={<EmployeesPage />} />
              <Route path="positions" element={<PositionsPage />} />
              
              <Route path="courses">
                <Route index element={<CoursesPage />} />
                <Route path=":courseId" element={<CourseDetailPage />} />
                <Route path=":courseId/tests/create_test" element={<CreateTestNewPage typeTest={true} />} />
                <Route path=":courseId/tests/:testId" element={<CreateTestNewPage/>} />
                <Route path=":courseId/tests/create_open_test" element={<CreateTestNewPage typeTest={false} />} />

                <Route path=":courseId/lessons/create_lesson" element={<CreateLessonPage />} />
                <Route path=":courseId/lessons/:lessonId" element={<CreateLessonPage />} />
              </Route>

              <Route path="categories">
                <Route index element={<CategoriesPage />} />
                <Route path=":categoryId" element={<CategoryDetailsPage />}/>
                <Route path=":categoryId/subcategories/:subcategoryId" element={<SubcategoryPage />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </ConfigProvider>
    </Provider>
  )
}

export default App
