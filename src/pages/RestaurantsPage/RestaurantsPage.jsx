import React, { useRef, useState } from "react";
import { Table } from "../../components/Table/Table";
import { mockRestaurantsTableData } from "../../utils/mock_table_data";
import { StarRating } from "../../components/StarRating/StarRating";
import styles from "./RestaurantsPage.module.scss";
import { Button, Input, Select } from "antd";
import Popup from "../../components/Popup/Popup";
import { countryCodes } from "@/utils/phone_codes";
import { timeZones } from "@/utils/time_zones";

const columns = [
  {
    accessorKey: "name",
    header: "НАЗВАНИЕ",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "address",
    header: "АДРЕС",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "manager",
    header: "УПРАВЛЯЮЩИЙ",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "rating",
    header: "УСПЕВАЕМОСТЬ",
    cell: (props) => {
      return (
        <div className={styles.rating_cell}>
          <StarRating totalStars={3} />
          {props.getValue()}
        </div>
      );
    },
  },
  {
    accessorKey: "staffCount",
    header: "СОТРУДНИКОВ",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "city",
    header: "ГОРОД",
    cell: (props) => <p>{props.getValue()}</p>,
  },
];

export const RestaurantsPage = () => {
  const [data, setData] = useState(mockRestaurantsTableData);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef() 

  function handleClosePopupByClickOutside(event) {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsPopupOpen(false);
      console.log(event.target)
    }
  }

  function handleClosePopup() {
    setIsPopupOpen(false);
  }

  return (
    <>
    {isPopupOpen &&
      <Popup
        ref={popupRef}
        handleClosePopupByClickOutside={handleClosePopupByClickOutside}
        handleClosePopup={handleClosePopup}
      >
        <form className={styles.form}>
          <h2 className={styles.form_title}>Добавить ресторан</h2>
          <div className={styles.form_grid_wrapper}>
              <label htmlFor="name">Название</label>
              <Input type="text" id="name" className={styles.form_input} placeholder="Введите название" autoComplete="none"/>

              <label htmlFor="address">Адрес</label>
              <Input type="text" id="address" className={styles.form_input} placeholder="Введите адрес (не обязательно)" autoComplete="none"/>

              <label htmlFor="phone">Телефон</label>
              <div className={styles.phone_container}>
                <Select options={countryCodes} defaultValue="+7" className={styles.phone_select} />
                <Input type="tel" id="phone" className={styles.form_phone_input} placeholder="Введите номер телефона" autoComplete="none"/>
              </div>

              <label htmlFor="timeZone">Часовая зона</label>
              <Select options={timeZones} defaultValue="(GMT +03:00) Москва" className={styles.time_select} />
              
              <label htmlFor="description" className={styles.description_label}>Описание</label>
              <Input.TextArea id="description" className={styles.description} placeholder="Введите описание ресторана" style={{minHeight: "100px"}}/>
          </div>
          <div className={styles.buttons_box}>
            <Button onClick={handleClosePopup} type="default">Отменить</Button>
            <Button type="primary">Сохранить</Button>
          </div>
        </form>
      </Popup>
    }
    <div className={styles.restaurants_page}>
      <div className={styles.header}>
        <h1 className={styles.restaurants_title}>Рестораны</h1>
        <div className={styles.actions_container}  style={{zIndex: "1"}}>
          <Button className={styles.add_button} type="primary" onClick={() => setIsPopupOpen(true)}>Добавить</Button>
          <Input className={styles.input} placeholder="Поиск"/>
        </div>
      </div>
      <section className={styles.restaurants_table}>
        <Table data={data} columns={columns} />
      </section>
    </div>
    </>
  );
};
