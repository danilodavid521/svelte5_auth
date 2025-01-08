# Project Setup Instructions

This project is built using **SvelteKit**, **TypeScript**, **Supabase**, and **Drizzle ORM**. Follow the instructions below to set up and run the project locally.

## Prerequisites

Ensure you have the following installed on your system:

- [Docker Desktop](https://www.docker.com/products/docker-desktop) (for Supabase local setup)
- [Node.js](https://nodejs.org/) (version 20 or later)

## Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/soco6301/Svelte_app.git
cd Svelte_app
```

### 2. Install Dependencies

Run the following command to install the required Node.js packages:

```bash
npm install
```

### 3. Set Up Supabase Locally

1. **Start Supabase:**

   - Make sure Docker Desktop is running.
   - Run the following command to start Supabase locally:
     ```bash
     npm run supabase:start
     ```

2. **Verify Supabase is Running:**

   - Supabase services should now be running on `http://localhost:54321` for API and `http://localhost:54323` for the database.

     To see status of Supabase services, run:

```bash
npm run supabase:status
```

3. **Configure Environment Variables**

Create a `.env` file in the project root and add the following variables:

```env
PUBLIC_SUPABASE_URL=http://localhost:<port>
PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
DATABASE_URL=postgresql://postgres:postgres@localhost:<port>/postgres
```

- Replace `<your-anon-key>` with the keys provided by the local Supabase setup.

4. **Apply Database Migrations:**
   - Use the Drizzle migration script to set up the database schema:
     ```bash
     npm run db:migrate
     ```

### 5. Run the Development Server

Start the SvelteKit development server:

```bash
npm run dev
```

The application should now be running on `http://localhost:5173` (or the port specified in your environment).

## Additional Commands

### Running Drizzle Migrations

To generate or apply database migrations, use the following commands:

- **Generate a new migration:**

  ```bash
  npm run db:generate
  ```

- **Apply migrations:**
  ```bash
  npm run db:migrate
  ```

### Stopping Supabase

To stop the local Supabase services, run:

```bash
npm run supabase:stop
```

To see status of Supabase services, run:

```bash
npm run supabase:status
```

## Troubleshooting

1. **Docker Issues:**

   - Ensure Docker Desktop is running before starting Supabase.
   - If you encounter issues, restart Docker and try again.

2. **Environment Variables:**

   - Double-check the `.env` file for typos or missing keys.
