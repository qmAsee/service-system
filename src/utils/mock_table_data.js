export const mockRestaurantsTableData = [
  {
    name: "La Bella Vita",
    address: "ул. Ленина, 12",
    manager: "Иван Петров",
    rating: 3,
    staffCount: 25,
    city: "Москва",
  },
  {
    name: "Sushi Haven",
    address: "пр. Мира, 45",
    manager: "Анастасия Смирнова",
    rating: 2,
    staffCount: 18,
    city: "Санкт-Петербург",
  },
  {
    name: "Burger Bonanza",
    address: "ул. Советская, 3",
    manager: "Дмитрий Иванов",
    rating: 1,
    staffCount: 15,
    city: "Екатеринбург",
  },
  {
    name: "Chez Marie",
    address: "ул. Горская, 78",
    manager: "Елена Козлова",
    rating: 3,
    staffCount: 30,
    city: "Новосибирск",
  },
  {
    name: "Taco Fiesta",
    address: "пр. Победы, 22",
    manager: "Алексей Соколов",
    rating: 2,
    staffCount: 20,
    city: "Казань",
  },
];

export const mockManagersTableData = [
  {
    fullName: "Иван Сергеевич Петров",
    position: "Управляющий",
    registrationDate: "2023-05-12",
    birthDate: "1985-03-15",
  },
  {
    fullName: "Анастасия Викторовна Смирнова",
    position: "Старший менеджер",
    registrationDate: "2022-11-20",
    birthDate: "1990-07-22",
  },
  {
    fullName: "Дмитрий Александрович Иванов",
    position: "Управляющий",
    registrationDate: "2024-01-10",
    birthDate: "1988-09-30",
  },
  {
    fullName: "Елена Николаевна Козлова",
    position: "Директор по развитию",
    registrationDate: "2021-08-05",
    birthDate: "1979-12-01",
  },
  {
    fullName: "Алексей Павлович Соколов",
    position: "Управляющий",
    registrationDate: "2023-09-18",
    birthDate: "1992-04-17",
  },
];

// export const mockRestaurantsColumns = [
//   {
//     Header: "Название",
//     accessor: "restaurantInfo",
//     Cell: ({ value }) =>
//       `<div>
//             <strong>{value.name}</strong>
//             <br />
//             {value.address}
//           </div>`,
//   },
//   { Header: "Управляющий", accessor: "manager" },
//   { Header: "Рейтинг", accessor: "rating" },
//   { Header: "Кол-во сотрудников", accessor: "staffCount" },
//   { Header: "Город", accessor: "city" },
// ];
