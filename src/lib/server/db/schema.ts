import { pgTable, text, timestamp, pgPolicy, uuid } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { authenticatedRole } from 'drizzle-orm/supabase';

// export const users = pgTable('users', {
// 	id: text('id').primaryKey(),
// 	email: varchar('email', { length: 255 }).notNull().unique(),
// 	created_at: timestamp('created_at').defaultNow().notNull(),
// 	updated_at: timestamp('updated_at').defaultNow().notNull()
// });

export const profiles = pgTable(
	'profiles',
	{
		id: uuid('id').primaryKey(),
		userId: text('user_id')
			// .references(() => users.id, { onDelete: 'cascade' })
			.notNull(),
		bio: text('bio'),
		avatar_url: text('avatar_url'),
		updated_at: timestamp('updated_at').defaultNow().notNull()
	},
	() => [
		// Select policy
		pgPolicy('Public profiles are visible to everyone', {
			as: 'permissive',
			to: ['anon', authenticatedRole],
			for: 'select',
			using: sql`true`
		}),

		// Insert policy
		pgPolicy('Users can insert their own profile', {
			as: 'permissive',
			to: authenticatedRole,
			for: 'insert',
			withCheck: sql`(SELECT auth.uid()::text) = user_id`
		}),

		// Update policy
		pgPolicy('Users can update their own profile', {
			as: 'permissive',
			to: authenticatedRole,
			for: 'update',
			using: sql`(SELECT auth.uid()::text) = user_id`,
			withCheck: sql`(SELECT auth.uid()::text) = user_id`
		})
	]
);

export type InsertUser = typeof profiles.$inferInsert;
export type SelectUser = typeof profiles.$inferSelect;

// export const usersRelations = relations(users, ({ one }) => ({
// 	profile: one(profiles, {
// 		fields: [users.id],
// 		references: [profiles.userId]
// 	})
// }));
