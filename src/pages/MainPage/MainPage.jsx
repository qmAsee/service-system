import React from 'react'
import styles from './MainPage.module.scss'
import graph from '../../assets/mock_graph.jpg'
import profile_icon from '../../assets/profile_icon.svg'
import { Link } from 'react-router-dom'
import { StarRating } from '../../components/StarRating/StarRating'

export const MainPage = () => {
  return (
    <>
      <div className={styles.mainpage_section}>
        <h1 className={styles.mainpage_title}>Главная</h1>
        <section>
          <img src={graph}/>
        </section>
        <section className={styles.mainpage_info}>
          <div className={styles.mainpage_stats}>
            <div className={styles.mainpage_stats_block}>
              <h2 className={styles.mainpage_stat_title}>Статистика</h2>
              <div className={styles.mainpage_stat_block}>
                <span>251 испытуемый</span>
                <span>579 тестирований</span>
              </div>
            </div>
            <div>
              <h2 className={styles.mainpage_stat_title}>Сотрудники</h2>
              <div className={styles.mainpage_stat_block}>
                <div  className={styles.mainpage_stat_strip}>
                  <div className='bg-red-400'></div>
                  <div className='bg-green-400'></div>
                </div>
                <span>Лимит: 500</span>
              </div>
            </div>
            <div>
              <h2 className={styles.mainpage_stat_title}>Сложные вопросы</h2>
              <div className={styles.mainpage_stat_block}>
                <ul className='flex flex-col gap-5'>
                  <li className={styles.mainpage_stat_list_element}>
                    <Link to="/main" className={styles.mainpage_stat_question}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam aspernatur iusto, officia repellendus laboriosam ex?</Link>
                    <span className={styles.mainpage_stat_fail_percent}>100% ошибок</span>
                  </li>
                  <li className={styles.mainpage_stat_list_element}>
                    <Link to="/main" className={styles.mainpage_stat_question}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam aspernatur iusto, officia repellendus laboriosam ex?</Link>
                    <span className={styles.mainpage_stat_fail_percent}>100% ошибок</span>
                  </li>
                  <li className={styles.mainpage_stat_list_element}>
                    <Link to="/main" className={styles.mainpage_stat_question}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam aspernatur iusto, officia repellendus laboriosam ex?</Link>
                    <span className={styles.mainpage_stat_fail_percent}>100% ошибок</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.mainpage_stats}>
            <h2 className={styles.mainpage_stat_title}>Лучшие</h2>
            <div className={styles.mainpage_stat_block}>
              <Link className={styles.mainpage_stat_question}>Ресторан 1</Link>
              <div className='flex gap-3'>
                <StarRating totalStars={3}/>
                <span>1%</span>
              </div>
            </div>
            <div className={styles.mainpage_stat_block}>
              <Link className={styles.mainpage_stat_question}>Ресторан 2</Link>
              <div className='flex gap-3'>
                <StarRating totalStars={3}/>
                <span>0%</span>
              </div>
            </div>
            <div className={styles.mainpage_stat_block}>
              <Link className={styles.mainpage_stat_question}>Ресторан 2</Link>
              <div className='flex gap-3'>
                <StarRating totalStars={3}/>
                <span>0%</span>
              </div>
            </div>
            <ul className='flex flex-col gap-8'>
              <li className='flex items-center gap-4'>
                <img className='w-10' src={profile_icon} alt="profile" />
                <div className='flex flex-col gap-1'>
                  <span>Иван Иванов</span>
                  <span>157 монет</span>
                </div>
              </li>
              <li className='flex items-center gap-4'>
                <img className='w-10' src={profile_icon} alt="profile" />
                <div className='flex flex-col gap-1'>
                  <span>Иван Иванов</span>
                  <span>157 монет</span>
                </div>
              </li>
              <li className='flex items-center gap-4'>
                <img className='w-10' src={profile_icon} alt="profile" />
                <div className='flex flex-col gap-1'>
                  <span>Иван Иванов</span>
                  <span>157 монет</span>
                </div>
              </li>
              <li className='flex items-center gap-4'>
                <img className='w-10' src={profile_icon} alt="profile" />
                <div className='flex flex-col gap-1'>
                  <span>Иван Иванов</span>
                  <span>157 монет</span>
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.mainpage_stats}>
            <h2 className={styles.mainpage_stat_title}>Не начали обучение</h2>
            <div className={styles.mainpage_stat_block}>
              <Link className={styles.mainpage_stat_question}>Ресторан 1</Link>
              <div className='flex gap-3'>
                <StarRating totalStars={3}/>
                <span>1%</span>
              </div>
            </div>
            <div className={styles.mainpage_stat_block}>
              <Link className={styles.mainpage_stat_question}>Ресторан 2</Link>
              <div className='flex gap-3'>
                <StarRating totalStars={3}/>
                <span>0%</span>
              </div>
            </div>
            <div className={styles.mainpage_stat_block}>
              <Link className={styles.mainpage_stat_question}>Ресторан 2</Link>
              <div className='flex gap-3'>
                <StarRating totalStars={3}/>
                <span>0%</span>
              </div>
            </div>
            <ul className='flex flex-col gap-8'>
              <li className='flex items-center gap-4'>
                <img className='w-10' src={profile_icon} alt="profile" />
                <div className='flex flex-col gap-1'>
                  <span>Иван Иванов</span>
                  <span>157 монет</span>
                </div>
              </li>
              <li className='flex items-center gap-4'>
                <img className='w-10' src={profile_icon} alt="profile" />
                <div className='flex flex-col gap-1'>
                  <span>Иван Иванов</span>
                  <span>157 монет</span>
                </div>
              </li>
              <li className='flex items-center gap-4'>
                <img className='w-10' src={profile_icon} alt="profile" />
                <div className='flex flex-col gap-1'>
                  <span>Иван Иванов</span>
                  <span>157 монет</span>
                </div>
              </li>
              <li className='flex items-center gap-4'>
                <img className='w-10' src={profile_icon} alt="profile" />
                <div className='flex flex-col gap-1'>
                  <span>Иван Иванов</span>
                  <span>157 монет</span>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  )
}
