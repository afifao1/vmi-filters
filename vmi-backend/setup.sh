#!/bin/bash

# VMI Backend Setup Script
# This script sets up the Laravel 12 backend for the VMI website

set -e

echo "🚀 VMI Backend Setup Script"
echo "============================"

# Check if we're in the right directory
if [ ! -f "artisan" ]; then
    echo "❌ Error: Please run this script from the vmi-backend directory"
    exit 1
fi

# Check PHP version
PHP_VERSION=$(php -r "echo PHP_VERSION;")
echo "📋 PHP Version: $PHP_VERSION"

if [[ $(echo "$PHP_VERSION 8.4" | tr " " "\n" | sort -V | head -n 1) != "8.4" ]]; then
    echo "⚠️  Warning: PHP 8.4+ recommended, current version: $PHP_VERSION"
fi

# Check required PHP extensions
echo "🔍 Checking PHP extensions..."
REQUIRED_EXTENSIONS=("pdo_pgsql" "mbstring" "xml" "curl" "zip")
MISSING_EXTENSIONS=()

for ext in "${REQUIRED_EXTENSIONS[@]}"; do
    if ! php -m | grep -q "^$ext$"; then
        MISSING_EXTENSIONS+=("$ext")
    fi
done

if [ ${#MISSING_EXTENSIONS[@]} -ne 0 ]; then
    echo "❌ Missing PHP extensions: ${MISSING_EXTENSIONS[*]}"
    echo "Please install them and try again"
    exit 1
fi

echo "✅ All required PHP extensions are installed"

# Install Composer dependencies
echo "📦 Installing Composer dependencies..."
composer install --no-interaction

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
    else
        echo "⚠️  .env.example not found, creating basic .env..."
        cat > .env << EOF
APP_NAME="VMI Backend"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=vmi
DB_USERNAME=vmi
DB_PASSWORD=1234

BROADCAST_DRIVER=log
CACHE_STORE=database
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database
SESSION_DRIVER=database
SESSION_LIFETIME=120

MAIL_MAILER=log
MAIL_FROM_ADDRESS="afifaholmirzaeva@gmail.com"
MAIL_FROM_NAME="VMI Заявки"

FRONTEND_ORIGIN=http://localhost:5173
SALES_TO="afifaholmirzaeva@gmail.com"

TELEGRAM_BOT_TOKEN=<YOUR_TELEGRAM_BOT_TOKEN>
TELEGRAM_CHAT_ID=<YOUR_TELEGRAM_CHAT_ID>
EOF
    fi
fi

# Generate application key
echo "🔑 Generating application key..."
php artisan key:generate

# Create session and queue tables
echo "📊 Creating session and queue tables..."
php artisan session:table
php artisan queue:table

# Run migrations
echo "🗄️  Running database migrations..."
php artisan migrate

echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Configure your .env file with database credentials"
echo "2. Set up Telegram bot (optional):"
echo "   - Create bot via @BotFather"
echo "   - Add TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID to .env"
echo "3. Start the server: php artisan serve"
echo "4. Start queue worker: php artisan queue:work"
echo ""
echo "🧪 Test the API:"
echo "curl -X OPTIONS http://localhost:8000/api/leads \\"
echo "  -H 'Origin: http://localhost:5173' \\"
echo "  -H 'Access-Control-Request-Method: POST'"
echo ""
echo "🚀 Happy coding!"
