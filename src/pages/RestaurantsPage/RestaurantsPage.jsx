import React, { useState } from "react";
import { Table } from "../../components/Table/Table";
import { mockRestaurantsTableData } from "../../utils/mock_table_data";
import { StarRating } from "../../components/StarRating/StarRating";
import styles from "./RestaurantsPage.module.scss";

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
        <p className={styles.rating_cell}>
          <StarRating totalStars={3} />
          {props.getValue()}
        </p>
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

  return (
    <>
      <section className={styles.restaurants_page}>
        <h1 class={styles.restaurants_title}>Рестораны</h1>
        <Table data={data} columns={columns} />
      </section>
    </>
  );
};
