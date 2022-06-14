**Todolist**

**Ссылка на демо проекта:** https://tonybnk-todolist.netlify.app

Проект создан для работы с тудулистами (подобие Trello)/ Реализован в виде SPA с использованием
TypeScript, библиотек React и Redux-Toolkit, препроцессора SCSS.

**Реализация:**

На данном этапе в проекте реализованы следующие основные критерии:<br />
• Присутствует страница авторизации пользователя:<br />
Есть возможность регистрации нового пользователя, а также входа пользователя под
тестовыми данными.<br />
• Присутствует страница со списком тудулистов:<br />
Есть возможность создавать, удалять, изменять название тудулистов; добавлять, удалять,
переименовывать таски, а также отмечать их, как выполненные.

Также в каждый тудулист интегрирована фильтрация.

**Валидация:**

Валидация добавлена в форму авторизации и работает со следующими
событиями:<br />
• blur - проверяет текущее поле на предмет ошибок, и если они есть – выводит
сообщение;<br />
• submit - проверяет все поля на предмет ошибок, и если они есть – выводит
сообщение.

**Работа с запросами:**

Работы с запросами осуществляется при помощи библиотеки Axios.<br />
Внедрены следующие HTTP API:<br />
• авторизация, аутентификация, выход из учётной записи пользователя;<br />
• получение, создание, изменение, удаление тудулистов;<br />
• получение, создание, изменение, удаление тасок.

**Роутинг:**

Перемещение между страницами осуществляется при помощи библиотеки
React-Router-Dom.<br />
Реализованы следующие роуты:<br />
• / - страница со списком тудулистов;<br />
• /login - страница авторизации;<br />
• /404 - страница с ошибкой.

При попытке перехода на любой другой роут, происходит редирект на страницу с ошибкой.

**Тесты:**

Написаны тесты для редьюсеров при использовании библиотеки Jest.

**Storybook:**

Для демонстрации некоторых компонентов в проект внедрён storybook.
