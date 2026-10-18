<p align="right"><a href="README.md">🇬🇧 English</a> | 🇺🇦 Українська</p>

# LearnLingo

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)

Веб-застосунок для компанії, що пропонує онлайн-уроки з викладачами іноземних мов. Користувач може переглядати й фільтрувати викладачів, додавати їх в обрані, записуватися на пробний урок і змінювати кольорову тему.

🎨 **Макет:** [Figma](https://www.figma.com/design/dewf5jVviSTuWMMyU3d8Mc/Learn-Lingo?node-id=0-1)

## Сторінки

- **Home**: переваги компанії та посилання на сторінку Teachers.

  ![Home](./screenshots/home.png)

- **Teachers**: перелік викладачів з фільтрами за мовою викладання, рівнем знань учнів і ціною за годину.

  ![Teachers](./screenshots/teachers.png)

- **Favorites**: приватна сторінка з викладачами, доданими в «обрані».

  ![Favorites](./screenshots/favorites.png)

## Можливості

- Реєстрація, вхід і вихід через Firebase Authentication
- Картки викладачів з розділом «Read more», де показані деталі та відгуки учнів
- Фільтри за мовою, рівнем і ціною
- «Load more» підвантажує наступних 4 викладачів новим запитом до бази
- Обрані зберігаються у Firebase Realtime Database і лишаються після оновлення сторінки; гостям показується повідомлення
- Форма бронювання пробного уроку (react-hook-form + yup, усі поля обов'язкові)
- Модальні вікна закриваються кнопкою «хрестик», кліком по backdrop або клавішею Esc
- 5 кольорових тем, що перемикаються через CSS-змінні
- Адаптивна верстка: десктоп (від 1440px), планшет і телефон з бургер-меню

## Стек

React 19, TypeScript, Vite, React Router 7, Firebase (Authentication і Realtime Database), react-hook-form, yup, react-hot-toast, react-icons, CSS Modules.

## Технічне завдання

1. Авторизація через Firebase: реєстрація, логін, дані поточного користувача, логаут.
2. Форми реєстрації, входу й бронювання на react-hook-form та yup. Усі поля обов'язкові.
3. Колекція викладачів у Firebase Realtime Database з полями: name, surname, languages, levels, rating, reviews, price_per_hour, lessons_done, avatar_url, lesson_info, conditions, experience.
4. На сторінці Teachers показується 4 картки, решта підвантажується новим запитом до бази по кнопці «Load more».
5. Кнопка «серце»: гість отримує повідомлення, авторизований користувач додає або прибирає викладача з обраних.
6. Маршрутизація на React Router, приватна сторінка Favorites, фільтри за мовою, рівнем і ціною.

## Пагінація

Сторінка Teachers підвантажує викладачів по 4 запитом до бази (`orderByKey` + `limitToFirst`, далі `startAfter` останнього завантаженого ключа). Favorites так само вантажить обраних за id. Коли користувач вибирає фільтр, решта викладачів дозавантажується одним запитом, щоб фільтр охопив усіх.

## Запуск

```bash
git clone https://github.com/Anna-Ivanchenko/learn-lingo.git
cd learn-lingo
npm install
cp .env.example .env
npm run dev
```

Заповніть ключі Firebase у `.env` (див. `.env.example`, усі змінні починаються з `VITE_FIREBASE_`).

Інші команди: `npm run build`, `npm run lint`, `npm run preview`.

## Деплой

Застосунок є SPA, тому потрібен fallback на `index.html`:

- Netlify: `public/_redirects`
- Vercel: `vercel.json`

## Структура

```
src/
├── components/   UI-компоненти (Header, TeacherCard, Modal, ...)
├── contexts/     контексти Auth, Favorites і Theme
├── hooks/        useAuth, useFavorites, useTeachers, ...
├── pages/        Home, Teachers, Favorites
└── utils/        допоміжні функції (наприклад getAuthErrorMessage)
```

## Автор

**Anna Ivanchenko**
[GitHub](https://github.com/Anna-Ivanchenko)
