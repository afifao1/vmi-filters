# VMI Filters - Laravel + React Application

A full-stack application for industrial filters catalog with Laravel backend (admin panel) and React frontend.

## Project Structure

```
vmi-filters/
├── vmi-admin-panel/    # Laravel backend with admin panel
├── src/                # React frontend source
├── public/             # Frontend static assets
└── dist/               # Frontend build output
```

## Development Setup

### Prerequisites

- PHP 8.1+
- Composer
- Node.js 18+
- npm
- MySQL/SQLite database

### Backend (Laravel Admin Panel)

1. Navigate to the admin panel directory:
```bash
cd vmi-admin-panel
```

2. Install PHP dependencies:
```bash
composer install
```

3. Copy environment file and configure:
```bash
cp .env.example .env
# Edit .env file with your database credentials
```

4. Generate application key:
```bash
php artisan key:generate
```

5. Run database migrations:
```bash
php artisan migrate
```

6. Create storage symbolic link:
```bash
php artisan storage:link
```

7. Start Laravel development server:
```bash
php artisan serve
# Backend will run on http://127.0.0.1:8000
```

### Frontend (React + Vite)

1. From the project root, install Node dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
# Frontend will run on http://localhost:5173
```

### API Integration

The frontend is configured to proxy API requests to the Laravel backend:
- `/api/*` requests → `http://127.0.0.1:8000/api/*`
- `/storage/*` requests → `http://127.0.0.1:8000/storage/*`

This eliminates CORS issues and allows the frontend to use relative URLs.

## Available API Endpoints

### Products
- `GET /api/products` - List products (with pagination, filtering)
  - Query params: `type`, `status`, `search`, `page`
- `GET /api/products/{id}` - Get single product

### Brands
- `GET /api/brands` - List all brands

### Certificates
- `GET /api/certificates` - List all certificates

## Admin Panel

Access the admin panel at `http://127.0.0.1:8000/admin` after:
1. Creating a user account
2. Setting `is_admin = 1` in the users table

Admin features:
- Manage products (CRUD)
- Manage brands (CRUD)
- Manage certificates (CRUD)
- File uploads for images

## Frontend Features

- **Catalog Page**: Displays products from API with filtering and search
- **Brands Section**: Shows brands from API with fallback to local images
- **Certificates**: Displays certificates from API on About page
- **Real-time Updates**: Changes in admin panel appear immediately on frontend

## Development Commands

### Backend
```bash
cd vmi-admin-panel
php artisan serve          # Start development server
php artisan migrate        # Run database migrations
php artisan storage:link   # Link storage directory
php artisan tinker         # Open Laravel REPL
```

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## Production Deployment

### Backend
1. Set up web server (Apache/Nginx) pointing to `vmi-admin-panel/public`
2. Set `APP_ENV=production` in `.env`
3. Run `composer install --no-dev --optimize-autoloader`
4. Run `php artisan config:cache`
5. Run `php artisan route:cache`
6. Run `php artisan view:cache`

### Frontend
1. Build the frontend:
```bash
npm run build
```

2. Serve the `dist/` directory with a web server
3. Configure the web server to:
   - Serve React app for all routes (SPA routing)
   - Proxy `/api/*` and `/storage/*` to Laravel backend

## Troubleshooting

### Storage Link Issues
If images don't load, ensure the storage link is correct:
```bash
cd vmi-admin-panel
rm public/storage
php artisan storage:link
```

### CORS Issues
The Vite proxy should handle CORS automatically. If you encounter issues:
1. Check `vite.config.js` proxy configuration
2. Ensure Laravel backend is running on `http://127.0.0.1:8000`
3. Check Laravel CORS configuration

### API Not Loading
1. Verify Laravel backend is running
2. Check browser network tab for API request errors
3. Ensure database has sample data:
```bash
cd vmi-admin-panel
php artisan tinker --execute="echo 'Products: ' . App\Models\Product::count();"
```

## Testing Integration

To verify the integration works:

1. **Backend**: Create a new product in admin panel
2. **Frontend**: Check if it appears on catalog page immediately
3. **Images**: Verify product images load correctly via `/storage/*` proxy
4. **Filtering**: Test catalog filters and search functionality

The system should provide seamless real-time updates from admin to frontend without manual synchronization.