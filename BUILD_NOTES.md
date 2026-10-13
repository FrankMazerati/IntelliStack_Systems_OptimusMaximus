# IntelliStack Systems — Build 08

**Build label:** BUILD 08 — GLOBAL ADMIN SUPABASE AUTH CONNECTION
**Branch:** `feature/network-operations-secure-shell`

## Purpose

Connect the login form to Supabase Auth, load the signed-in user's application role from `public.profiles`, and avoid allowing users to select their own privileged role on the login screen.

## Deployment checklist

- [ ] Set `VITE_SUPABASE_URL` in Vercel.
- [ ] Set `VITE_SUPABASE_PUBLISHABLE_KEY` in Vercel.
- [ ] Assign the verified Global Admin profile `platform_role = platform_owner`.
- [ ] Confirm the Vercel build completes successfully.
- [ ] Test sign-in and verify the assigned role.

## Security note

Client sign-in and role-based navigation are not a substitute for server-side authorization and database row-level security. Do not use this build with real company data until the remaining authorization controls are implemented and reviewed.
