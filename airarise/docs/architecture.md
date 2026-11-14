# AiraRise Architecture

## System Overview

```
Browser
  |
  v
frontend/  —  Next.js 14 + TypeScript  (port 3000)
  |
  | HTTPS REST API
  v
backend/   —  Node.js + TypeScript + Express  (port 4000)
  |
  +---- Authentication & Authorization (JWT + bcrypt)
  +---- Dataset Ingestion & Parsing (PapaParse + SheetJS)
  +---- Normalization & Validation (Zod schemas)
  +---- Deterministic Analytics (custom calculation engine)
  +---- Gemini Orchestration (structured prompts + response validation)
  +---- Recommendations (role-specific, evidence-linked)
  +---- Reports & Comparisons (multilingual, multi-level)
  |
  +---- MongoDB Atlas (persistence)
  |
  +---- Google Gemini API (AI provider)
```

## Frontend Architecture

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS with custom AiraRise design tokens
- **Components**: shadcn/ui-compatible primitives with Radix UI
- **Charts**: Recharts
- **Icons**: Lucide React
- **State**: React hooks + context (no heavy state management needed)
- **API Client**: Axios with JWT interceptor

### Page Structure

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Landing | Product introduction |
| `/login` | Login | Authentication |
| `/register` | Register | User registration |
| `/dashboard` | Overview | Main dashboard with metrics |
| `/air-quality` | Air Quality Intelligence | AI-powered analysis |
| `/data-upload` | Data Upload Studio | File upload and preview |
| `/ai-insights` | AI Insights | Automated AI findings |
| `/pollution-hotspots` | Pollution Hotspots | Map and severity view |
| `/action-center` | Action Center | Interventions hub |
| `/reports` | Reports & Advisories | Report generation |
| `/historical` | Historical Comparisons | Period comparisons |
| `/settings` | Settings | User and org settings |

## Backend Architecture

- **Framework**: Express.js
- **Language**: TypeScript (strict)
- **Database ODM**: Mongoose
- **Authentication**: JWT + bcryptjs
- **Validation**: Zod (request + response)
- **File Parsing**: PapaParse (CSV), SheetJS (XLSX)
- **AI SDK**: @google/generative-ai

### Module Structure

Each domain module follows: `model → service → controller → routes`

- **auth**: Registration, login, JWT token management
- **users**: User profile, role management
- **organizations**: Org settings, data isolation
- **datasets**: Upload, paste, parse, preview
- **readings**: Canonical reading storage, normalization
- **analytics**: Deterministic statistics and calculations
- **ai**: Gemini service, prompts, response validation
- **recommendations**: Role-specific action items
- **reports**: Briefing and advisory generation
- **history**: Report comparison engine

## Processing Pipeline

```
Upload / Paste
     |
     v
Parse original input (PapaParse / SheetJS)
     |
     v
Map columns and units (deterministic + AI fallback)
     |
     v
Validate and flag quality issues
     |
     v
Persist normalized readings (MongoDB)
     |
     v
Calculate statistics deterministically
     |
     v
Build evidence-bounded AI request
     |
     v
Call Gemini (structured JSON response)
     |
     v
Validate structured AI response (Zod)
     |
     v
Persist analysis and recommendations
     |
     v
Render findings and generate reports
```

## Security Model

- JWT-based authentication with bcryptjs password hashing
- Role-based authorization on every API endpoint
- Organization-level data isolation
- Input validation on all endpoints (Zod)
- Upload size and MIME type restrictions
- Rate limiting on auth and AI endpoints
- CORS restricted to frontend origin
- Secrets in environment variables only
- Safe error messages (no stack traces leaked)

## Data Truthfulness Rules

1. Never present sample values as real measurements
2. Never convert missing values to zero
3. Never silently guess unknown units
4. Never claim a hotspot is confirmed without sufficient evidence
5. Clearly distinguish: measured values → deterministic calculations → AI interpretations
6. Every finding traceable to dataset, location, timestamp, source row
7. AI health guidance is cautious, non-diagnostic
