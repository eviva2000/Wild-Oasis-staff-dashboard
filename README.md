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

