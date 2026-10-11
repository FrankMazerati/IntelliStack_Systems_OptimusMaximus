# Maximus Optimus Command Center — Supabase starter

This is a starter project, not a production-complete enterprise platform. It includes the home/login page, the provided hero image, and a baseline Supabase schema.

## Files
- `index.html` — responsive login/landing page and basic post-login dashboard shell.
- `assets/command-center-home.png` — the exact supplied home-page concept image.
- `supabase/schema.sql` — starter database schema, profile trigger, row-level security policies, and manual platform-owner provisioning instructions.

## Setup
1. Create a new project in Supabase.
2. Open **SQL Editor**, paste/run `supabase/schema.sql`.
3. Open **Project Settings → API** (or Connect) and copy the Project URL and publishable key (legacy anon key is also supported).
4. In `index.html`, replace `PASTE_YOUR_SUPABASE_PROJECT_URL_HERE` and `PASTE_YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY_HERE` with those values. The publishable/anon key is designed for browser use when Row Level Security is configured. **Never paste the service_role or secret key into this file.**
5. Serve the folder from a local web server or deploy it to your host. Opening as a raw `file://` page can prevent ES module imports and auth redirects from working correctly.
6. Sign up with your intended administrator email and confirm it if required by your Supabase Auth settings.
7. In Supabase SQL Editor, run the one-time platform-owner update at the bottom of `schema.sql`, replacing the placeholder email with the exact admin email. Check that one row was updated and verify the role with the provided query.
8. Sign in. The page reads the user's own profile role and shows a basic dashboard shell. The global administration features are not built yet.

## Important security notes
- Passwords are handled by Supabase Auth; this project never stores plaintext passwords in an application table.
- Public signup always creates a normal `user`. Signup metadata cannot grant platform-owner privileges.
- Do not expose the SQL Editor, database password, service_role key, or admin provisioning query to customers.
- The SQL schema is a starter. Have it reviewed and tested before using real company data. Organization creation, invitations, billing, custom permissions, ticket workflows, audit-write paths, MFA, rate limits, backups, and operational monitoring still need implementation.
- Microsoft/Azure, AWS federation, phone OTP, and Intune device-compliance checks are not connected in this starter. Configure identity providers in Supabase and implement provider-specific flows. Intune is a device-compliance integration, not a standalone sign-in provider.
- Dashboard totals and other demo figures are simulated; they are not live data.
- Contact addresses and policy links in the mock footer are placeholders; verify and replace before launch.
