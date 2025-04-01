import React from 'react'
import { Outlet } from "react-router-dom";
import styles from './MainLayout.module.scss'
import { Sidebar } from '../../components/Sidebar/Sidebar';

export const MainLayout = () => {

  return (
    <div className={styles.main_layout}>
        <Sidebar />
        <div className={styles.content}>
          <main>
            <Outlet />
          </main>
        </div>
    </div>
  )
}
