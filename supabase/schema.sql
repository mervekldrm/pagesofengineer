create table if not exists posts (
  slug text primary key,
  title text not null,
  date text not null,
  excerpt text not null default '',
  category text not null default 'Genel',
  tags jsonb not null default '[]'::jsonb,
  cover_emoji text not null default '📝',
  published boolean not null default true,
  read_time integer not null default 1,
  content text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists projects (
  slug text primary key,
  title text not null,
  date text not null,
  excerpt text not null default '',
  category text not null default 'Genel',
  tags jsonb not null default '[]'::jsonb,
  cover_emoji text not null default '📦',
  published boolean not null default true,
  read_time integer not null default 1,
  status text not null default 'Bilgi yok',
  link text not null default '',
  color text not null default 'transparent',
  content text not null default '',
  updated_at timestamptz not null default now()
);
