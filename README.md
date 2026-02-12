# Areahood Client (Frontend)

React + TypeScript frontend for the Areahood rental marketplace platform.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# API Configuration
VITE_API_URL=http://localhost:3000/api/v1

# Paystack Payment Gateway
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_test_public_key
# For production: VITE_PAYSTACK_PUBLIC_KEY=pk_live_your_live_public_key
```

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development Server

The app runs on `http://localhost:5173` by default (Vite dev server).

## Key Features

- **Authentication**: Login, signup, profile management
- **Rental Marketplace**: Browse listings, create rental requests
- **Payments**: Integrated Paystack payment flow
- **Wallet System**: Balance tracking, withdrawal requests
- **Bank Verification**: Real-time account verification before withdrawals
- **Active Rentals**: Track ongoing rentals, confirm handover/receipt
- **Responsive Design**: Mobile-first, glassmorphism UI

## Paystack Integration

### Test Mode (Development)
1. Use test public key: `pk_test_...`
2. Payment modal will show "TEST" badge
3. Use Paystack test cards for payments

### Live Mode (Production)
1. Use live public key: `pk_live_...`
2. Real transactions will be processed
3. Ensure backend is also using live secret key

## Project Structure

```
src/
├── api/             # API client functions
├── components/      # Reusable components
├── pages/           # Page components
├── store/           # Zustand state management
├── utils/           # Helper functions
└── App.tsx          # Root component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Axios** - HTTP client
- **React Router** - Routing
- **Lucide React** - Icons

## License

MIT
