# The Wild Oasis

A modern hotel management dashboard built with React and Supabase. This application provides a comprehensive interface for managing hotel operations including bookings, cabins, guests, and settings.

## Features

- **Dashboard Analytics** - Overview of bookings, sales, check-ins, and occupancy rates
- **Cabin Management** - Add, edit, delete, and manage hotel cabins with photos
- **Booking System** - View, filter, and manage guest bookings
- **Guest Check-in/Check-out** - Streamlined process for guest arrivals and departures
- **Settings Management** - Configure hotel settings like pricing and policies
- **User Authentication** - Secure login system for hotel staff
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Styled Components
- **Backend**: Supabase (PostgreSQL database, Authentication, Storage)
- **Routing**: React Router DOM
- **Icons**: React Icons

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 16 or higher)
- npm or yarn package manager
- A Supabase account and project

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd the-wild-oasis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings → API in your Supabase dashboard
   - Copy your Project URL and anon/public key

4. **Configure environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Set up the database**
   You'll need to create the following tables in your Supabase database:
   - `cabins` - Store cabin information
   - `bookings` - Store booking records
   - `guests` - Store guest information
   - `settings` - Store application settings

   Refer to the SQL schema files in the `src/data/` directory for table structures.

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── data/               # Sample data and database utilities
├── features/           # Feature-based modules
│   ├── authentication/ # Login and user management
│   ├── bookings/       # Booking management
│   ├── cabins/         # Cabin management
│   ├── check-in-out/   # Guest check-in/out processes
│   ├── dashboard/      # Analytics and overview
│   └── settings/       # Application settings
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API services and Supabase client
├── styles/             # Global styles
├── ui/                 # Base UI components
└── utils/              # Utility functions
```

## Key Features Explained

### Dashboard
- Real-time analytics showing recent bookings, sales, and check-ins
- Visual charts displaying occupancy rates and revenue trends
- Quick access to today's activities

### Cabin Management
- CRUD operations for hotel cabins
- Image upload and management
- Cabin availability tracking

### Booking System
- Comprehensive booking overview with filtering and sorting
- Detailed booking information including guest details and payment status
- Booking status management (confirmed, checked-in, checked-out)

### Authentication
- Secure user authentication via Supabase Auth
- Role-based access control for hotel staff

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous/public key |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub or contact the development team.