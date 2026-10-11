
MAXIMUS OPTIMUS Portal — responsive web prototype
This is a front-end starter for the IntelliStack Systems / MAXIMUS OPTIMUS landing and sign-in portal.
Files
index.html — semantic page structure, employee login, marketplace panels, connector directory and footer.
styles.css — neon-blue/purple visual system and responsive layouts.
app.js — UI interactions and optional Supabase Auth wiring.
assets/maximus-command-center.png — generated background image used by the page.
Run locally
Open index.html in a browser, or serve this folder with a local static server. For deployment, import the folder/repository into Vercel and use the project root as the deployment root. No build command is required for this static prototype.
Responsive behavior
The layout uses CSS media queries for mobile/tablet portrait and landscape, including orientation: landscape and available viewport height. It adapts to rotation rather than forcing a device to rotate. Test at common phone and tablet sizes in browser dev tools and on the actual devices.
Supabase setup
Create or select your Supabase project.
In app.js, set SUPABASE_URL and SUPABASE_ANON_KEY to the project URL and publishable/anon key.
Enable the Auth providers you intend to use in Supabase (email/password, Google, Apple, phone, etc.).
Add your local and deployed callback URLs to the Supabase and provider configurations.
Set up row-level security (RLS) policies and tenant/role checks before exposing real user or business data.
Implement a real password-reset route at /reset-password, and route successful sessions to a protected workspace.
Never put a Supabase service_role key or any provider client secret in front-end code. The browser can contain only public project configuration and publishable/anon keys; sensitive secrets belong in server-side environment variables or a trusted backend.
Connector sign-in vs. connector authorization
The connector dropdown is a UI starting point only. Signing into MAXIMUS OPTIMUS and authorizing a business application (such as ServiceNow, Power BI or Teams) are separate flows. Each connector requires an adapter, provider-specific OAuth/API configuration, requested scopes, secure server-side token storage, tenant authorization, audit logging, and disconnect/revocation handling. The current buttons intentionally do not pretend those integrations are live.
Production items still required
Real provider branding/assets and final text review.
Protected routes and role-based access control.
Supabase RLS policies and tenant membership model.
Connector registry and server-side callback/token handling.
Error, loading, MFA, verification, rate-limit and abuse states.
Accessibility testing, responsive QA, browser testing, and security review.
