import React from 'react';
import styles from './Sidebar.module.scss';
import { NavLink } from 'react-router-dom';

const SidebarLink = React.memo(({ to, children }) => {
  return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${styles.sidebar_list_element} ${isActive ? styles.sidebar_list_element_active : ''}`
        }
      >
        <span className={styles.sidebar_link}>{children}</span>
      </NavLink>
  );
});

export const Sidebar = React.memo(() => {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.sidebar_logo}>
        <SidebarLink to="/">LOGO</SidebarLink>
      </div>

      <div className={styles.sidebar_section}>
        <h2 className={styles.sidebar_section_title}>СТРУКТУРА</h2>
        <ul className={styles.sidebar_links}>
          <SidebarLink to="/main">Главная</SidebarLink>
          <SidebarLink to="/restaurants">Рестораны</SidebarLink>
          <SidebarLink to="/managers">Управляющие</SidebarLink>
          <SidebarLink to="/employees">Сотрудники</SidebarLink>
          <SidebarLink to="/positions">Должности</SidebarLink>
        </ul>
      </div>

      <div className={styles.sidebar_section}>
        <h2 className={styles.sidebar_section_title}>УПРАВЛЕНИЕ ОБУЧЕНИЕМ</h2>
        <ul className={styles.sidebar_links}>
          <SidebarLink to="/">Меню</SidebarLink>
          <SidebarLink to="/">Учебные курсы</SidebarLink>
          <SidebarLink to="/">Библиотека</SidebarLink>
          <SidebarLink to="/">Аттестации</SidebarLink>
          <SidebarLink to="/">Лента новостей</SidebarLink>
          <SidebarLink to="/">Опросы</SidebarLink>
          <SidebarLink to="/">График работы</SidebarLink>
        </ul>
      </div>

      <div className={styles.sidebar_section}>
        <h2 className={styles.sidebar_section_title}>АНАЛИТИКА</h2>
        <ul className={styles.sidebar_links}>
          <SidebarLink to="/">Отчеты</SidebarLink>
          <SidebarLink to="/">Статистика</SidebarLink>
        </ul>
      </div>

      <div className={styles.sidebar_section}>
        <h2 className={styles.sidebar_section_title}>ПРОЧЕЕ</h2>
        <ul className={styles.sidebar_links}>
          <SidebarLink to="/">Чаты</SidebarLink>
          <SidebarLink to="/">Настройки</SidebarLink>
          <SidebarLink to="/">Призы</SidebarLink>
          <SidebarLink to="/">Мотивация</SidebarLink>
        </ul>
      </div>
    </nav>
  );
});