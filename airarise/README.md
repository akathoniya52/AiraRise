# AiraRise — Breathe Better. Build a Better Tomorrow.

**AI-powered civic air-quality intelligence** that turns uploaded or pasted air-quality data into traceable insights, prioritized local actions, historical comparisons, and multilingual reports.

## Overview

AiraRise is a full-stack web application built for the **PromptWars (In-person) — Build with AI — Google for Developers × H2S** competition. It addresses the **Civic Air Quality Briefing Studio** challenge.

### What it does

- **Data Ingestion**: Upload CSV/XLSX files or paste tabular data with messy formats, inconsistent units, or missing readings
- **Smart Parsing**: AI-assisted column mapping and unit normalization with full data provenance
- **Deterministic Analytics**: Statistical analysis, trend detection, location comparisons, and hotspot identification
- **AI-Powered Insights**: Google Gemini generates evidence-backed explanations and role-specific recommendations
- **Role-Based Actions**: Tailored interventions for Ward Officers, Housing Society Admins, School Admins, and Field Teams
- **Report Generation**: Internal briefing notes and citizen advisories in multiple languages (English, Hindi) at different reading levels
- **Historical Comparison**: Compare reports over time to track what changed
- **Truthful & Traceable**: Every finding links back to source data; gaps and uncertainty are always flagged

### Supported User Roles

| Role | Focus |
|------|-------|
| **Ward Officer** | Ward-level pollution overview, hotspots, local interventions, progress |
| **Housing Society Admin** | Residential readings, dust actions, resident advisories |
| **School Administrator** | School-area air quality, outdoor-activity guidance, parent advisories |
| **Field Team** | Assigned inspections, hotspot visits, field updates, action tracking |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 + TypeScript |
| Backend | Node.js + Express + TypeScript |
| Database | MongoDB Atlas |
| AI Provider | Google Gemini |
| Styling | Tailwind CSS + shadcn/ui |
| Charts | Recharts |
| Icons | Lucide |

## Project Structure

```
airarise/
├── frontend/          # Next.js + TypeScript (port 3000)
├── backend/           # Node.js + Express + TypeScript (port 4000)
├── docs/              # Architecture, data model, API contracts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Google Gemini API key

### Backend Setup

```bash
cd backend
cp .env.example .env
# Fill in MONGODB_URI, GEMINI_API_KEY, JWT_SECRET
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
cp .env.example .env.local
# Fill in NEXT_PUBLIC_API_URL
npm install
npm run dev
```

### Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Ward Officer | officer@airarise.test | TestPass123! |
| Housing Admin | housing@airarise.test | TestPass123! |
| School Admin | school@airarise.test | TestPass123! |
| Field Team | field@airarise.test | TestPass123! |

## GenAI Services Used

| Service | Where Used |
|---------|-----------|
| **Google Gemini** | AI analysis of air quality data (explanations, findings, severity assessment) |
| **Google Gemini** | Role-specific recommendation generation |
| **Google Gemini** | Internal briefing note generation |
| **Google Gemini** | Citizen advisory generation in multiple languages |
| **Google Gemini** | Report comparison and change detection |
| **Google Gemini** | Ambiguous column/unit interpretation when deterministic mapping fails |

All AI outputs are validated against structured schemas. Numeric calculations are deterministic and never delegated to the AI model.

## Key Features

1. ✅ CSV, XLSX, and paste-table data upload
2. ✅ Column mapping and unit normalization
3. ✅ Data validation with detailed flags (missing, invalid, suspicious, duplicate)
4. ✅ Deterministic PM2.5/PM10 analytics
5. ✅ Real Gemini API-powered analysis
6. ✅ Evidence-linked AI explanations
7. ✅ Role-specific prioritized recommendations
8. ✅ Internal briefing note generation
9. ✅ Citizen advisory generation (English + Hindi)
10. ✅ Previous-report comparison
11. ✅ Responsive UI (desktop + mobile)
12. ✅ Role-based authorization

## License

Built for PromptWars competition. All rights reserved.
