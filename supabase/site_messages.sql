-- Messages reçus depuis le site www.paysapro-ai.fr (formulaire de contact + inscription aux nouveautés).
-- À exécuter UNE fois : Supabase → SQL Editor → New query → coller → Run. Ne supprime rien.
--
-- Sécurité : le site utilise la clé PUBLIQUE (publishable). Il peut uniquement AJOUTER une ligne.
-- Aucune règle de lecture n'existe : personne ne peut lire, modifier ou supprimer ces messages
-- avec la clé publique. Vous les consultez dans Supabase → Table Editor → site_messages.

create table if not exists public.site_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  type text not null check (type in ('contact', 'newsletter')),
  email text not null check (char_length(email) between 5 and 320 and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  name text check (char_length(name) <= 200),
  company text check (char_length(company) <= 200),
  phone text check (char_length(phone) <= 40),
  company_type text check (char_length(company_type) <= 100),
  employees text check (char_length(employees) <= 40),
  topic text check (char_length(topic) <= 40),
  message text check (char_length(message) <= 5000),
  consent boolean,
  -- à cocher vous-même une fois le message traité
  handled boolean not null default false
);

alter table public.site_messages enable row level security;

drop policy if exists site_messages_insert on public.site_messages;
create policy site_messages_insert on public.site_messages
  for insert to anon, authenticated
  with check (handled = false);

-- Le site ne peut fournir que ces colonnes (id, created_at et handled sont fixés par la base).
revoke all on public.site_messages from anon, authenticated;
grant insert (type, email, name, company, phone, company_type, employees, topic, message, consent)
  on public.site_messages to anon, authenticated;

create index if not exists site_messages_created_at_idx on public.site_messages (created_at desc);
