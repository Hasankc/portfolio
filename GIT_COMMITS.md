# GIT COMMIT MESSAGES
# Copy-paste these in order when you push the project to GitHub.
# Written in conventional commits format (type: description).
# Keep them under 72 chars. No periods at the end. Don't over-explain.

# ─────────────────────────────────────────────────────────
# INITIAL SETUP — run these first when creating the repo
# ─────────────────────────────────────────────────────────

git commit -m "chore: initial repo setup with Next.js and FastAPI"

# after adding all the base config files (tsconfig, tailwind, next.config, etc.)
git commit -m "chore: add tsconfig, tailwind, postcss and eslint config"

# ─────────────────────────────────────────────────────────
# FRONTEND — commit each section separately so the history is readable
# ─────────────────────────────────────────────────────────

git commit -m "feat: add global CSS design system with dark/light mode tokens"

git commit -m "feat: add root layout with SEO metadata and open graph tags"

git commit -m "feat: add ThemeProvider with localStorage persistence"

git commit -m "feat: add Navbar with active section tracking and mobile menu"

git commit -m "feat: add StarField and CursorGlow ambient effects"

git commit -m "feat: add Hero section with typewriter animation and profile photo"

git commit -m "feat: add About section with animated stat cards"

git commit -m "feat: add Skills section with tabbed categories and animated bars"

git commit -m "feat: add Experience section with vertical timeline layout"

git commit -m "feat: add Projects section with live GitHub API integration"

git commit -m "feat: add AI chat section powered by Claude API"

git commit -m "feat: add Contact section with Zod-validated form"

git commit -m "feat: add Footer with nav links and social icons"

git commit -m "feat: add 404 page and sitemap route"

# ─────────────────────────────────────────────────────────
# BACKEND
# ─────────────────────────────────────────────────────────

git commit -m "feat: add FastAPI backend with CORS and security headers"

git commit -m "feat: add rate limiting and HTML sanitisation middleware"

git commit -m "feat: add contact form endpoint with async SMTP email"

git commit -m "feat: add AI chat endpoint proxying Anthropic Claude API"

git commit -m "chore: add requirements.txt and .env.example for backend"

# ─────────────────────────────────────────────────────────
# TESTS
# ─────────────────────────────────────────────────────────

git commit -m "test: add Jest setup and mocks for frontend testing"

git commit -m "test: add utils and lib unit tests"

git commit -m "test: add component tests for Navbar and Footer"

git commit -m "test: add contact form validation tests"

git commit -m "test: add backend tests for sanitisation and payload validation"

# ─────────────────────────────────────────────────────────
# POLISH / FIXES — after you deploy and notice things
# ─────────────────────────────────────────────────────────

git commit -m "fix: escape ampersands in Footer and Skills JSX"

git commit -m "fix: add missing aria-labels to icon buttons"

git commit -m "fix: correct mobile nav z-index overlapping content"

git commit -m "perf: lazy load GitHub repos only when projects section is visible"

git commit -m "chore: add robots.txt and update sitemap URL"

git commit -m "docs: update README with deployment steps and env var table"

# ─────────────────────────────────────────────────────────
# AFTER ADDING YOUR CV PDF
# ─────────────────────────────────────────────────────────

git commit -m "feat: add CV PDF to public folder for download"

# ─────────────────────────────────────────────────────────
# EXAMPLE ONGOING COMMITS (once the site is live)
# ─────────────────────────────────────────────────────────

# updating personal info
git commit -m "content: update availability status to unavailable"
git commit -m "content: add new project to featured list"
git commit -m "content: update skills — added Rust as learning"

# general improvements
git commit -m "perf: reduce hero animation jank on low-end mobile"
git commit -m "fix: contact form not clearing after successful submission"
git commit -m "style: tighten up card padding on small screens"
git commit -m "feat: add keyboard shortcut to toggle theme (Cmd+Shift+L)"
