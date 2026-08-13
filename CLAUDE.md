# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # TypeScript type checking (tsc --noEmit)

npm run db:push      # Sync Prisma schema → database (no migration file)
npm run db:migrate   # Create and apply migration files
npm run db:studio    # Open Prisma Studio GUI
npm run db:seed      # Seed database with initial data
```

> Note: `next.config.js` intentionally ignores ESLint and TypeScript errors during `build`.

## Architecture

**Perlawasi** is a multi-business e-commerce and reservations platform for a hospitality group in Rioja, Peru. It has 9 business lines: Restaurante, Heladería, Café & Cacao, Cervecería, Licorería, Plantas, Ropa, Alojamiento, and a homepage.

### Route Structure

```
src/app/
├── (public)/           # Public storefront — layout adds Header, Footer, ChatBot, WhatsApp button
│   ├── page.tsx        # Homepage
│   └── [category]/     # One folder per business (restaurante, heladeria, ropa, etc.)
├── admin/
│   ├── login/          # Admin auth (cookie: admin_auth)
│   └── (dashboard)/    # Protected admin pages — sidebar layout, one page per category
├── layout.tsx          # Root layout (Toaster only)
└── middleware.ts       # Guards /admin/* routes via admin_auth cookie
```

### Data Layer

- **Supabase** (PostgreSQL) accessed two ways, and they are **not the same tables**:
  - **Prisma** (`src/lib/prisma.ts`) — a generic e-commerce schema (`Product`/`Category`/`Order`/...) used for NextAuth and any transactional/relational flows. See `prisma/schema.prisma`.
  - **Supabase JS client** (`src/lib/supabase.ts`) — direct queries against **per-category tables defined in raw SQL** (`supabase/schema.sql`, `supabase/add_ropa_section.sql`): `plantas`, `heladeria`, `cerveceria`, `licoreria`, `cafe_cacao`, `restaurante_menu`, `productos_ropa`, `reservas`. Admin pages for each business line (`src/app/admin/(dashboard)/<category>/page.tsx`) read/write these directly.
- **Do not assume `prisma/schema.prisma` reflects what's actually in the database.** The two live side by side; `db:push` only touches the Prisma-managed tables (users/orders/payments/reservations-generic), not the per-category tables above. RLS policies for the per-category tables live in `supabase/fix_rls_all_tables.sql`.
- Admin pages typically call `supabase.from('table')` directly, not via API routes
- Public pages may use server components with Prisma or client components with Supabase

### Auth

- **NextAuth.js** with Prisma adapter for customer-facing auth (sessions stored in DB)
- **Admin auth** is a separate, simpler cookie (`admin_auth`) checked by middleware — not NextAuth

### Key Patterns

- **Validation**: Zod schemas in `src/lib/validation.ts`; always sanitize user input (HTML stripping helpers available there)
- **Rate limiting**: `src/lib/rate-limit.ts` uses LRU cache; apply to API routes that accept public input
- **Image uploads**: Use helpers in `src/lib/supabase.ts` — `uploadImage()` / `deleteImage()` — they target Supabase Storage buckets
- **State**: Zustand for global client state; component-level useState for local UI state
- **Animations**: Framer Motion for hero/transition animations; Three.js (with `@react-three/fiber` + `@react-three/drei`) for 3D product viewers
- **Payments**: Mercado Pago — access token on server, public key exposed to client via `NEXT_PUBLIC_`

### Prisma Models (core)

`User` · `Product` · `Category` · `CartItem` · `Order` · `OrderItem` · `Payment` · `Reservation` · `Review` · `AuditLog`

User roles: `CUSTOMER`, `ADMIN`, `SUPER_ADMIN`
Order statuses: `PENDING → CONFIRMED → PREPARING → READY → COMPLETED`

### Supabase-only tables (raw SQL, not in Prisma)

`plantas` · `heladeria` · `cerveceria` · `licoreria` · `cafe_cacao` · `restaurante_menu` · `productos_ropa` · `reservas`

Defined in `supabase/schema.sql` / `supabase/add_ropa_section.sql`. Changes to these go through hand-written SQL migration files in `supabase/`, not `prisma migrate`.

### Environment Variables

See `.env.example` for the full list. Key groups:
- `DATABASE_URL` / `DIRECT_URL` — Supabase PostgreSQL (both needed for Prisma)
- `NEXTAUTH_*` — NextAuth session secrets
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase client
- `MERCADOPAGO_ACCESS_TOKEN` / `NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY` — payments
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — initial admin credentials (used by seed)

### Path Aliases

`@/*` resolves to `./src/*`.
