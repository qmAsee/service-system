import React, { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom";
import styles from './MainLayout.module.scss'
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { useDispatch, useSelector } from "react-redux";
// import { setCourse } from "@/store/slices/courseSlice";

export const MainLayout = () => {
  const courses = useSelector((state) => state.courses.courses)
  const course = useSelector((state) => state.courses.course)
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const handlePopupStateChange = (event) => {
      setIsPopupOpen(event.detail.isOpen);
    };
    
    window.addEventListener('popupStateChange', handlePopupStateChange);

    return () => {
      window.removeEventListener('popupStateChange', handlePopupStateChange);
    };
  }, []);


  // const {courseId} = useParams()
  // const dispatch = useDispatch();

  // const updateData = () => {
  //   dispatch(setCourse(courses.find((c) => c.id === courseId)))
  // }

  function loglog() {
    console.log(courses)
    console.log(course)
  }

  return (
    <div className={styles.main_layout}>
        <Sidebar />
        <div className={`${styles.content} ${isPopupOpen ? styles.no_scroll : ''}`}>
          <main>
      {/* <button onClick={loglog}>qwe</button> */}
      {/* <button onClick={updateData}>updateData</button> */}
      <Outlet />
          </main>
        </div>
    </div>
  )
}
