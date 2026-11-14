# AiraRise Data Model

## Entity Relationship Overview

```
User ──┐
       ├── belongs to ── Organization
       │
       ├── uploads ── Dataset
       │                 │
       │                 ├── contains ── Reading (many)
       │                 │
       │                 └── produces ── AnalysisReport
       │                                    │
       │                                    ├── generates ── Recommendation (many)
       │                                    │
       │                                    └── produces ── GeneratedBrief (many)
       │
       └── creates ── GeneratedBrief
```

## Schemas

### User
| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Primary key |
| displayName | String | User's display name |
| email | String | Unique, indexed |
| passwordHash | String | bcryptjs hash |
| role | Enum | ward_officer, housing_admin, school_admin, field_team |
| organizationId | ObjectId | Reference to Organization |
| status | Enum | active, inactive, suspended |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |

### Organization
| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Primary key |
| name | String | Organization name |
| type | Enum | municipal_ward, housing_society, school, field_unit |
| locations | [String] | Areas of responsibility |
| settings | Object | Org-level configuration |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |

### Dataset
| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Primary key |
| ownerId | ObjectId | Uploading user |
| organizationId | ObjectId | Data isolation |
| originalFilename | String | Original file name (if uploaded) |
| inputMethod | Enum | file, paste |
| uploadTimestamp | Date | When uploaded |
| originalHeaders | [String] | Raw column headers |
| detectedMapping | Object | Column name → canonical field mapping |
| detectedUnits | Object | Column → detected unit |
| parsingStatus | Enum | pending, parsing, parsed, failed |
| validationSummary | Object | Counts of valid, flagged, rejected readings |
| sourceMetadata | Object | File size, encoding, row count |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |

### Reading
| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Primary key |
| datasetId | ObjectId | Parent dataset |
| sourceRow | Number | Original row number |
| location | String? | Location identifier |
| timestamp | String? | Original timestamp |
| pollutant | Enum | PM2.5, PM10, NO2, SO2, CO, O3, UNKNOWN |
| rawValue | Mixed | Original value (string or number) |
| value | Number? | Parsed numeric value |
| rawUnit | String? | Original unit |
| normalizedValue | Number? | After unit conversion |
| normalizedUnit | String? | Target unit |
| flags | [String] | Validation flags |

**Indexes**: datasetId, location, pollutant, timestamp

### AnalysisReport
| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Primary key |
| datasetId | ObjectId | Source dataset |
| organizationId | ObjectId | Data isolation |
| analysisTimestamp | Date | When analysis ran |
| metrics | Object | Deterministic statistics |
| trends | Object | Time-series results |
| possibleHotspots | [Object] | Ranked potential hotspots |
| dataQualitySummary | Object | Quality flags summary |
| aiExplanation | Object | Gemini-generated analysis (validated) |
| modelMetadata | Object | Model ID, prompt version |
| sourceReferences | [Object] | Links to source rows |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |

### Recommendation
| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Primary key |
| analysisId | ObjectId | Parent analysis |
| title | String | Action title |
| description | String | Detailed description |
| priority | Enum | low, medium, high |
| rationale | String | Why this is recommended |
| intendedRole | Enum | Target user role |
| location | String? | Where to act |
| evidenceRefs | [Object] | Links to data evidence |
| suggestedDueDate | Date? | When to complete |
| status | Enum | pending, in_progress, completed, dismissed |
| statusHistory | [Object] | Status change log |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |

### GeneratedBrief
| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Primary key |
| analysisId | ObjectId | Source analysis |
| reportType | Enum | internal, citizen |
| language | Enum | en, hi, mr, gu |
| readingLevel | Enum | technical, standard, simple |
| audience | String | Target audience description |
| content | Object | Structured report content |
| generationMetadata | Object | Model, prompt version, timestamp |
| createdBy | ObjectId | User who triggered generation |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |

## Validation Flags

| Flag | Meaning |
|------|---------|
| MISSING_VALUE | Required field is null or empty |
| INVALID_NUMBER | Value cannot be parsed as a number |
| UNKNOWN_UNIT | Unit not recognized |
| AMBIGUOUS_COLUMN | Column name could map to multiple fields |
| DUPLICATE_ROW | Identical to another row |
| SUSPICIOUS_VALUE | Value outside expected range |
| INVALID_TIMESTAMP | Timestamp cannot be parsed |
| NORMALIZED_UNIT | Unit was converted (original preserved) |
