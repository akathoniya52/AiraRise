'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'ward_officer' | 'housing_admin' | 'school_admin' | 'field_team';
export type Language = 'en' | 'hi' | 'mr';

export interface TelemetryRow {
  rowId: string;
  timestamp: string;
  sensorId: string;
  location: string;
  pm25: number | null;
  pm10: number | null;
  no2: number | null;
  temp: number | null;
  validationFlag: 'Valid - High Spike' | 'Optimal Baseline' | 'Calibrated +1.2%' | 'Hospital Target Met' | 'Hotspot Anomaly Flagged' | 'Missing Value' | 'Invalid Number';
  notes?: string;
}

export interface Hotspot {
  rank: number;
  location: string;
  sensorId: string;
  severity: number; // 0 - 10
  primaryPollutant: string;
  concentration: string;
  rootCause: string;
  populationAtRisk: string;
  fieldSupervisor: string;
  triageCountdown: string;
  status: 'Critical' | 'Warning' | 'Moderate' | 'Safe Baseline';
}

export interface Intervention {
  id: string;
  title: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  deadline: string;
  geminiConfidence: number;
  description: string;
  targetLocation: string;
  responsibleGroup: string;
  evidenceCitation: string;
  status: 'Pending Dispatch' | 'In Progress' | 'Resolved' | 'Broadcasted';
  intendedRole: UserRole;
  actionType: 'dispatch' | 'advisory' | 'notice' | 'calibration';
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  activeRegion: string;
  setActiveRegion: (region: string) => void;
  telemetryData: TelemetryRow[];
  addTelemetryRows: (rows: TelemetryRow[]) => void;
  hotspots: Hotspot[];
  interventions: Intervention[];
  dispatchIntervention: (id: string) => void;
  createIntervention: (intervention: Omit<Intervention, 'id'>) => void;
  lastSyncTime: string;
  refreshFeeds: () => void;
  isAiAnalyzing: boolean;
  triggerAiAnalysis: () => Promise<void>;
  aiAnalysisOutput: any;
}

const defaultTelemetry: TelemetryRow[] = [
  {
    rowId: '#001',
    timestamp: '2025-05-14 08:30',
    sensorId: 'SN-FN-04',
    location: 'Sion Circle Flyover',
    pm25: 68.4,
    pm10: 142.1,
    no2: 42.0,
    temp: 31.4,
    validationFlag: 'Valid - High Spike',
    notes: 'Traffic surge along flyover approach'
  },
  {
    rowId: '#002',
    timestamp: '2025-05-14 08:30',
    sensorId: 'SN-FN-09',
    location: "King's Circle Park",
    pm25: 32.1,
    pm10: 64.5,
    no2: 18.2,
    temp: 30.8,
    validationFlag: 'Optimal Baseline',
    notes: 'Tree canopy absorption buffer active'
  },
  {
    rowId: '#003',
    timestamp: '2025-05-14 08:30',
    sensorId: 'SN-FN-12',
    location: 'Matunga Central',
    pm25: 54.0,
    pm10: 110.2,
    no2: 35.1,
    temp: 31.1,
    validationFlag: 'Calibrated +1.2%',
    notes: 'Zero point drift adjusted against reference'
  },
  {
    rowId: '#004',
    timestamp: '2025-05-14 08:30',
    sensorId: 'SN-FN-18',
    location: 'Sion Hospital Quiet Zone',
    pm25: 28.5,
    pm10: 52.0,
    no2: 14.0,
    temp: 29.9,
    validationFlag: 'Hospital Target Met',
    notes: 'Perimeter mist curtains operating'
  },
  {
    rowId: '#005',
    timestamp: '2025-05-14 08:15',
    sensorId: 'SN-FN-04',
    location: 'Sion Circle Flyover',
    pm25: 245.0,
    pm10: 380.0,
    no2: 88.4,
    temp: 31.6,
    validationFlag: 'Hotspot Anomaly Flagged',
    notes: 'Unpaved transit shoulder friction breakdown'
  }
];

const defaultHotspots: Hotspot[] = [
  {
    rank: 1,
    location: 'Sion Circle Overpass',
    sensorId: 'SN-FN-04 (Sector 2)',
    severity: 9.2,
    primaryPollutant: 'PM10: 245 µg/m³',
    concentration: '245 µg/m³',
    rootCause: 'Unpaved construction corridor dust + 18-wheel freight transit',
    populationAtRisk: '14,250 residents',
    fieldSupervisor: 'R. Kadam (BMC)',
    triageCountdown: '05m : 42s',
    status: 'Critical'
  },
  {
    rank: 2,
    location: 'Wadala Terminal Gate 3',
    sensorId: 'SN-FN-19 (Sector 5)',
    severity: 7.8,
    primaryPollutant: 'NO2: 98 ppb',
    concentration: '98 ppb',
    rootCause: 'Heavy diesel idling at logistics queue + container shunting',
    populationAtRisk: '6,800 workers',
    fieldSupervisor: 'S. More (RTO)',
    triageCountdown: '18m : 10s',
    status: 'Warning'
  },
  {
    rank: 3,
    location: "King's Circle Traffic Node",
    sensorId: 'SN-FN-11 (Sector 3)',
    severity: 5.4,
    primaryPollutant: 'PM2.5: 72 µg/m³',
    concentration: '72 µg/m³',
    rootCause: 'Traffic bottleneck during signal phase desynchronization',
    populationAtRisk: '9,400 commuters',
    fieldSupervisor: 'V. Patil (Traffic)',
    triageCountdown: 'Controlled',
    status: 'Moderate'
  },
  {
    rank: 4,
    location: 'Five Gardens Botanical Reserve',
    sensorId: 'SN-FN-29 (Sector 1)',
    severity: 1.2,
    primaryPollutant: 'AQI: 35 (Optimal)',
    concentration: '35 AQI',
    rootCause: 'Dense tree canopy filtration zone • Negative baseline reference',
    populationAtRisk: 'Optimal Sanctuary',
    fieldSupervisor: 'A. Sharma (BMC)',
    triageCountdown: 'Safe Baseline',
    status: 'Safe Baseline'
  }
];

const defaultInterventions: Intervention[] = [
  {
    id: 'int-1',
    title: 'Deploy High-Pressure Anti-Smog Gun to Sion Circle Flyover',
    priority: 'CRITICAL',
    deadline: '12:30 IST (18 mins remaining)',
    geminiConfidence: 98.4,
    description: 'Sustained PM10 concentration exceeding 240 µg/m³ due to dry haulage dust and transit friction under south ramp. Rapid ground misting required before mid-day traffic peak.',
    targetLocation: 'Sion Circle South Ramp (Node SN-FN-04)',
    responsibleGroup: 'Ward Field Team A (Lead: Deepak K.)',
    evidenceCitation: 'Telemetry row #1,420; verified 3.2x baseline spike; IMD wind stagnation window (0.4 m/s NW) locks particles in flyover underpass.',
    status: 'Pending Dispatch',
    intendedRole: 'ward_officer',
    actionType: 'dispatch'
  },
  {
    id: 'int-2',
    title: 'Issue Sensitive Group Indoor Advisory to Sion Municipal Schools',
    priority: 'HIGH',
    deadline: 'Today, 11:00 IST',
    geminiConfidence: 94.2,
    description: 'Protect 1,840 primary and secondary students by transitioning outdoor physical education to indoor study halls during the expected mid-morning inversion layer trapping ground particulates.',
    targetLocation: 'Sion Municipal Ward School Cluster (4 Campuses)',
    responsibleGroup: 'School Administrators & Ward Education Officer',
    evidenceCitation: 'Ref: BMC/EDU/AQI-2025/08. Sion Hospital sensor records continuous 42-min breach above 45 µg/m³ fine particulate threshold.',
    status: 'Pending Dispatch',
    intendedRole: 'school_admin',
    actionType: 'advisory'
  },
  {
    id: 'int-3',
    title: 'Issue Dust Mitigation Notice to Wadala Transit Hub Construction Site',
    priority: 'HIGH',
    deadline: 'Enforce by 14:00 IST',
    geminiConfidence: 91.5,
    description: 'Airborne PM2.5 readings within 200m perimeter violate BMC Clean Air Guideline 2024. Mandate 25-foot perimeter green netting and continuous wet suppression on haul routes.',
    targetLocation: 'Wadala Metro Depot Worksite (Plot 14-B)',
    responsibleGroup: 'Municipal Compliance & Enforcement Squad',
    evidenceCitation: 'Optical counter SN-FN-22 registered 4.8% variation with localized dust plume trajectory crossing eastern peripheral wall.',
    status: 'Pending Dispatch',
    intendedRole: 'housing_admin',
    actionType: 'notice'
  },
  {
    id: 'int-4',
    title: 'Recalibrate Optical Particle Counter SN-FN-11 (Matunga Station)',
    priority: 'MEDIUM',
    deadline: 'Scheduled: 15:30 IST',
    geminiConfidence: 96.0,
    description: 'Sensor drift detected: +4.8% variation against nearby reference CPCB station. Self-diagnostic flagged lens condensation and humidity skew on inlet chamber.',
    targetLocation: 'Matunga Central Railway East Gate',
    responsibleGroup: 'Technical Field Maint. (Rohit M.)',
    evidenceCitation: 'Zero point drift monitoring audit log timestamp 2025-05-14 08:00 IST.',
    status: 'Pending Dispatch',
    intendedRole: 'field_team',
    actionType: 'calibration'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>('ward_officer');
  const [language, setLanguage] = useState<Language>('en');
  const [activeRegion, setActiveRegion] = useState('Mumbai Central - Ward F-North');
  const [telemetryData, setTelemetryData] = useState<TelemetryRow[]>(defaultTelemetry);
  const [hotspots, setHotspots] = useState<Hotspot[]>(defaultHotspots);
  const [interventions, setInterventions] = useState<Intervention[]>(defaultInterventions);
  const [lastSyncTime, setLastSyncTime] = useState('Just now');
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiAnalysisOutput, setAiAnalysisOutput] = useState<any>(null);

  const addTelemetryRows = (rows: TelemetryRow[]) => {
    setTelemetryData(prev => [...rows, ...prev]);
  };

  const dispatchIntervention = (id: string) => {
    setInterventions(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: 'In Progress' } : item
      )
    );
  };

  const createIntervention = (item: Omit<Intervention, 'id'>) => {
    const newInt: Intervention = {
      ...item,
      id: `int-${Date.now()}`
    };
    setInterventions(prev => [newInt, ...prev]);
  };

  const refreshFeeds = () => {
    setLastSyncTime('Just now');
  };

  const triggerAiAnalysis = async () => {
    setIsAiAnalyzing(true);
    try {
      // Simulate real-time bounded synthesis
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAiAnalysisOutput({
        timestamp: new Date().toISOString(),
        summary: "Ward F-North is undergoing a bi-modal particulate surge driven by unpaved shoulder friction along Sion Circle Flyover combined with low-velocity marine boundary layer trapping between 08:00 and 10:30 IST.",
        certitude: "94.8% HIGH",
        culprit: "Resuspended Coarse Dust (PM10)",
        dispersion: "Stagnant (1.2 m/s)",
        recommendations: [
          "Deploy mobile anti-smog water cannon unit #4 immediately to Sion Circle underpass.",
          "Restrict outdoor sports activity across Sion Municipal schools cluster until 11:30 IST.",
          "Activate IMD wind-dispersal monitoring for 14:00 IST sea breeze onset."
        ]
      });
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        activeRegion,
        setActiveRegion,
        telemetryData,
        addTelemetryRows,
        hotspots,
        interventions,
        dispatchIntervention,
        createIntervention,
        lastSyncTime,
        refreshFeeds,
        isAiAnalyzing,
        triggerAiAnalysis,
        aiAnalysisOutput
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
