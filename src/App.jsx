import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import './App.css'
import { MainLayout } from './layouts/MainLayout/MainLayout.jsx';
import { MainPage } from './pages/MainPage/MainPage.jsx';
import { RestaurantsPage } from './pages/RestaurantsPage/RestaurantsPage.jsx';
import { ManagersPage } from './pages/ManagersPage/ManagersPage.jsx';
import { EmployeesPage } from './pages/EmployeesPage/EmployeesPage.jsx';
import { PositionsPage } from './pages/PositionsPage/PositionsPage.jsx';
import { CreateTestPage } from "./pages/CreateTestPage/CreateTestPage.jsx"
import { CategoriesPage } from "./pages/CategoriesPage/CategoriesPage.jsx"
import { CategoryDetailsPage } from "./pages/CategoryDetailsPage/CategoryDetailsPage.jsx"
import { SubcategoryPage } from "./pages/SubcategoryPage/SubcategoryPage.jsx"

import { ChakraUIProvider } from "./components/ui/provider.jsx"
import CoursesPage from './pages/CoursesPage/CoursesPage.jsx';
import CourseDetailPage from './pages/CourseDetailPage/CourseDetailPage.jsx';
// import { extendTheme } from '@chakra-ui/react'

function App() {

  return (
    <Provider store={store}>
      <ChakraUIProvider>
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
              </Route>
              <Route path="createTest" element={<CreateTestPage />} />
              <Route path="categories">
                <Route index element={<CategoriesPage />} />
                <Route path=":categoryId" element={<CategoryDetailsPage />}/>
                <Route path=":categoryId/subcategories/:subcategoryId" element={<SubcategoryPage />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </ChakraUIProvider>
    </Provider>
  )
}

export default App
