# 🌱 Database Seeding Guide

This project uses a **resilient, idempotent seed system** that's safe to run multiple times.

## Resilient Seed (Default - Recommended)

By default, the seed script will **check for existing content** and only create what's missing. This is safe to run multiple times.

### Usage

```bash
pnpm run seed
```

### What it does:
- ✅ Checks for existing users, media, posts, pages
- ✅ Creates only what's missing
- ✅ Updates existing content instead of duplicating
- ✅ Preserves your data
- ✅ Can be run multiple times safely
- ✅ Perfect for iterative development

✨ **Safe**: Won't delete or duplicate existing data!

---

## Reset Mode (Full Database Clear)

Use this when you want to **completely wipe and reset** the database.

### Usage

```bash
pnpm run seed:reset
```

Or via API:

```bash
curl -X POST "http://localhost:3000/api/seed?reset=true"
```

### What it does:
- ⚠️  **CLEARS ALL** collections and globals
- ✅ Creates all media files from scratch
- ✅ Creates categories
- ✅ Creates posts with content
- ✅ Creates all pages (home, about, contact, etc.)
- ✅ Creates forms
- ✅ Updates header and footer globals

⚠️ **Warning**: This will **delete all existing data**!

---

## Common Scenarios

### Scenario 1: Fresh Database
```bash
# For a completely fresh start
pnpm run seed:reset

# Or if you want incremental seeding
pnpm run seed  # Will create only what's needed
```

### Scenario 2: Update Content After Changes
```bash
# You've made changes to seed data and want to update
pnpm run seed  # Will update existing content, create new items
```

### Scenario 3: Development Iteration
```bash
# You're developing and need to re-seed frequently
pnpm run seed  # Safe to run many times, won't duplicate
```

### Scenario 4: Nuclear Reset
```bash
# Something went wrong, start completely fresh
pnpm run seed:reset  # ⚠️  Clears everything and starts fresh
```

---

## Troubleshooting

### "Media not found" warning
If you see:
```
⚠️  Warning: wdeg.jpg not found in media collection
```

**Solution**: Run the full seed first to create media:
```bash
pnpm run seed
```

### Pages-only seed fails
**Make sure**:
1. Dev server is running (`pnpm run dev`)
2. Database is accessible
3. Media exists in the database (run full seed if not)

### Port or hostname issues
If using a different port or hostname, update the script:
```javascript
// scripts/seed-pages-only.js
const response = await fetch('http://localhost:3000/api/seed-pages', {
  // Change to your URL
})
```

---

## API Endpoints

### Resilient Seed (default)
```
POST /api/seed
```

### Reset Seed
```
POST /api/seed?reset=true
```

### Adding Authentication (Optional)

To secure the seed endpoint, add an auth check in `src/app/api/seed/route.ts`:

```typescript
const authHeader = req.headers.get('authorization')
if (authHeader !== `Bearer ${process.env.SEED_SECRET}`) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

Then use:
```bash
curl -X POST http://localhost:3000/api/seed-pages \
  -H "Authorization: Bearer YOUR_SECRET"
```

---

## File Structure

```
src/endpoints/seed/
├── index.ts                  # Full seed logic
├── seed-pages-only.ts        # Pages-only seed logic
├── post-1.ts                 # Post seed data
├── post-2.ts                 # Post seed data
├── post-3.ts                 # Post seed data
├── home.ts                   # Home page seed data
├── about.ts                  # About page seed data
├── contact.ts                # Contact page seed data
├── community.ts              # Community page seed data
├── privacy-policy.ts         # Privacy page seed data
├── terms-of-service.ts       # Terms page seed data
└── ...

src/app/api/
├── seed/
│   └── route.ts              # Full seed endpoint
└── seed-pages/
    └── route.ts              # Pages-only seed endpoint

scripts/
├── run-seed.js               # Full seed script
└── seed-pages-only.js        # Pages-only seed script
```

---

## Tips

1. **Always run full seed first** on a fresh database
2. **Use pages-only seed** for iterative development
3. **Keep media separate** - it's the biggest/slowest part of seeding
4. **Test locally** before deploying seed changes
5. **Back up production** before running any seed scripts

---

## Questions?

Check the main README.md or contact the dev team.

