# VMI Backend - Laravel 12 API

Backend API для сайта VMI, обрабатывающий заявки от клиентов с уведомлениями через Email и Telegram.

## 🚀 Технологии

- **PHP 8.4+**
- **Laravel 12**
- **PostgreSQL** (с расширениями citext, pg_trgm)
- **Database Queues** для фоновых задач
- **Database Sessions**
- **CORS** для Vite frontend

## 📋 Требования

### PHP расширения
```bash
# Обязательные
pdo_pgsql    # PostgreSQL драйвер
mbstring     # Мультибайтовые строки
xml          # XML обработка
curl         # HTTP запросы
zip          # Архивация

# Проверка расширений
php -m | grep -E "(pdo_pgsql|mbstring|xml|curl|zip)"
```

### Системные требования
- PHP 8.4+
- PostgreSQL 12+
- Composer 2.0+
- Node.js 18+ (для Vite)

## 🛠️ Установка

### 1. Клонирование и зависимости
```bash
cd vmi-backend
composer install
```

### 2. Настройка окружения
```bash
cp .env.example .env
php artisan key:generate
```

### 3. Настройка .env
```env
APP_NAME="VMI Backend"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

# База данных
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=vmi
DB_USERNAME=vmi
DB_PASSWORD=1234

# Сессии и очереди
SESSION_DRIVER=database
QUEUE_CONNECTION=database
CACHE_STORE=database

# Почта
MAIL_MAILER=log
MAIL_FROM_ADDRESS="afifaholmirzaeva@gmail.com"
MAIL_FROM_NAME="VMI Заявки"

# Frontend
FRONTEND_ORIGIN=http://localhost:5173
SALES_TO="afifaholmirzaeva@gmail.com"

# Telegram (опционально)
TELEGRAM_BOT_TOKEN=<YOUR_TELEGRAM_BOT_TOKEN>
TELEGRAM_CHAT_ID=<YOUR_TELEGRAM_CHAT_ID>
```

### 4. Создание базы данных
```bash
# Создайте базу данных в PostgreSQL
createdb vmi

# Или через psql
psql -U postgres
CREATE DATABASE vmi;
CREATE USER vmi WITH PASSWORD '1234';
GRANT ALL PRIVILEGES ON DATABASE vmi TO vmi;
\q
```

### 5. Миграции и таблицы
```bash
# Создание таблиц для сессий и очередей
php artisan session:table
php artisan queue:table

# Запуск миграций
php artisan migrate

# Проверка статуса
php artisan migrate:status
```

## 🚀 Запуск

### Основной сервер
```bash
php artisan serve
# Сервер доступен по адресу: http://localhost:8000
```

### Очереди (в отдельном терминале)
```bash
php artisan queue:work
# Или с автоматическим перезапуском
php artisan queue:work --tries=3 --timeout=60
```

### Логи (опционально)
```bash
php artisan pail
# Просмотр логов в реальном времени
```

## 🌐 CORS настройки

### Конфигурация
Файл `config/cors.php` настроен для:
- Разрешенные origins: `http://localhost:5173`, `http://127.0.0.1:5173`
- Все методы и заголовки разрешены
- `supports_credentials = false` (для dev)

### Middleware
CORS middleware добавлен глобально в `bootstrap/app.php`:
```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->use([
        HandleCors::class,
    ]);
})
```

### Альтернативный вариант (только для API)
```php
// В routes/api.php добавить middleware группу
Route::middleware(['cors'])->group(function () {
    Route::post('/leads', [LeadController::class, 'store']);
});
```

## 📧 Настройка почты

### Разработка (логи)
```env
MAIL_MAILER=log
```
Письма сохраняются в `storage/logs/laravel.log`

### Продакшн (Gmail SMTP)
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your-email@gmail.com
MAIL_FROM_NAME="VMI Заявки"
```

**Примечание:** Для Gmail используйте App Password, не обычный пароль.

## 🤖 Telegram уведомления

### Создание бота
1. Напишите @BotFather в Telegram
2. Создайте нового бота: `/newbot`
3. Получите токен и chat_id

### Настройка .env
```env
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

### Получение chat_id
```bash
# Отправьте сообщение боту и проверьте логи
curl "https://api.telegram.org/bot{YOUR_TOKEN}/getUpdates"
```

## 🧪 Тестирование API

### Quick Check

#### 1. Preflight (CORS)
```bash
curl -i -X OPTIONS http://127.0.0.1:8000/api/leads \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: content-type"
```

**Ожидаемый результат:**
```
HTTP/1.0 204 No Content
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: POST
Access-Control-Allow-Headers: content-type
```

#### 2. POST Contact Lead
```bash
curl -i -X POST http://127.0.0.1:8000/api/leads \
  -H "Origin: http://localhost:5173" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "contact",
    "name": "Иван",
    "phone": "+7 900 000-00-00",
    "email": "ivan@example.com",
    "message": "Позвоните, пожалуйста",
    "source": "hero"
  }'
```

**Ожидаемый результат:**
```
HTTP/1.0 201 Created
Access-Control-Allow-Origin: http://localhost:5173
Content-Type: application/json

{
  "ok": true,
  "id": 1,
  "msg": "Заявка принята"
}
```

#### 3. POST Product Lead
```bash
curl -i -X POST http://127.0.0.1:8000/api/leads \
  -H "Origin: http://localhost:5173" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "product",
    "name": "Иван",
    "phone": "+7 900 000-00-00",
    "email": "ivan@example.com",
    "product_id": 123,
    "product_title": "Промфильтр X",
    "quantity": 2,
    "source": "catalog"
  }'
```

**Ожидаемый результат:** HTTP 201 + CORS header

#### 4. Validation Error
```bash
curl -i -X POST http://127.0.0.1:8000/api/leads \
  -H "Origin: http://localhost:5173" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "contact",
    "name": "И",
    "phone": "123",
    "email": "invalid-email"
  }'
```

**Ожидаемый результат:**
```
HTTP/1.0 422 Unprocessable Entity
{
  "message": "The given data was invalid.",
  "errors": {
    "name": ["Имя должно содержать минимум 2 символа"],
    "phone": ["Введите корректный номер телефона"],
    "email": ["Введите корректный email"]
  }
}
```

## 📊 Структура базы данных

### Таблица leads
- **id** - bigserial (первичный ключ)
- **type** - enum('contact', 'product')
- **name** - varchar(120)
- **phone** - varchar(50)
- **email** - citext(200) - регистронезависимый
- **message** - text (nullable)
- **product_id** - bigint (nullable)
- **product_title** - varchar(255) (nullable)
- **quantity** - integer (1-999)
- **source** - varchar(50) (nullable)
- **status** - varchar(20) (new/processing/done)
- **source_url** - varchar (nullable)
- **ip** - inet (nullable)
- **user_agent** - text (nullable)
- **meta** - jsonb (nullable)

### Индексы
- `(type, status)` - для фильтрации заявок
- `created_at` - для сортировки по времени
- `email` - для поиска по email
- `phone` - для поиска по телефону
- `meta` - GIN индекс для JSONB запросов

### PostgreSQL особенности
- **CITEXT** для регистронезависимых email
- **JSONB** для гибких метаданных
- **CHECK constraints** для валидации данных
- **GIN индексы** для эффективного поиска по JSON

## 🔧 Разработка

### Структура файлов
```
app/
├── Http/
│   ├── Controllers/Api/LeadController.php
│   └── Requests/StoreLeadRequest.php
├── Jobs/SendLeadNotifications.php
├── Mail/LeadCreatedMail.php
├── Models/Lead.php
└── Services/TelegramService.php

database/migrations/
├── 2025_08_20_000000_enable_pg_extensions.php
└── 2025_08_20_000100_create_leads_table.php

resources/views/emails/
└── lead_created.blade.php

config/
└── cors.php
```

### Основные компоненты
1. **Lead Model** - модель заявки с валидацией и отношениями
2. **StoreLeadRequest** - валидация входящих данных с русскими сообщениями
3. **LeadController** - API endpoint для создания заявок
4. **SendLeadNotifications** - фоновая задача для уведомлений
5. **TelegramService** - отправка уведомлений в Telegram
6. **LeadCreatedMail** - email шаблон для уведомлений

## 🚨 Мониторинг и логи

### Логи Laravel
```bash
# Основные логи
tail -f storage/logs/laravel.log

# Через artisan
php artisan pail
```

### Очереди
```bash
# Статус очередей
php artisan queue:monitor

# Неудачные задачи
php artisan queue:failed

# Повторный запуск неудачных задач
php artisan queue:retry all
```

### База данных
```bash
# Проверка подключения
php artisan tinker
DB::connection()->getPdo();
```

## 🚀 Продакшн

### Оптимизация
```bash
# Кэширование конфигурации
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Оптимизация автозагрузчика
composer install --optimize-autoloader --no-dev
```

### Supervisor (для очередей)
```ini
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /path/to/vmi-backend/artisan queue:work --sleep=3 --tries=3
autostart=true
autorestart=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/path/to/vmi-backend/storage/logs/worker.log
```

### Nginx
```nginx
location / {
    try_files $uri $uri/ /index.php?$query_string;
}

location ~ \.php$ {
    fastcgi_pass unix:/var/run/php/php8.4-fpm.sock;
    fastcgi_index index.php;
    fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
    include fastcgi_params;
}
```

## 📝 Лицензия

MIT License - см. файл LICENSE для деталей.

## 🤝 Поддержка

При возникновении проблем:
1. Проверьте логи в `storage/logs/laravel.log`
2. Убедитесь, что все переменные окружения настроены
3. Проверьте статус очередей: `php artisan queue:work`
4. Проверьте подключение к базе данных
