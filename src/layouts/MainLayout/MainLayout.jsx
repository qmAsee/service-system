import React from 'react'
import { Outlet } from "react-router-dom";
import styles from './MainLayout.module.scss'
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { useDispatch, useSelector } from "react-redux";

export const MainLayout = () => {
  const courses = useSelector((state) => state.courses.courses)
  const course = useSelector((state) => state.courses.course)

  function loglog() {
    console.log(courses)
    console.log(course)
  }

  return (
    <div className={styles.main_layout}>
        <Sidebar />
        <div className={styles.content}>
          <main>
      <button onClick={loglog}>qwe</button>
      <Outlet />
          </main>
        </div>
    </div>
  )
}
