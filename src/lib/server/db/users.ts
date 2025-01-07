import type { SupabaseClient } from '@supabase/supabase-js';
import type { InsertUser } from './schema';

export async function createUser(supabase: SupabaseClient, user: InsertUser) {
	const { data, error } = await supabase.from('profiles').insert(user).select().single();

	if (error) throw error;
	return data;
}

export async function getUser(supabase: SupabaseClient, id: string) {
	const { data, error } = await supabase.from('profiles').select().eq('id', id).single();

	if (error) throw error;
	return data;
}

export async function getAllUsers(supabase: SupabaseClient) {
	const { data, error } = await supabase.from('profiles').select();

	if (error) throw error;
	return data;
}

export async function updateUser(supabase: SupabaseClient, id: string, user: Partial<InsertUser>) {
	const { data, error } = await supabase
		.from('profiles')
		.update(user)
		.eq('id', id)
		.select()
		.single();

	if (error) throw error;
	return data;
}

export async function deleteUser(supabase: SupabaseClient, id: string) {
	const { data, error } = await supabase.from('profiles').delete().eq('id', id).select().single();

	if (error) throw error;
	return data;
}
