dojo

## Performance / Image Optimization


```bash
cwebp -q 80 src/assets/large-photo.jpg -o src/assets/large-photo.webp
```


If you want, I can run `npm install` and `npm run build` now and fix any build errors.


Local development
-----------------

1. Copy the example env and fill your Supabase project values:

```bash
cp .env.example .env.local
# on Windows (PowerShell)
Copy-Item .env.example .env.local
```

2. Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

3. Notes:

- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are required for the client to authenticate with Supabase.
- Never commit service role keys to the repo; only use them server-side if needed.

If you'd like, I can also run `npm install` and `npm run dev` here and report any runtime warnings.

Admin / Instructor invite (secure)
---------------------------------

You can grant `admin` or `instructor` roles without directly editing the database by using a server-side script or a serverless endpoint that runs with the Supabase service role key.

1) Quick one-off (server-side script)

Set environment variables and run the script (server-side only):

```bash
export SUPABASE_URL=https://your-project-ref.supabase.co
export SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
node scripts/invite-admin.js user@example.com instructor
```

2) Serverless endpoint (Vercel / Netlify)

- Deploy `api/invite.js` to your serverless platform and set these env vars on the platform:
	- `SUPABASE_URL`
	- `SUPABASE_SERVICE_ROLE_KEY` (keep this secret)
	- `INVITE_API_SECRET` (a short secret for protecting the endpoint)

- Example cURL (server-to-server):

```bash
curl -X POST https://your-deployment.example/api/invite \
	-H "Authorization: Bearer $INVITE_API_SECRET" \
	-H "Content-Type: application/json" \
	-d '{"email":"user@example.com","role":"admin"}'
```

Security notes:
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to clients or commit it to source control.
- Protect the serverless endpoint with a secret (`INVITE_API_SECRET`) and deploy it to a trusted environment.
- The user must already exist in the Supabase Auth system (they need to sign up) so the script/function can find their `user_id` by email.

