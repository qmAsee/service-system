import React, { useState } from 'react'
import { Table } from '../../components/Table/Table'
import { mockManagersTableData } from '../../utils/mock_table_data'
import styles from './ManagersPage.module.scss'

const managerColumns = [
  {
    accessorKey: "fullName",
    header: "ПОЛНОЕ ИМЯ",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "position",
    header: "ДОЛЖНОСТЬ",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "registrationDate",
    header: "ДАТА РЕГИСТРАЦИИ",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "birthDate",
    header: "ДАТА РОЖДЕНИЯ",
    cell: (props) => <p>{props.getValue()}</p>,
  },
];

export const ManagersPage = () => {
  const [data, setData] = useState(mockManagersTableData)
  return (
    <>
      <div className={styles.managers_page}>
        <h1 class={styles.managers_title}>Управляющие</h1>
        <Table data={data} columns={managerColumns}/>
      </div>
    </>
  )
}
