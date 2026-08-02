import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Dumbbell, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Flame, 
  CheckCircle2, 
  Award, 
  BarChart3, 
  ChevronRight,
  Sparkles,
  Info,
  Check,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface SetEntry {
  id: string;
  weightKg: number;
  reps: number;
  rpe: number;
  completed: boolean;
}

export interface ExerciseEntry {
  id: string;
  name: string;
  category: string;
  sets: SetEntry[];
}

export interface HistoricalDataPoint {
  date: string;
  maxWeightKg: number;
  estimated1RM: number;
  totalVolumeKg: number;
}

export interface WorkoutHistoryItem {
  id: string;
  date: string;
  title: string;
  durationMinutes: number;
  totalVolumeKg: number;
  exercises: ExerciseEntry[];
  prCount: number;
}

const PRESET_EXERCISES = [
  { name: 'Barbell Back Squat', category: 'Legs' },
  { name: 'Barbell Bench Press', category: 'Chest' },
  { name: 'Conventional Deadlift', category: 'Back' },
  { name: 'Overhead Shoulder Press', category: 'Shoulders' },
  { name: 'Weighted Pull-Up', category: 'Back' },
  { name: 'Dumbbell Incline Bench Press', category: 'Chest' },
  { name: 'Barbell Romanian Deadlift', category: 'Hamstrings' },
  { name: 'Dumbbell Bulgarian Split Squat', category: 'Legs' },
  { name: 'Barbell Hip Thrust', category: 'Glutes' },
  { name: 'Barbell Pendlay Row', category: 'Back' }
];

// Mock Initial History for Gains Chart
const INITIAL_HISTORICAL_GAINS: Record<string, HistoricalDataPoint[]> = {
  'Barbell Back Squat': [
    { date: 'Jun 10', maxWeightKg: 120, estimated1RM: 135, totalVolumeKg: 3600 },
    { date: 'Jun 17', maxWeightKg: 125, estimated1RM: 140, totalVolumeKg: 3750 },
    { date: 'Jun 24', maxWeightKg: 130, estimated1RM: 146, totalVolumeKg: 3900 },
    { date: 'Jul 02', maxWeightKg: 132.5, estimated1RM: 149, totalVolumeKg: 3975 },
    { date: 'Jul 10', maxWeightKg: 137.5, estimated1RM: 154, totalVolumeKg: 4125 },
    { date: 'Jul 18', maxWeightKg: 140, estimated1RM: 157, totalVolumeKg: 4200 },
    { date: 'Jul 26', maxWeightKg: 145, estimated1RM: 163, totalVolumeKg: 4350 },
  ],
  'Barbell Bench Press': [
    { date: 'Jun 10', maxWeightKg: 95, estimated1RM: 107, totalVolumeKg: 2850 },
    { date: 'Jun 17', maxWeightKg: 97.5, estimated1RM: 110, totalVolumeKg: 2925 },
    { date: 'Jun 24', maxWeightKg: 100, estimated1RM: 112, totalVolumeKg: 3000 },
    { date: 'Jul 02', maxWeightKg: 102.5, estimated1RM: 115, totalVolumeKg: 3075 },
    { date: 'Jul 10', maxWeightKg: 105, estimated1RM: 118, totalVolumeKg: 3150 },
    { date: 'Jul 18', maxWeightKg: 107.5, estimated1RM: 121, totalVolumeKg: 3225 },
    { date: 'Jul 26', maxWeightKg: 110, estimated1RM: 124, totalVolumeKg: 3300 },
  ],
  'Conventional Deadlift': [
    { date: 'Jun 10', maxWeightKg: 150, estimated1RM: 168, totalVolumeKg: 4500 },
    { date: 'Jun 17', maxWeightKg: 155, estimated1RM: 174, totalVolumeKg: 4650 },
    { date: 'Jun 24', maxWeightKg: 160, estimated1RM: 180, totalVolumeKg: 4800 },
    { date: 'Jul 02', maxWeightKg: 165, estimated1RM: 185, totalVolumeKg: 4950 },
    { date: 'Jul 10', maxWeightKg: 170, estimated1RM: 191, totalVolumeKg: 5100 },
    { date: 'Jul 18', maxWeightKg: 175, estimated1RM: 196, totalVolumeKg: 5250 },
    { date: 'Jul 26', maxWeightKg: 180, estimated1RM: 202, totalVolumeKg: 5400 },
  ],
  'Overhead Shoulder Press': [
    { date: 'Jun 10', maxWeightKg: 60, estimated1RM: 67, totalVolumeKg: 1800 },
    { date: 'Jun 17', maxWeightKg: 62.5, estimated1RM: 70, totalVolumeKg: 1875 },
    { date: 'Jun 24', maxWeightKg: 65, estimated1RM: 73, totalVolumeKg: 1950 },
    { date: 'Jul 02', maxWeightKg: 67.5, estimated1RM: 76, totalVolumeKg: 2025 },
    { date: 'Jul 10', maxWeightKg: 70, estimated1RM: 79, totalVolumeKg: 2100 },
    { date: 'Jul 18', maxWeightKg: 72.5, estimated1RM: 81, totalVolumeKg: 2175 },
    { date: 'Jul 26', maxWeightKg: 75, estimated1RM: 84, totalVolumeKg: 2250 },
  ]
};

const INITIAL_WORKOUT_LOGS: WorkoutHistoryItem[] = [
  {
    id: 'log-101',
    date: 'Jul 26, 2026',
    title: 'HEAVY LOWER BODY HYPERTROPHY',
    durationMinutes: 62,
    totalVolumeKg: 8550,
    prCount: 2,
    exercises: [
      {
        id: 'ex-1',
        name: 'Barbell Back Squat',
        category: 'Legs',
        sets: [
          { id: 's1', weightKg: 140, reps: 5, rpe: 8, completed: true },
          { id: 's2', weightKg: 145, reps: 5, rpe: 9, completed: true },
          { id: 's3', weightKg: 145, reps: 4, rpe: 9.5, completed: true }
        ]
      },
      {
        id: 'ex-2',
        name: 'Dumbbell Bulgarian Split Squat',
        category: 'Legs',
        sets: [
          { id: 's4', weightKg: 32, reps: 10, rpe: 8, completed: true },
          { id: 's5', weightKg: 32, reps: 10, rpe: 8.5, completed: true }
        ]
      }
    ]
  },
  {
    id: 'log-100',
    date: 'Jul 24, 2026',
    title: 'CHEST & SHOULDER OVERLOAD',
    durationMinutes: 55,
    totalVolumeKg: 6450,
    prCount: 1,
    exercises: [
      {
        id: 'ex-3',
        name: 'Barbell Bench Press',
        category: 'Chest',
        sets: [
          { id: 's6', weightKg: 105, reps: 5, rpe: 8, completed: true },
          { id: 's7', weightKg: 110, reps: 4, rpe: 9, completed: true }
        ]
      },
      {
        id: 'ex-4',
        name: 'Overhead Shoulder Press',
        category: 'Shoulders',
        sets: [
          { id: 's8', weightKg: 72.5, reps: 6, rpe: 8.5, completed: true },
          { id: 's9', weightKg: 75, reps: 5, rpe: 9.5, completed: true }
        ]
      }
    ]
  }
];

interface WorkoutLoggerProps {
  onUpdateStats?: (addedWorkouts: number, addedVolume: number) => void;
}

export const WorkoutLogger: React.FC<WorkoutLoggerProps> = ({ onUpdateStats }) => {
  const [isLoggingModalOpen, setIsLoggingModalOpen] = useState(false);
  const [selectedChartExercise, setSelectedChartExercise] = useState<string>('Barbell Back Squat');
  const [chartMetric, setChartMetric] = useState<'maxWeightKg' | 'estimated1RM' | 'totalVolumeKg'>('maxWeightKg');
  
  // Historical database of gains
  const [gainsData, setGainsData] = useState(INITIAL_HISTORICAL_GAINS);
  const [historyLogs, setHistoryLogs] = useState<WorkoutHistoryItem[]>(INITIAL_WORKOUT_LOGS);

  // Active Logging Form State
  const [workoutTitle, setWorkoutTitle] = useState('HEAVY STRENGTH BLOCK');
  const [workoutDuration, setWorkoutDuration] = useState(60);
  const [activeExercises, setActiveExercises] = useState<ExerciseEntry[]>([
    {
      id: 'ex-init-1',
      name: 'Barbell Back Squat',
      category: 'Legs',
      sets: [
        { id: 's-1', weightKg: 140, reps: 5, rpe: 8, completed: true },
        { id: 's-2', weightKg: 145, reps: 5, rpe: 9, completed: true },
        { id: 's-3', weightKg: 150, reps: 3, rpe: 9.5, completed: true }
      ]
    }
  ]);
  const [selectedPresetToAdd, setSelectedPresetToAdd] = useState(PRESET_EXERCISES[1].name);

  // Helper to add a set to exercise
  const handleAddSet = (exerciseId: string) => {
    setActiveExercises(prev => prev.map(ex => {
      if (ex.id === exerciseId) {
        const lastSet = ex.sets[ex.sets.length - 1];
        const newSet: SetEntry = {
          id: `set-${Date.now()}-${Math.random()}`,
          weightKg: lastSet ? lastSet.weightKg : 100,
          reps: lastSet ? lastSet.reps : 5,
          rpe: 8,
          completed: true
        };
        return { ...ex, sets: [...ex.sets, newSet] };
      }
      return ex;
    }));
  };

  // Remove Set
  const handleRemoveSet = (exerciseId: string, setId: string) => {
    setActiveExercises(prev => prev.map(ex => {
      if (ex.id === exerciseId) {
        return { ...ex, sets: ex.sets.filter(s => s.id !== setId) };
      }
      return ex;
    }));
  };

  // Update Set Value
  const handleUpdateSet = (exerciseId: string, setId: string, field: keyof SetEntry, val: any) => {
    setActiveExercises(prev => prev.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          sets: ex.sets.map(s => {
            if (s.id === setId) {
              return { ...s, [field]: val };
            }
            return s;
          })
        };
      }
      return ex;
    }));
  };

  // Add New Exercise Block
  const handleAddExercise = () => {
    const preset = PRESET_EXERCISES.find(p => p.name === selectedPresetToAdd) || PRESET_EXERCISES[0];
    const newEx: ExerciseEntry = {
      id: `ex-${Date.now()}`,
      name: preset.name,
      category: preset.category,
      sets: [
        { id: `s-${Date.now()}-1`, weightKg: 80, reps: 8, rpe: 8, completed: true },
        { id: `s-${Date.now()}-2`, weightKg: 85, reps: 8, rpe: 8.5, completed: true }
      ]
    };
    setActiveExercises(prev => [...prev, newEx]);
  };

  // Remove Entire Exercise Block
  const handleRemoveExercise = (exerciseId: string) => {
    setActiveExercises(prev => prev.filter(ex => ex.id !== exerciseId));
  };

  // Calculate live workout total volume
  const calculateTotalVolume = (exercises: ExerciseEntry[]) => {
    let total = 0;
    exercises.forEach(ex => {
      ex.sets.forEach(s => {
        if (s.completed) {
          total += s.weightKg * s.reps;
        }
      });
    });
    return total;
  };

  const totalWorkoutVolume = calculateTotalVolume(activeExercises);

  // Submit Workout Log
  const handleSaveWorkout = () => {
    if (activeExercises.length === 0) {
      alert('Please add at least one exercise to log.');
      return;
    }

    const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    const todayFull = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    let prCount = 0;
    const newGains = { ...gainsData };

    // Process each exercise to update history chart data
    activeExercises.forEach(ex => {
      const completedSets = ex.sets.filter(s => s.completed);
      if (completedSets.length === 0) return;

      const maxWeight = Math.max(...completedSets.map(s => s.weightKg));
      const bestSetFor1RM = completedSets.reduce((prev, curr) => {
        const est1 = curr.weightKg * (1 + curr.reps / 30);
        const estPrev = prev.weightKg * (1 + prev.reps / 30);
        return est1 > estPrev ? curr : prev;
      }, completedSets[0]);

      const est1RM = Math.round(bestSetFor1RM.weightKg * (1 + bestSetFor1RM.reps / 30));
      const exVolume = completedSets.reduce((acc, s) => acc + s.weightKg * s.reps, 0);

      const existingChartPoints = newGains[ex.name] || [];
      const currentHighest1RM = existingChartPoints.length > 0 
        ? Math.max(...existingChartPoints.map(p => p.estimated1RM))
        : 0;

      if (est1RM > currentHighest1RM) {
        prCount++;
      }

      const newPoint: HistoricalDataPoint = {
        date: todayStr,
        maxWeightKg: maxWeight,
        estimated1RM: est1RM,
        totalVolumeKg: exVolume
      };

      newGains[ex.name] = [...existingChartPoints, newPoint];
    });

    setGainsData(newGains);

    // Create New Log Entry
    const newLogItem: WorkoutHistoryItem = {
      id: `log-${Date.now()}`,
      date: todayFull,
      title: workoutTitle.toUpperCase(),
      durationMinutes: workoutDuration,
      totalVolumeKg: totalWorkoutVolume,
      prCount: prCount > 0 ? prCount : 1,
      exercises: activeExercises
    };

    setHistoryLogs(prev => [newLogItem, ...prev]);

    // Fire Confetti
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#C7FF00', '#FFFFFF', '#38ef7d']
    });

    if (onUpdateStats) {
      onUpdateStats(1, totalWorkoutVolume);
    }

    setIsLoggingModalOpen(false);
  };

  // Get active chart data for selected exercise
  const currentChartPoints = gainsData[selectedChartExercise] || gainsData['Barbell Back Squat'] || [];

  // Calculate min/max for chart SVG rendering
  const metricValues = currentChartPoints.map(p => p[chartMetric]);
  const minVal = Math.max(0, Math.min(...metricValues) * 0.9);
  const maxVal = Math.max(...metricValues) * 1.1 || 100;

  // Generate SVG path for line chart
  const svgWidth = 500;
  const svgHeight = 180;
  const padding = 25;

  const pointsFormatted = currentChartPoints.map((pt, idx) => {
    const x = padding + (idx / Math.max(1, currentChartPoints.length - 1)) * (svgWidth - padding * 2);
    const val = pt[chartMetric];
    const y = svgHeight - padding - ((val - minVal) / Math.max(1, maxVal - minVal)) * (svgHeight - padding * 2);
    return { x, y, val, date: pt.date, point: pt };
  });

  const pathD = pointsFormatted.length > 0
    ? pointsFormatted.reduce((acc, pt, idx) => `${acc} ${idx === 0 ? 'M' : 'L'} ${pt.x},${pt.y}`, '')
    : '';

  const areaD = pointsFormatted.length > 0
    ? `${pathD} L ${pointsFormatted[pointsFormatted.length - 1].x},${svgHeight - padding} L ${pointsFormatted[0].x},${svgHeight - padding} Z`
    : '';

  const latestVal = currentChartPoints.length > 0 ? currentChartPoints[currentChartPoints.length - 1][chartMetric] : 0;
  const firstVal = currentChartPoints.length > 0 ? currentChartPoints[0][chartMetric] : 0;
  const percentGain = firstVal > 0 ? (((latestVal - firstVal) / firstVal) * 100).toFixed(1) : '0.0';

  return (
    <div className="space-y-8 mt-8">
      
      {/* HEADER WITH LOG WORKOUT MAIN BUTTON */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#C7FF00]/15 border border-[#C7FF00]/40 flex items-center justify-center text-[#C7FF00]">
            <Dumbbell className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono-custom font-extrabold text-[#C7FF00] uppercase tracking-wider bg-[#C7FF00]/10 px-2 py-0.5 rounded border border-[#C7FF00]/30">
                STRENGTH & HYPERTROPHY TRACKER
              </span>
            </div>
            <h2 className="text-2xl font-black text-white uppercase font-display mt-1">LOG WORKOUT & PROGRESS</h2>
            <p className="text-xs text-zinc-400 font-mono-custom mt-0.5">Track your sets, reps, load volume, and visualize your progressive overload over time.</p>
          </div>
        </div>

        <button
          onClick={() => setIsLoggingModalOpen(true)}
          className="w-full md:w-auto px-8 py-4 rounded-xl bg-[#C7FF00] hover:bg-[#b0e600] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-[0_0_25px_rgba(199,255,0,0.35)] shrink-0"
        >
          <Plus className="w-5 h-5 stroke-[3]" />
          <span>LOG NEW WORKOUT SESSION</span>
        </button>
      </div>

      {/* STRENGTH GAINS PROGRESS CHART SECTION */}
      <div className="bg-zinc-900/90 border border-white/10 rounded-2xl p-6 space-y-6 relative overflow-hidden">
        
        {/* CHART CONTROLS */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-[#C7FF00] font-mono-custom text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>STRENGTH GAINS ANALYTICS</span>
            </div>
            <h3 className="text-xl font-black text-white uppercase font-display mt-0.5">PROGRESSIVE OVERLOAD CHART</h3>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* EXERCISE SELECTOR DROPDOWN */}
            <div className="flex items-center gap-2 bg-zinc-950 border border-white/15 px-3 py-1.5 rounded-xl">
              <span className="text-[10px] font-mono-custom text-zinc-400 uppercase">EXERCISE:</span>
              <select
                value={selectedChartExercise}
                onChange={(e) => setSelectedChartExercise(e.target.value)}
                className="bg-transparent text-xs font-bold text-[#C7FF00] focus:outline-none cursor-pointer uppercase font-mono-custom"
              >
                {Object.keys(gainsData).map(exName => (
                  <option key={exName} value={exName} className="bg-zinc-900 text-white">
                    {exName}
                  </option>
                ))}
              </select>
            </div>

            {/* METRIC TOGGLE BUTTONS */}
            <div className="flex bg-zinc-950 p-1 rounded-xl border border-white/10 text-xs font-mono-custom font-bold">
              <button
                onClick={() => setChartMetric('maxWeightKg')}
                className={`px-3 py-1 rounded-lg uppercase transition-all ${
                  chartMetric === 'maxWeightKg' ? 'bg-[#C7FF00] text-black font-extrabold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                MAX WEIGHT
              </button>
              <button
                onClick={() => setChartMetric('estimated1RM')}
                className={`px-3 py-1 rounded-lg uppercase transition-all ${
                  chartMetric === 'estimated1RM' ? 'bg-[#C7FF00] text-black font-extrabold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                EST. 1RM
              </button>
              <button
                onClick={() => setChartMetric('totalVolumeKg')}
                className={`px-3 py-1 rounded-lg uppercase transition-all ${
                  chartMetric === 'totalVolumeKg' ? 'bg-[#C7FF00] text-black font-extrabold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                VOLUME
              </button>
            </div>
          </div>
        </div>

        {/* METRICS SUMMARY HIGHLIGHT BOXES */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-zinc-950/80 border border-white/10 p-3.5 rounded-xl">
            <span className="text-[10px] font-mono-custom text-zinc-400 uppercase block">Selected Exercise</span>
            <span className="text-sm font-black text-white uppercase truncate block mt-0.5">{selectedChartExercise}</span>
          </div>

          <div className="bg-zinc-950/80 border border-white/10 p-3.5 rounded-xl">
            <span className="text-[10px] font-mono-custom text-zinc-400 uppercase block">Current {chartMetric === 'maxWeightKg' ? 'Max Weight' : chartMetric === 'estimated1RM' ? 'Estimated 1RM' : 'Volume'}</span>
            <span className="text-xl font-black text-[#C7FF00] font-mono-custom block mt-0.5">
              {latestVal} {chartMetric === 'totalVolumeKg' ? 'KG VOL' : 'KG'}
            </span>
          </div>

          <div className="bg-zinc-950/80 border border-white/10 p-3.5 rounded-xl">
            <span className="text-[10px] font-mono-custom text-zinc-400 uppercase block">Gain Since Start</span>
            <span className="text-xl font-black text-emerald-400 font-mono-custom flex items-center gap-1 mt-0.5">
              +{percentGain}% <Award className="w-4 h-4" />
            </span>
          </div>

          <div className="bg-zinc-950/80 border border-white/10 p-3.5 rounded-xl">
            <span className="text-[10px] font-mono-custom text-zinc-400 uppercase block">All-Time PR</span>
            <span className="text-xl font-black text-amber-400 font-mono-custom block mt-0.5">
              {Math.max(...currentChartPoints.map(p => p[chartMetric]))} KG
            </span>
          </div>
        </div>

        {/* SVG GRAPH CANVAS */}
        <div className="bg-zinc-950/90 border border-white/10 p-4 rounded-xl relative">
          <div className="w-full overflow-x-auto">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-48 overflow-visible">
              <defs>
                <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C7FF00" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#C7FF00" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Horizontal Lines */}
              {[0.25, 0.5, 0.75].map((ratio, i) => (
                <line
                  key={i}
                  x1={padding}
                  y1={padding + ratio * (svgHeight - padding * 2)}
                  x2={svgWidth - padding}
                  y2={padding + ratio * (svgHeight - padding * 2)}
                  stroke="#333333"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Gradient Fill under Curve */}
              {areaD && <path d={areaD} fill="url(#chartGlow)" />}

              {/* Line Path */}
              {pathD && (
                <path
                  d={pathD}
                  fill="none"
                  stroke="#C7FF00"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Data Points */}
              {pointsFormatted.map((pt, i) => (
                <g key={i} className="group cursor-pointer">
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="5"
                    fill="#C7FF00"
                    stroke="#000000"
                    strokeWidth="2"
                    className="transition-all duration-200 group-hover:r-7 group-hover:fill-white"
                  />
                  
                  {/* Tooltip on Hover */}
                  <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <rect
                      x={Math.max(10, pt.x - 35)}
                      y={pt.y - 32}
                      width="70"
                      height="24"
                      rx="6"
                      fill="#000000"
                      stroke="#C7FF00"
                      strokeWidth="1"
                    />
                    <text
                      x={pt.x}
                      y={pt.y - 16}
                      textAnchor="middle"
                      fill="#C7FF00"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {pt.val} KG
                    </text>
                  </g>

                  {/* X Axis Label */}
                  <text
                    x={pt.x}
                    y={svgHeight - 5}
                    textAnchor="middle"
                    fill="#71717a"
                    fontSize="9"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {pt.date}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

      </div>

      {/* WORKOUT HISTORY LIST */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#C7FF00]" />
            <h3 className="text-lg font-black text-white uppercase font-display">RECENT LOGGED WORKOUT SESSIONS</h3>
          </div>
          <span className="text-xs font-mono-custom text-zinc-400 font-bold">TOTAL LOGS: {historyLogs.length}</span>
        </div>

        <div className="space-y-3">
          {historyLogs.map((log) => (
            <div key={log.id} className="bg-zinc-950 border border-white/10 rounded-2xl p-4 hover:border-[#C7FF00]/40 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-black text-white uppercase font-display">{log.title}</h4>
                    {log.prCount > 0 && (
                      <span className="text-[9px] bg-[#C7FF00] text-black font-black px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                        <Flame className="w-3 h-3 fill-black" />
                        {log.prCount} PR LOGGED
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] font-mono-custom text-zinc-400 mt-1 flex items-center gap-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {log.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {log.durationMinutes} mins</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono-custom text-zinc-500 uppercase block">Total Volume</span>
                  <span className="text-lg font-black text-[#C7FF00] font-mono-custom">{(log.totalVolumeKg).toLocaleString()} KG</span>
                </div>
              </div>

              {/* EXERCISES SUMMARY IN THIS LOG */}
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {log.exercises.map((ex, i) => (
                  <div key={i} className="bg-zinc-900/60 p-2.5 rounded-xl border border-white/5 text-xs">
                    <div className="font-bold text-white uppercase font-mono-custom text-[11px] truncate">{ex.name}</div>
                    <div className="text-[10px] text-zinc-400 font-mono-custom mt-0.5">
                      {ex.sets.length} SETS • Top Set: <span className="text-[#C7FF00] font-bold">{Math.max(...ex.sets.map(s => s.weightKg))} KG</span> x {ex.sets[0]?.reps || 0} reps
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LOG WORKOUT MODAL */}
      {isLoggingModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-[#C7FF00]/50 w-full max-w-3xl rounded-3xl p-6 shadow-[0_0_50px_rgba(199,255,0,0.25)] relative max-h-[90vh] flex flex-col justify-between animate-fade-in">
            
            {/* MODAL HEADER */}
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-6 h-6 text-[#C7FF00]" />
                  <h3 className="text-xl font-black text-white uppercase font-display">ATHLETE WORKOUT LOG BOOK</h3>
                </div>

                <button
                  onClick={() => setIsLoggingModalOpen(false)}
                  className="text-zinc-400 hover:text-white p-1 rounded-xl bg-zinc-900 border border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* WORKOUT METADATA INPUTS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                <div>
                  <label className="text-[10px] font-mono-custom text-zinc-400 uppercase block mb-1">SESSION TITLE</label>
                  <input
                    type="text"
                    value={workoutTitle}
                    onChange={(e) => setWorkoutTitle(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/15 rounded-xl px-3 py-2 text-xs font-bold text-white uppercase focus:outline-none focus:border-[#C7FF00]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono-custom text-zinc-400 uppercase block mb-1">DURATION (MINUTES)</label>
                  <input
                    type="number"
                    value={workoutDuration}
                    onChange={(e) => setWorkoutDuration(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-white/15 rounded-xl px-3 py-2 text-xs font-bold text-white font-mono-custom focus:outline-none focus:border-[#C7FF00]"
                  />
                </div>
              </div>
            </div>

            {/* EXERCISES & SETS LOGGER BODY */}
            <div className="flex-1 overflow-y-auto pr-1 my-2 space-y-6 max-h-[50vh]">
              {activeExercises.map((ex, exIdx) => (
                <div key={ex.id} className="bg-zinc-900 border border-white/10 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#C7FF00] text-black font-black text-xs flex items-center justify-center font-mono-custom">
                        {exIdx + 1}
                      </span>
                      <h4 className="text-sm font-black text-white uppercase font-display">{ex.name}</h4>
                      <span className="text-[9px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded font-mono-custom uppercase">{ex.category}</span>
                    </div>

                    <button
                      onClick={() => handleRemoveExercise(ex.id)}
                      className="text-zinc-500 hover:text-red-400 p-1"
                      title="Remove Exercise"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* SETS TABLE HEADER */}
                  <div className="grid grid-cols-12 gap-2 text-[10px] font-mono-custom font-bold text-zinc-400 uppercase px-2">
                    <div className="col-span-2">SET</div>
                    <div className="col-span-3">KG WEIGHT</div>
                    <div className="col-span-3">REPS</div>
                    <div className="col-span-2">RPE</div>
                    <div className="col-span-2 text-right">DONE</div>
                  </div>

                  {/* SET ROWS */}
                  <div className="space-y-2">
                    {ex.sets.map((set, setIdx) => (
                      <div key={set.id} className="grid grid-cols-12 gap-2 items-center bg-zinc-950 p-2 rounded-xl border border-white/5">
                        <div className="col-span-2 text-xs font-bold font-mono-custom text-zinc-400">
                          #{setIdx + 1}
                        </div>

                        <div className="col-span-3">
                          <input
                            type="number"
                            value={set.weightKg}
                            onChange={(e) => handleUpdateSet(ex.id, set.id, 'weightKg', Number(e.target.value))}
                            className="w-full bg-zinc-900 border border-white/10 rounded-lg px-2 py-1 text-xs font-bold text-[#C7FF00] font-mono-custom focus:outline-none focus:border-[#C7FF00]"
                          />
                        </div>

                        <div className="col-span-3">
                          <input
                            type="number"
                            value={set.reps}
                            onChange={(e) => handleUpdateSet(ex.id, set.id, 'reps', Number(e.target.value))}
                            className="w-full bg-zinc-900 border border-white/10 rounded-lg px-2 py-1 text-xs font-bold text-white font-mono-custom focus:outline-none focus:border-[#C7FF00]"
                          />
                        </div>

                        <div className="col-span-2">
                          <input
                            type="number"
                            step="0.5"
                            value={set.rpe}
                            onChange={(e) => handleUpdateSet(ex.id, set.id, 'rpe', Number(e.target.value))}
                            className="w-full bg-zinc-900 border border-white/10 rounded-lg px-2 py-1 text-xs font-bold text-zinc-300 font-mono-custom focus:outline-none focus:border-[#C7FF00]"
                          />
                        </div>

                        <div className="col-span-2 flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleUpdateSet(ex.id, set.id, 'completed', !set.completed)}
                            className={`p-1.5 rounded-lg border transition-all ${
                              set.completed
                                ? 'bg-[#C7FF00] text-black border-[#C7FF00]'
                                : 'bg-zinc-900 text-zinc-600 border-white/10'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </button>

                          <button
                            onClick={() => handleRemoveSet(ex.id, set.id)}
                            className="text-zinc-600 hover:text-red-400 p-1"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleAddSet(ex.id)}
                    className="w-full py-2 bg-zinc-950 hover:bg-zinc-800 text-zinc-300 font-bold text-xs uppercase tracking-wider rounded-xl border border-white/10 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#C7FF00]" />
                    <span>ADD SET</span>
                  </button>
                </div>
              ))}

              {/* ADD ANOTHER EXERCISE CONTROL */}
              <div className="bg-zinc-900/50 border border-dashed border-white/20 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs font-bold text-white uppercase font-mono-custom">SELECT EXERCISE:</span>
                  <select
                    value={selectedPresetToAdd}
                    onChange={(e) => setSelectedPresetToAdd(e.target.value)}
                    className="bg-zinc-950 border border-white/15 text-xs text-[#C7FF00] font-bold p-2 rounded-xl focus:outline-none uppercase font-mono-custom flex-1"
                  >
                    {PRESET_EXERCISES.map(p => (
                      <option key={p.name} value={p.name} className="bg-zinc-900 text-white">
                        {p.name} ({p.category})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleAddExercise}
                  className="w-full sm:w-auto px-4 py-2.5 bg-zinc-800 hover:bg-[#C7FF00] text-white hover:text-black font-bold text-xs uppercase rounded-xl transition-all border border-white/10 flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD TO WORKOUT</span>
                </button>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono-custom text-zinc-400 block uppercase">CALCULATED TOTAL VOLUME</span>
                <span className="text-2xl font-black text-[#C7FF00] font-mono-custom">{totalWorkoutVolume.toLocaleString()} KG</span>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setIsLoggingModalOpen(false)}
                  className="flex-1 sm:flex-none px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold text-xs uppercase rounded-xl border border-white/10"
                >
                  CANCEL
                </button>

                <button
                  onClick={handleSaveWorkout}
                  className="flex-1 sm:flex-none px-6 py-3 bg-[#C7FF00] hover:bg-[#b0e600] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(199,255,0,0.3)] flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 fill-black" />
                  <span>SAVE & FINISH WORKOUT</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
