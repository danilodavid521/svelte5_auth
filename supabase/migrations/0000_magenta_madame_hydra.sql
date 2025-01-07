CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"bio" text,
	"avatar_url" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "Public profiles are visible to everyone" ON "profiles" AS PERMISSIVE FOR SELECT TO "anon" USING (true);--> statement-breakpoint
CREATE POLICY "Users can insert their own profile" ON "profiles" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((SELECT auth.uid()::text) = user_id);--> statement-breakpoint
CREATE POLICY "Users can update their own profile" ON "profiles" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((SELECT auth.uid()::text) = user_id) WITH CHECK ((SELECT auth.uid()::text) = user_id);