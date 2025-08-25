# Supabase - Auth w/ JavaScript

A boilerplate for user authentication using **Supabase** with **JavaScript**.
Perfect for building MVPs or prototypes quickly, without having to set up your own backend for user management.

> This project is inspired by what I learned from [Scrimba](https://scrimba.com/home).

---

## Tech Stack

* [Supabase](https://supabase.com/) – Authentication & PostgreSQL database
* React + Vite – Frontend
* JavaScript (ESM)

---

## Authentication Flow

![Steps Diagram](https://file.notion.so/f/f/af3e0e95-1efd-48b6-8ba6-5ccbd0e62770/f5520329-61aa-4378-ab5b-cdca87a018f0/Screenshot_2025-08-24_at_21.49.27.png?table=block\&id=257f81e8-719b-80c1-89ea-e946419b9a54\&spaceId=af3e0e95-1efd-48b6-8ba6-5ccbd0e62770\&expirationTimestamp=1756108800000\&signature=sAKw-2pFNk9vX-Uad6NFBzUrAWc1yZ7iMaFW6HsX65k\&downloadName=Screenshot+2025-08-24+at+21.49.27.png)

1. The user signs up or logs in with Supabase.
2. The session is stored on the frontend using React Context.
3. The `user_profiles` table is queried to fetch additional user information.

---

## Database Tables

Supabase automatically creates the `auth.users` table, where basic user information (id, email, etc.) is stored.

We add our own `user_profiles` table to extend user data with custom fields.

**Supabase default table (cannot be modified):**

| Users          |
| -------------- |
| id (PK)        |
| email          |
| role           |
| user\_metadata |

**Custom table created for extra data:**

| user\_profiles |
| -------------- |
| id (PK, FK)    |
| name           |
| account\_type  |

---

## 🚀 Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/ManuelBanchero/supabase-auth-js.git
cd supabase-auth-js
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root with your Supabase credentials:

```env
VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. In Supabase, create the following table:

```sql
create table public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade, -- FK to auth.users(id)
  name text,
  account_type text
);
```

5. Run the project:

```bash
npm run dev
```

---

## Next Steps

This template can be extended with:

* Advanced roles and permissions using **RLS (Row Level Security)**
* Password recovery flow
* OAuth integration (Google, GitHub, etc.)
