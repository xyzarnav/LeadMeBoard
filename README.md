# EkTurfa

A full-stack application built with Express.js backend and Next.js frontend.

## Project Structure

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 8+
- MongoDB (for backend)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd EKTURFA
```

2. Install dependencies for all workspaces
```bash
npm run install:all
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

### Development

Start both backend and frontend in development mode:
```bash
npm run dev
```

Or start them individually:
```bash
# Backend only
npm run dev:backend

# Frontend only  
npm run dev:frontend
```

### Building for Production

```bash
npm run build
```

### Testing

```bash
# Run all tests
npm run test

# Run backend tests
npm run test:backend

# Run frontend tests
npm run test:frontend
```

## API Documentation

- Backend API: http://localhost:3001/api
- Frontend: http://localhost:3000

## Tech Stack

### Backend
- Express.js
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- Express Rate Limiting
- CORS & Security Headers

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

MIT License