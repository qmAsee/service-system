export const mockCategories = [
  {
    id: 1,
    category: "Холодные напитки",
    dateAdded: "два месяца назад",
    subcategories: [
      {
        id: 101,
        name: "Лимонады",
        dateAdded: "месяц назад",
        items: [
          {
            id: 1001,
            name: "Классический лимонад",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 320,
            description: "Освежающий лимонад с мятой и лаймом",
            isPopular: true,
            weight: "400 мл"
          },
          {
            id: 1002,
            name: "Ягодный лимонад",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 350,
            description: "Смесь сезонных ягод с газированной водой",
            weight: "400 мл"
          },
          {
            id: 1003,
            name: "Цитрусовый спритц",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 380,
            description: "Апельсин, грейпфрут и тоник",
            weight: "450 мл"
          }
        ]
      },
      {
        id: 102,
        name: "Соки и фреши",
        dateAdded: "3 недели назад",
        items: [
          {
            id: 1004,
            name: "Апельсиновый фреш",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 280,
            description: "Свежевыжатый апельсиновый сок",
            isPopular: true,
            weight: "250 мл"
          },
          {
            id: 1005,
            name: "Яблочно-морковный",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 300,
            description: "Полезный микс яблока и моркови",
            weight: "250 мл"
          },
          {
            id: 1006,
            name: "Гранатовый сок",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 320,
            description: "Натуральный гранатовый сок",
            weight: "250 мл"
          }
        ]
      },
      {
        id: 103,
        name: "Молочные коктейли",
        dateAdded: "2 недели назад",
        items: [
          {
            id: 1007,
            name: "Ванильный коктейль",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 390,
            description: "Нежный ванильный вкус со сливочным мороженым",
            weight: "350 мл"
          },
          {
            id: 1008,
            name: "Шоколадный коктейль",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 390,
            description: "Насыщенный шоколадный вкус",
            isPopular: true,
            weight: "350 мл"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    category: "Горячие напитки",
    dateAdded: "месяц назад",
    subcategories: [
      {
        id: 201,
        name: "Кофе",
        dateAdded: "месяц назад",
        items: [
          {
            id: 2001,
            name: "Эспрессо",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 180,
            description: "Крепкий черный кофе",
            weight: "30 мл"
          },
          {
            id: 2002,
            name: "Капучино",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 250,
            description: "Кофе с молочной пенкой",
            isPopular: true,
            weight: "200 мл"
          },
          {
            id: 2003,
            name: "Латте",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 270,
            description: "Нежный кофе с молоком",
            weight: "250 мл"
          },
          {
            id: 2004,
            name: "Раф кофе",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 290,
            description: "Кофе с ванильным сиропом и сливками",
            weight: "220 мл"
          }
        ]
      },
      {
        id: 202,
        name: "Чай",
        dateAdded: "3 недели назад",
        items: [
          {
            id: 2005,
            name: "Черный чай",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 150,
            description: "Классический английский чай",
            weight: "300 мл"
          },
          {
            id: 2006,
            name: "Зеленый чай",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 150,
            description: "Ароматный японский сенча",
            weight: "300 мл"
          },
          {
            id: 2007,
            name: "Фруктовый чай",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 180,
            description: "Смесь ягод и фруктов",
            weight: "300 мл"
          }
        ]
      },
      {
        id: 203,
        name: "Горячий шоколад",
        dateAdded: "неделю назад",
        items: [
          {
            id: 2008,
            name: "Классический",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 280,
            description: "Густой горячий шоколад",
            weight: "200 мл"
          },
          {
            id: 2009,
            name: "С маршмеллоу",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 320,
            description: "С нежными зефирками",
            isPopular: true,
            weight: "220 мл"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    category: "Основные блюда",
    dateAdded: "три месяца назад",
    subcategories: [
      {
        id: 301,
        name: "Паста",
        dateAdded: "2 месяца назад",
        items: [
          {
            id: 3001,
            name: "Карбонара",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 420,
            description: "Спагетти, бекон, сливочный соус",
            isPopular: true,
            weight: "350 г"
          },
          {
            id: 3002,
            name: "Болоньезе",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 450,
            description: "Спагетти с мясным соусом",
            weight: "350 г"
          },
          {
            id: 3003,
            name: "Феттучини Альфредо",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 460,
            description: "С нежным сливочным соусом",
            weight: "350 г"
          }
        ]
      },
      {
        id: 302,
        name: "Пицца",
        dateAdded: "месяц назад",
        items: [
          {
            id: 3004,
            name: "Маргарита",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 550,
            description: "Классическая итальянская пицца",
            weight: "500 г"
          },
          {
            id: 3005,
            name: "Пепперони",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 600,
            description: "С острой колбаской и сыром",
            isPopular: true,
            weight: "550 г"
          },
          {
            id: 3006,
            name: "Четыре сыра",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 620,
            description: "Смесь лучших итальянских сыров",
            weight: "500 г"
          }
        ]
      },
      {
        id: 303,
        name: "Стейки",
        dateAdded: "3 недели назад",
        items: [
          {
            id: 3007,
            name: "Рибай",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 890,
            description: "Мраморная говядина, прожарка на выбор",
            weight: "300 г"
          },
          {
            id: 3008,
            name: "Филе-миньон",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 950,
            description: "Нежнейшая вырезка",
            isPopular: true,
            weight: "250 г"
          }
        ]
      },
      {
        id: 304,
        name: "Рыбные блюда",
        dateAdded: "неделю назад",
        items: [
          {
            id: 3009,
            name: "Лосось на гриле",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 750,
            description: "С лимонным соусом и овощами",
            weight: "300 г"
          },
          {
            id: 3010,
            name: "Дорадо",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 780,
            description: "Запеченная с травами",
            weight: "350 г"
          }
        ]
      }
    ]
  },
  {
    id: 4,
    category: "Закуски",
    dateAdded: "неделю назад",
    subcategories: [
      {
        id: 401,
        name: "Салаты",
        dateAdded: "неделю назад",
        items: [
          {
            id: 4001,
            name: "Цезарь",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 420,
            description: "С курицей, листьями айсберг и соусом цезарь",
            isPopular: true,
            weight: "250 г"
          },
          {
            id: 4002,
            name: "Греческий",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 380,
            description: "Свежие овощи с фетой и оливками",
            weight: "250 г"
          }
        ]
      },
      {
        id: 402,
        name: "Брускетты",
        dateAdded: "5 дней назад",
        items: [
          {
            id: 4003,
            name: "С томатами",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 280,
            description: "Свежие томаты с базиликом",
            weight: "150 г"
          },
          {
            id: 4004,
            name: "С авокадо",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 320,
            description: "Пюре из авокадо с кинзой",
            weight: "150 г"
          }
        ]
      },
      {
        id: 403,
        name: "Сырная тарелка",
        dateAdded: "3 дня назад",
        items: [
          {
            id: 4005,
            name: "Ассорти сыров",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 650,
            description: "Подборка лучших европейских сыров",
            weight: "300 г"
          }
        ]
      }
    ]
  },
  {
    id: 5,
    category: "Десерты",
    dateAdded: "две недели назад",
    subcategories: [
      {
        id: 501,
        name: "Торты",
        dateAdded: "2 недели назад",
        items: [
          {
            id: 5001,
            name: "Чизкейк Нью-Йорк",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 420,
            description: "Классический чизкейк с ягодным соусом",
            isPopular: true,
            weight: "150 г"
          },
          {
            id: 5002,
            name: "Красный бархат",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 380,
            description: "Нежный бисквит с крем-чизом",
            weight: "150 г"
          }
        ]
      },
      {
        id: 502,
        name: "Пирожные",
        dateAdded: "неделю назад",
        items: [
          {
            id: 5003,
            name: "Эклер",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 220,
            description: "С заварным кремом",
            weight: "100 г"
          },
          {
            id: 5004,
            name: "Медовик",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 240,
            description: "Слоеный медовый торт",
            weight: "120 г"
          }
        ]
      },
      {
        id: 503,
        name: "Мороженое",
        dateAdded: "5 дней назад",
        items: [
          {
            id: 5005,
            name: "Пломбир",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 180,
            description: "Классический пломбир в вафельном стаканчике",
            weight: "100 г"
          },
          {
            id: 5006,
            name: "Сорбет",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 200,
            description: "Освежающий фруктовый сорбет",
            weight: "100 г"
          }
        ]
      }
    ]
  },
  {
    id: 6,
    category: "Алкогольные напитки",
    dateAdded: "четыре месяца назад",
    subcategories: [
      {
        id: 601,
        name: "Вино",
        dateAdded: "3 месяца назад",
        items: [
          {
            id: 6001,
            name: "Кьянти",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 1200,
            description: "Итальянское красное вино, 0.75 л",
            volume: "750 мл"
          },
          {
            id: 6002,
            name: "Шардоне",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 1100,
            description: "Белое сухое вино, 0.75 л",
            volume: "750 мл"
          }
        ]
      },
      {
        id: 602,
        name: "Коктейли",
        dateAdded: "2 месяца назад",
        items: [
          {
            id: 6003,
            name: "Мохито",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 450,
            description: "Светлый ром, лайм, мята, содовая",
            volume: "300 мл"
          },
          {
            id: 6004,
            name: "Маргарита",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 480,
            description: "Текила, трипл сек, лаймовый сок",
            volume: "250 мл"
          }
        ]
      },
      {
        id: 603,
        name: "Пиво",
        dateAdded: "месяц назад",
        items: [
          {
            id: 6005,
            name: "Лагер",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 350,
            description: "Светлое фильтрованное, 0.5 л",
            volume: "500 мл"
          },
          {
            id: 6006,
            name: "Стаут",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 380,
            description: "Темное нефильтрованное, 0.5 л",
            volume: "500 мл"
          }
        ]
      },
      {
        id: 604,
        name: "Крепкий алкоголь",
        dateAdded: "3 недели назад",
        items: [
          {
            id: 6007,
            name: "Виски Jack Daniels",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 1800,
            description: "40%, 50 мл",
            volume: "50 мл"
          },
          {
            id: 6008,
            name: "Коньяк Армения",
            image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9",
            price: 1500,
            description: "5 лет выдержки, 40%, 50 мл",
            volume: "50 мл"
          }
        ]
      }
    ]
  }
];