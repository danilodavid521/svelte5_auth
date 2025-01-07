import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/lib/server/db/schema.ts',
	out: './supabase/migrations',
	dbCredentials: {
		url: process.env.DATABASE_URL
	},
	entities: {
    roles: {
      provider: 'supabase'
    }
  },
	verbose: true,
	strict: true
});
