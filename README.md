Время выполнения проекта - 20 часов.

# Как работать над проектом

## Окружение

Для удобства работы над проектом используются инструменты из **Node.js** и **npm**. Все необходимые настройки произведены. Убедитесь, что на рабочем компьютере установлен актуальный LTS релиз Node.js**. Актуальная версия **Node.js** указана в файле `package.json` в поле `node`. Затем, в терминале, перейдите в директорию с проектом и _единожды_ запустите команду:

```bash
npm install
```

Команда запустит процесс установки зависимостей проекта из **npm**.

### Сценарии

В `package.json` предопределено несколько сценариев.

#### Скомпилировать проект

```bash
npm run compile
```

Создаст директорию `dist` и скомпилирует проект.

#### Удалить скомпилированный проект

```bash
npm run clean
```

Удаляет директорию `dist`. Используется перед компиляцией.

#### Собрать проект

```bash
npm run build
```

Выполняет сборку проекта: удаляет ранее скомпилированный проект и компилирует заново.

#### Проверить линтером

```bash
npm run lint
```

Запуск проверки проекта статическим анализатором кода **ESLint**.

Линтер проверяет файлы только внутри директории `src`.

**Обратите внимание**, при запуске данной команды, ошибки выводятся в терминал.

#### Запустить ts-модуль без компиляции

```bash
npm run ts -- <Путь к модулю с ts-кодом>
```

Пакет `ts-node` позволяет выполнить TS-код в Node.js без предварительной компиляции. Используется только на этапе разработки.

#### Запустить проект

```bash
npm start
```

#### Запустить приложение с перенаправлением вывода в pino-pretty

```bash
npm run start:dev
```

Запускает приложение с форматированием вывода сообщений логера.

### Список переменных окружения

* PORT=5000 - порт для внешних подключений
* SALT=secret - случайный набор символов для хеширования пароля
* DB_HOST=127.0.0.1 - IP-адрес сервера баз данных
* DB_USER=user - имя пользователя для подключения к базе данных
* DB_PASSWORD=pass - пароль для подключения к базе данных
* DB_PORT=27011 - порт для подключения к базе данных
* DB_NAME=guitar-shop - имя базы данных
* UPLOAD_DIRECTORY=upload - путь к директории, в которую сохраняются файлы от клиентов
* JWT_SECRET=vbvnc128nfdk4 - строка, которая используется в процессе шифрования при подготовке токена
* STATIC_DIRECTORY_PATH=path - путь к директории, в которой хранятся статические ресурсы
* HOST=localhost - хост, на котором запускается сервис
В процессе запуска проекта будет выполнен процесс «Сборки проекта» и запуска результирующего кода.

## Структура проекта

### Директория `src`

Исходный код проекта: компоненты, модули и так далее. Структура директории `src` может быть произвольной.

### Директория `frontend`

Клиентская часть проекта.

#### Установить зависимости

```bash
npm install
```

#### Запустить фронтенд

```bash
npm start
```

### Директория `cli-command`

Содержит аргументы, обработку которых поддерживает CLI:

--generate <n> <connection string>. Заполняет базу данных начальными данными. Параметр <n> задаёт количество генерируемых тестовых товаров. Параметр <connection string> строка с параметрами для подключения к базе данных. Во время подготовки тестовых данных автоматически создаётся один пользователь — admin с паролем admin. Пользователь является администратором (ему доступны все ресурсы).

```bash
npm run ts ./src/cli.ts -- --generate 10 `mongodb://admin:test@127.0.0.1:27017/guitar-shop?authSource=admin`
```

--help — выводит информацию о списке поддерживаемых команд. Эта команда используется по умолчанию (если пользователь не ввёл никакого параметра).
