// src/lib/supabase.js
// ─────────────────────────────────────────────────────────────────────────────
// Supabase client. Make sure .env has VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// ─────────────────────────────────────────────────────────────────────────────
// SUPABASE SQL SCHEMA
// Run this in your Supabase project → SQL Editor → New Query
// ─────────────────────────────────────────────────────────────────────────────
//
// -- USERS (handled by Supabase Auth automatically)
//
// -- PROFILES (public user info + settings)
// create table profiles (
//   id uuid references auth.users on delete cascade primary key,
//   username text unique,
//   full_name text,
//   booking_slug text unique,          -- e.g. "jane" → /book/jane
//   avatar_url text,
//   availability jsonb default '{
//     "days": [1,2,3,4,5],
//     "startHour": 10,
//     "endHour": 17,
//     "slotDuration": 30,
//     "bufferTime": 15
//   }',
//   created_at timestamptz default now()
// );
// alter table profiles enable row level security;
// create policy "Public profiles are viewable by everyone" on profiles for select using (true);
// create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
//
// -- ROUTINES
// create table routines (
//   id uuid default gen_random_uuid() primary key,
//   user_id uuid references auth.users on delete cascade not null,
//   title text not null,
//   icon text default '📌',
//   time text not null,               -- "HH:MM"
//   duration int not null default 30, -- minutes
//   days int[] not null,              -- [0..6] day indices
//   color int default 0,
//   created_at timestamptz default now()
// );
// alter table routines enable row level security;
// create policy "Users manage own routines" on routines for all using (auth.uid() = user_id);
//
// -- BOOKINGS
// create table bookings (
//   id uuid default gen_random_uuid() primary key,
//   host_id uuid references auth.users on delete cascade not null,
//   guest_name text not null,
//   guest_email text not null,
//   date date not null,
//   time text not null,               -- "HH:MM"
//   duration int not null default 30,
//   note text,
//   status text default 'confirmed',  -- confirmed | cancelled
//   created_at timestamptz default now()
// );
// alter table bookings enable row level security;
// create policy "Hosts see own bookings" on bookings for select using (auth.uid() = host_id);
// create policy "Anyone can create a booking" on bookings for insert with check (true);
// create policy "Hosts can cancel bookings" on bookings for update using (auth.uid() = host_id);
//
// -- TRIGGER: auto-create profile on signup
// create or replace function handle_new_user()
// returns trigger as $$
// begin
//   insert into public.profiles (id, full_name, booking_slug)
//   values (new.id, new.raw_user_meta_data->>'full_name', lower(split_part(new.email, '@', 1)));
//   return new;
// end;
// $$ language plpgsql security definer;
// create trigger on_auth_user_created
//   after insert on auth.users
//   for each row execute procedure handle_new_user();
