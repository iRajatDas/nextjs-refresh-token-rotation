This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- **JWT Authentication** with access and refresh token rotation
- **Role-Based Access Control (RBAC)** - USER, MODERATOR, and ADMIN roles
- **Two-Factor Authentication (2FA)** support
- **Session Management** across multiple devices
- **SOLID Architecture** with clean separation of concerns
- **Type-Safe API** with TypeScript interfaces
- **Axios HTTP Client** with automatic token refresh

## Architecture

This project follows SOLID principles:

- **Single Responsibility**: Each service handles one domain
- **Open/Closed**: Services extend interfaces without modification
- **Liskov Substitution**: All implementations honor their contracts
- **Interface Segregation**: Separate interfaces per service domain
- **Dependency Inversion**: Services depend on abstractions

See [API_USAGE.md](./API_USAGE.md) for detailed usage examples.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, set up your environment variables in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Services

The application provides the following services:

- **AuthService**: Authentication, registration, password management
- **UserService**: Profile management, activity logs, sessions
- **TwoFactorService**: 2FA setup and management
- **RecoveryService**: Backup codes, recovery options
- **AdminService**: User management (admin only)

See [API_USAGE.md](./API_USAGE.md) for complete documentation.

## Project Structure

```
src/
├── app/                    # Next.js app directory
├── components/             # React components
├── functions/              # Helper functions
├── lib/
│   ├── api/               # API exports
│   ├── http/              # HTTP client implementation
│   ├── interfaces/        # Service interfaces
│   ├── services/          # Service implementations
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
├── middlewares/           # Next.js middlewares
└── middleware.ts          # Middleware chain configuration
```

## API Documentation

The complete backend API specification is in `postman_collection.json`. Import it into Postman for:

- Full endpoint documentation
- Request/response examples
- Authentication flows
- Role-based access patterns

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
