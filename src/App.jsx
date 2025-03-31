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
import { ChakraUIProvider } from "./components/ui/provider.jsx"

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
              <Route path="createTest" element={<CreateTestPage />} /> 
              </Route>
          </Routes>
        </Router>
      </ChakraUIProvider>
    </Provider>
  )
}

export default App
