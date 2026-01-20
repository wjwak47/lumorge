# TechSports Frontend

A standalone frontend application extracted from the TechSports Next.js project. This application provides a complete user interface for browsing sports technology products and applications, powered by a comprehensive mock data system.

## Features

- **Product Showcase**: Browse and search sports technology products
- **Application Gallery**: Explore real-world implementation case studies
- **Responsive Design**: Optimized for desktop and mobile devices
- **Mock Data System**: Complete offline functionality with realistic data
- **Modern Tech Stack**: Built with Next.js 15, React 19, and Tailwind CSS

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone or extract the project:
```bash
cd frontend-extracted
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality
- `npm run export` - Build and export as static files
- `npm test` - Run the test suite
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
frontend-extracted/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   ├── data/mock/          # Mock data JSON files
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions and API layer
│   └── contexts/           # React contexts
├── public/                 # Static assets
├── __tests__/             # Test files
└── docs/                  # Documentation
```

## Mock Data System

The application uses a comprehensive mock data system that replaces all backend API calls:

- **Products**: Complete product catalog with specifications
- **Applications**: Real-world case studies and implementations
- **News**: Latest updates and announcements
- **Settings**: Site configuration and preferences
- **Navigation**: Menu structure and routing

All mock data is stored in `src/data/mock/` as JSON files and automatically loaded by the API layer.

## Building for Production

### Standard Build
```bash
npm run build
npm run start
```

### Static Export
For hosting on static file servers:
```bash
npm run export
```

This generates a `out/` directory with all static files.

## Testing

The project includes comprehensive tests covering:

- Component functionality
- API layer consistency
- Mock data integrity
- Static asset preservation
- Build configuration
- Functional equivalence

Run tests with:
```bash
npm test
```

## Backend Integration

This frontend is designed to easily integrate with a backend API. See the [Backend Integration Guide](docs/backend-integration.md) for detailed instructions on replacing mock data with real API calls.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Follow the existing code style and patterns
2. Add tests for new features
3. Update documentation as needed
4. Ensure all tests pass before submitting

## License

This project is part of the TechSports application suite.