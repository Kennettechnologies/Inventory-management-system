# InvenTrack - Modern Inventory Management System

A comprehensive inventory management system built with React, TypeScript, and Supabase.

## Features

- 🔐 Secure authentication and role-based access control
- 📊 Real-time dashboard with key metrics
- 📦 Product management with barcode scanning
- 📈 AI-powered inventory forecasting
- 📋 Order management (purchase and sales)
- 📊 Comprehensive reporting and analytics
- 👥 User management
- 🤝 Supplier performance tracking
- 📱 Responsive design

## Prerequisites

- Node.js 16+
- npm or yarn
- Supabase account
- Vercel account (for deployment)

## Environment Setup

1. Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

2. Create a `.env.production` file for production environment:
```env
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_supabase_anon_key
```

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Deployment

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Set up environment variables in Vercel:
```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

4. Deploy to Vercel:
```bash
vercel --prod
```

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the contents of the `dist` directory to your hosting provider

## Database Setup

1. Create a new Supabase project
2. Run the SQL commands from `backend/schema.sql`
3. Configure Row Level Security (RLS) policies
4. Set up authentication providers

### Production Database Considerations

1. Enable database backups
2. Set up database replication
3. Configure connection pooling
4. Implement rate limiting
5. Set up database monitoring

## Monitoring and Logging

The system includes built-in monitoring and logging capabilities:

1. Application logs are stored in Supabase
2. Error tracking is implemented
3. Performance monitoring is available
4. User activity logging is enabled

## CI/CD Pipeline

The project uses GitHub Actions for CI/CD. The pipeline includes:

1. Automated testing
2. Code quality checks
3. Security scanning
4. Automated deployment to staging
5. Production deployment with approval

## API Documentation

### Authentication

- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

### Products

- `GET /products` - List all products
- `POST /products` - Create new product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Orders

- `GET /orders` - List all orders
- `POST /orders` - Create new order
- `PUT /orders/:id` - Update order
- `DELETE /orders/:id` - Delete order

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details 