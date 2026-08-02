import React, { useEffect, useRef, useState } from 'react';
import { ViewMode } from '../types';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Flame, 
  Trophy, 
  ChevronDown,
  Play,
  X,
  CheckCircle2,
  Clock,
  Dumbbell,
  Target,
  Info,
  ChevronRight
} from 'lucide-react';

interface HeroSectionProps {
  setCurrentView: (view: ViewMode) => void;
  onOpenScanPass: () => void;
}

export interface WorkoutDetail {
  id: string;
  title: string;
  category: string;
  image: string;
  intensity: string;
  setsReps: string;
  tempo: string;
  rpe: string;
  caloriesBurned: string;
  targetMuscles: string[];
  equipment: string[];
  description: string;
  executionSteps: string[];
  trainerTip: string;
  recoveryTime: string;
}

const WORKOUT_DETAILS_DATA: WorkoutDetail[] = [
  {
    id: 'deadlift',
    title: 'HEAVY BARBELL DEADLIFT',
    category: 'STRENGTH & HYPERTROPHY',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1200',
    intensity: 'EXTREME',
    setsReps: '5 SETS x 3 REPS',
    tempo: '2-1-X-1',
    rpe: 'RPE 9.0',
    caloriesBurned: '420 kcal / session',
    targetMuscles: ['Gluteus Maximus', 'Hamstrings', 'Erector Spinae', 'Trapezius', 'Latissimus Dorsi'],
    equipment: ['Eleiko Competition Barbell', 'Calibrated 25kg Steel Plates', 'Chalk', 'Leather Belt'],
    description: 'The definitive test of raw total-body pull power. Engages maximum motor units to trigger systemic anabolic hormone response and spinal density.',
    executionSteps: [
      'Approach the bar with feet shoulder-width apart, shins 1 inch from the barbell.',
      'Grip the bar with double overhand or mixed grip, pull hips down and set your chest high.',
      'Take a deep diaphragmatic breath, brace your core 100%, and drive through your heels.',
      'Lock out hips and knees simultaneously while pulling shoulders back at the apex.'
    ],
    trainerTip: 'Keep bar path strictly vertical against your shins throughout the lift to eliminate torque on lumbar vertebrae.',
    recoveryTime: '48-72 Hours'
  },
  {
    id: 'dumbbell-press',
    title: 'DUMBBELL INCLINE OVERLOAD',
    category: 'UPPER BODY POWER',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=1200',
    intensity: 'HIGH',
    setsReps: '4 SETS x 8 REPS',
    tempo: '3-1-1-0',
    rpe: 'RPE 8.5',
    caloriesBurned: '350 kcal / session',
    targetMuscles: ['Clavicular Pectoralis Major', 'Anterior Deltoids', 'Triceps Brachii'],
    equipment: ['Heavy Dumbbell Rack (40-60kg)', 'Adjustable 30° Bench', 'Heavy Wrist Wraps'],
    description: 'Unilateral chest press protocol designed to fix muscle imbalances and build upper chest thickness.',
    executionSteps: [
      'Set bench to 30-degree incline to maximize upper chest fiber recruitment.',
      'Kick dumbbells up to shoulder level, retract scapula firmly against the pad.',
      'Press dumbbells upward on a slight inward arc without locking out elbows.',
      'Control the 3-second eccentric descent down until dumbbells align with mid-chest.'
    ],
    trainerTip: 'Maintain retraction and depression of the scapula to isolate the upper pec fibers and protect anterior shoulder capsules.',
    recoveryTime: '24-48 Hours'
  },
  {
    id: 'battle-ropes',
    title: 'METABOLIC BATTLE ROPERS',
    category: 'METABOLIC CONDITIONING',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=1200',
    intensity: 'ADVANCED',
    setsReps: '6 ROUNDS x 45 SEC',
    tempo: 'MAX VELOCITY',
    rpe: 'RPE 9.5',
    caloriesBurned: '510 kcal / session',
    targetMuscles: ['Full Body', 'Anterior Deltoids', 'Core Obliques', 'Forearms', 'Heart'],
    equipment: ['50ft Heavy Dacron Ropes (2-inch)', 'Anchor Mount', 'Indoor Sprint Turf'],
    description: 'Explosive cardiovascular finisher designed for rapid glycogen depletion, shoulder endurance, and core rigidity.',
    executionSteps: [
      'Assume an athletic quarter-squat stance with core locked and chest upright.',
      'Grip the rubber rope handles firmly with neutral thumb-up positioning.',
      'Initiate powerful alternating vertical waves using shoulder flexion and hip drive.',
      'Maintain unbroken 45-second high-velocity output with controlled nasal-oral breathing.'
    ],
    trainerTip: 'Drive movement from the core and hips, not just wrist flicks, to generate deep rhythmic waves down the full length of the rope.',
    recoveryTime: '24 Hours'
  },
  {
    id: 'barbell-squat',
    title: 'OLYMPIC SQUAT RACK PROTOCOL',
    category: 'LOWER BODY MASS',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200',
    intensity: 'EXTREME',
    setsReps: '5 SETS x 5 REPS',
    tempo: '3-1-X-1',
    rpe: 'RPE 9.0',
    caloriesBurned: '480 kcal / session',
    targetMuscles: ['Rectus Femoris', 'Vastus Lateralis', 'Gluteus Maximus', 'Adductor Magnus'],
    equipment: ['Heavy Power Rack', 'Safety Spotter Arms', 'Eleiko Knee Sleeves', 'Lifting Shoes'],
    description: 'The king of lower body development. Targets deep quad tear and glute power with full depth mobility.',
    executionSteps: [
      'Step under the barbell, resting it firmly across upper trapezius shelf.',
      'Unrack the bar with 2 step back setup, feet stance slightly wider than hip width.',
      'Inhale, brace abdominal wall, and break at hips and knees down to parallel.',
      'Drive out of the hole pressing feet into the floor with chest proud.'
    ],
    trainerTip: 'Drive knees outward in line with toes during ascent to maintain hip torque and prevent valgus knee collapse.',
    recoveryTime: '48-72 Hours'
  },
  {
    id: 'sled-push',
    title: 'EXPLOSIVE TURF SLED PUSH',
    category: 'ANAEROBIC CAPACITY',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=1200',
    intensity: 'HIGH',
    setsReps: '8 SPRINTS x 30 METERS',
    tempo: 'MAX SPRINT',
    rpe: 'RPE 9.0',
    caloriesBurned: '390 kcal / session',
    targetMuscles: ['Quadriceps', 'Calves', 'Gluteals', 'Core Stabilizers'],
    equipment: ['Rogue Steel Prowler Sled', '30-Meter Turf Track', 'Olympic Bumper Plates'],
    description: 'Zero eccentric stress conditioning that builds quad stamina, sprinting velocity, and mental fortitude.',
    executionSteps: [
      'Grip the vertical handles at a 45-degree forward lean angle.',
      'Drive your knees aggressively towards your chest in a sprinting stride.',
      'Maintain rigid spine alignment with constant foot pressure through the turf.',
      'Push at 100% maximal effort across the full 30-meter track length.'
    ],
    trainerTip: 'Drive through the ball of the foot and maintain a straight line from ankle to hip to maximize force transfer.',
    recoveryTime: '24 Hours'
  },
  {
    id: 'cable-pulldown',
    title: 'PRO CABLE LAT PULLDOWN',
    category: 'BACK ISOLATION & V-TAPER',
    image: 'https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?auto=format&fit=crop&q=80&w=1200',
    intensity: 'ADVANCED',
    setsReps: '4 SETS x 10 REPS',
    tempo: '2-1-2-1',
    rpe: 'RPE 8.0',
    caloriesBurned: '310 kcal / session',
    targetMuscles: ['Latissimus Dorsi', 'Rhomboids', 'Middle Trapezius', 'Biceps Brachii'],
    equipment: ['Pin-Selected Pulley Column', 'Mag Grip Wide Bar', 'Thigh Hold-Down Pad'],
    description: 'Key movement for building broad upper back width, thick lat sweep, and shoulder stability.',
    executionSteps: [
      'Adjust thigh pads tightly over thighs, reach up and grip wide bar attachment.',
      'Inhale and depress shoulder blades before initiating the pull with lats.',
      'Pull the bar down smoothly to upper chest level while arching upper back slightly.',
      'Pause for 1 second peak contraction, then control a 3-second extension.'
    ],
    trainerTip: 'Focus on pulling elbows straight down toward your hip pockets rather than pulling with your arms.',
    recoveryTime: '24-48 Hours'
  }
];

export const HeroSection: React.FC<HeroSectionProps> = ({ setCurrentView, onOpenScanPass }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutDetail | null>(null);

  // Interactive Particle Net Canvas Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create particles
    const particleCount = Math.min(Math.floor(width / 20), 60);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle net
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(199, 255, 0, ${p.alpha})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(199, 255, 0, ${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Mouse reaction glow
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 160) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(199, 255, 0, ${0.25 * (1 - mdist / 160)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1c3800] via-[#0e1f02] to-[#060a03]">
      
      {/* BACKGROUND CANVAS */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none opacity-60"
      />

      {/* AMBIENT LIGHT GREEN GLOW ORBS */}
      <div className="absolute top-[-50px] left-[10%] w-[500px] h-[500px] bg-[#C7FF00]/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute top-[30%] right-[-50px] w-[600px] h-[600px] bg-[#80FF00]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[30%] w-[500px] h-[500px] bg-[#C7FF00]/15 rounded-full blur-[130px] pointer-events-none" />

      {/* GIANT FAINT WATERMARK TEXT */}
      <div className="absolute right-[-5%] top-[10%] -rotate-90 pointer-events-none z-0 hidden xl:block">
        <span className="text-[180px] font-black text-[#C7FF00]/[0.04] uppercase leading-none tracking-tighter">
          KINETIC
        </span>
      </div>

      {/* HERO MAIN CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 flex-1 flex flex-col justify-center">
        
        {/* TOP BADGE */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#C7FF00]/50 rounded-full bg-[#C7FF00]/20 backdrop-blur-md mb-4 self-start shadow-[0_0_20px_rgba(199,255,0,0.2)]">
          <span className="w-2 h-2 bg-[#C7FF00] rounded-full animate-ping" />
          <span className="text-[#C7FF00] text-xs uppercase tracking-widest font-black flex items-center gap-2 font-mono-custom">
            KINETIC HIGH-PERFORMANCE ATHLETIC CLUB
          </span>
        </div>

        {/* HEADLINE & HERO GRID WITH MEN WORKOUT IMAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          
          {/* LEFT COLUMN - MEDIUM SIZED FONT HEADLINE & COPY */}
          <div className="lg:col-span-7">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-display leading-[1.05]">
              PUSH YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C7FF00] via-lime-300 to-emerald-200">
                LIMITS & PERFORMANCE
              </span>
            </h1>
            
            <p className="mt-4 text-sm sm:text-base text-zinc-200 font-medium max-w-xl leading-relaxed">
              Join the elite strength community. Our high-performance gym is engineered for athletes who refuse to settle. Heavy iron, Olympic rigs, and bio-tech recovery.
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <button
                onClick={() => setCurrentView('schedule')}
                className="group px-6 py-3 bg-[#C7FF00] hover:bg-[#b0e600] text-black text-xs font-black uppercase tracking-wider rounded-full shadow-[0_0_25px_rgba(199,255,0,0.4)] hover:scale-105 transition-all flex items-center gap-2"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>START TRAINING NOW</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setCurrentView('trainers')}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-wider border border-[#C7FF00]/30 transition-all backdrop-blur-md"
              >
                MEET COACHES
              </button>

              <button
                onClick={onOpenScanPass}
                className="px-5 py-3 rounded-full bg-black/80 text-zinc-300 hover:text-[#C7FF00] font-bold text-xs uppercase tracking-wider border border-[#C7FF00]/40 transition-all flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#C7FF00]" />
                <span>KEY PASS</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN - UNIQUE MEN WORKOUT IMAGE SHOWCASE */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#C7FF00] shadow-[0_0_40px_rgba(199,255,0,0.3)] group">
              <img 
                src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=1000" 
                alt="Men Strength Training Athlete" 
                className="w-full h-[360px] sm:h-[420px] object-cover object-center group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-black/30" />

              {/* OVERLAY BADGE */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-[#C7FF00]/60 px-3.5 py-1.5 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C7FF00] animate-ping" />
                <span className="text-[11px] font-mono-custom font-black text-[#C7FF00] uppercase tracking-wider">
                  LIVE WORKOUT METRICS
                </span>
              </div>

              {/* OVERLAY STATS CARD */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/85 backdrop-blur-xl border border-[#C7FF00]/30 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono-custom font-bold text-zinc-400 uppercase">ATHLETE LOAD</div>
                  <div className="text-xl font-black text-white font-display">245 KG BARBELL DEADLIFT</div>
                  <div className="text-[10px] text-[#C7FF00] font-mono-custom font-bold mt-0.5">Optimum Muscle Tension Achieved</div>
                </div>
                <div className="bg-[#C7FF00] text-black font-black text-xs px-3 py-2 rounded-xl text-center font-mono-custom shadow-[0_0_15px_rgba(199,255,0,0.4)]">
                  98%<br /><span className="text-[8px] font-bold">EFFICIENCY</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* STATS BENTO GRID WITH LIGHT GREEN ACCENTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          <div className="bg-black/50 backdrop-blur-md border border-[#C7FF00]/30 p-5 rounded-2xl group hover:border-[#C7FF00] transition-all">
            <div className="text-3xl font-black mb-1 text-white font-display">5,000+</div>
            <div className="text-[10px] uppercase tracking-widest text-[#C7FF00] font-bold mb-2 font-mono-custom">ACTIVE MEMBERS</div>
            <div className="h-[1px] w-full bg-[#C7FF00]/40 mb-2" />
            <p className="text-[11px] text-zinc-300">Real-time strength tracking across all global flagship clubs.</p>
          </div>
          
          <div className="bg-black/50 backdrop-blur-md border border-[#C7FF00]/30 p-5 rounded-2xl group hover:border-[#C7FF00] transition-all">
            <div className="text-3xl font-black mb-1 text-[#C7FF00] font-display">250+</div>
            <div className="text-[10px] uppercase tracking-widest text-[#C7FF00] font-bold mb-2 font-mono-custom">ELITE RIGS & STATIONS</div>
            <div className="h-[1px] w-full bg-[#C7FF00]/40 mb-2" />
            <p className="text-[11px] text-zinc-300">Eleiko competition plates, Hammer Strength power racks.</p>
          </div>

          <div className="bg-black/50 backdrop-blur-md border border-[#C7FF00]/30 p-5 rounded-2xl group hover:border-[#C7FF00] transition-all">
            <div className="text-3xl font-black mb-1 text-white font-display">24/7</div>
            <div className="text-[10px] uppercase tracking-widest text-[#C7FF00] font-bold mb-2 font-mono-custom">VIP KEY ACCESS</div>
            <div className="h-[1px] w-full bg-[#C7FF00]/40 mb-2" />
            <p className="text-[11px] text-zinc-300">Digital QR key pass access to cryo suites, saunas, and lifting floors.</p>
          </div>

          <div className="bg-[#C7FF00] p-5 rounded-2xl flex flex-col justify-between text-black group hover:scale-[1.02] transition-transform shadow-[0_0_25px_rgba(199,255,0,0.3)]">
            <div>
              <div className="font-black text-xl uppercase leading-none tracking-tight font-display mb-1.5">JOIN THE CLUB TODAY</div>
              <p className="text-[11px] font-extrabold opacity-90">Unlock unrestricted access to all 14 global flagship locations.</p>
            </div>
            <div className="flex justify-end mt-4">
              <button 
                onClick={() => setCurrentView('memberships')}
                className="w-10 h-10 bg-black text-[#C7FF00] rounded-full flex items-center justify-center hover:bg-zinc-900 transition-colors"
              >
                <span className="text-lg font-black">→</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* NEW PICTURE GALLERY: TRAINING DISCIPLINES & ATHLETE DETAILS */}
      <div className="relative z-10 bg-black/70 border-t border-[#C7FF00]/30 py-14 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C7FF00]/20 border border-[#C7FF00]/50 text-[#C7FF00] text-xs font-mono-custom font-black uppercase mb-3">
              <Activity className="w-4 h-4 text-[#C7FF00]" />
              <span>SPECIALIZED TRAINING DISCIPLINES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase font-display tracking-tight">
              ATHLETE WORKOUT <span className="text-[#C7FF00]">DISCIPLINES</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 mt-2 font-medium">
              Click any workout card below to open complete exercise specifications, muscle targeted maps, equipment guides, and trainer protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {WORKOUT_DETAILS_DATA.map((workout) => (
              <div 
                key={workout.id}
                onClick={() => setSelectedWorkout(workout)}
                className="bg-zinc-950/90 border border-[#C7FF00]/30 rounded-3xl overflow-hidden hover:border-[#C7FF00] hover:shadow-[0_0_30px_rgba(199,255,0,0.25)] transition-all duration-300 group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={workout.image} 
                      alt={workout.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 bg-[#C7FF00] text-black font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                      {workout.category}
                    </span>

                    <span className="absolute top-3 right-3 bg-black/80 text-[#C7FF00] border border-[#C7FF00]/40 font-mono-custom font-black text-[10px] px-2.5 py-1 rounded-full uppercase">
                      {workout.intensity}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-black text-white group-hover:text-[#C7FF00] transition-colors font-display uppercase">
                      {workout.title}
                    </h3>
                    
                    <div className="flex items-center gap-3 my-2 text-[11px] font-mono-custom text-[#C7FF00] font-bold">
                      <span>• {workout.setsReps}</span>
                      <span>• {workout.rpe}</span>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2">
                      {workout.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {workout.targetMuscles.slice(0, 3).map((muscle, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-[#C7FF00]/10 text-[#C7FF00] border border-[#C7FF00]/20 font-mono-custom font-bold">
                          {muscle}
                        </span>
                      ))}
                      {workout.targetMuscles.length > 3 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 font-mono-custom">
                          +{workout.targetMuscles.length - 3} MORE
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedWorkout(workout);
                    }}
                    className="w-full py-2.5 rounded-full bg-[#C7FF00]/15 hover:bg-[#C7FF00] text-[#C7FF00] hover:text-black border border-[#C7FF00]/50 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 group-hover:bg-[#C7FF00] group-hover:text-black"
                  >
                    <span>OPEN FULL DETAILS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

          </div>

        </div>
      </div>

      {/* FEATURE SPOTLIGHT SHOWCASE WITH MEN WORKOUT IMAGES */}
      <div className="relative z-10 bg-black/60 border-t border-[#C7FF00]/30 py-14 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[#C7FF00] font-mono-custom text-xs font-bold uppercase tracking-widest">
                FACILITIES & SPECIALTIES
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase mt-1 font-display tracking-tight">
                BUILT FOR THE TOP 1% ATHLETE
              </h2>
            </div>
            <button 
              onClick={() => setCurrentView('locations')}
              className="text-xs font-bold text-[#C7FF00] hover:underline uppercase tracking-widest flex items-center gap-1.5 self-start md:self-auto transition-colors"
            >
              <span>EXPLORE ALL LOCATIONS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* FEATURE 1 - MEN WORKOUT IMAGE */}
            <div 
              onClick={() => setSelectedWorkout(WORKOUT_DETAILS_DATA[0])}
              className="group cursor-pointer rounded-3xl bg-zinc-950/80 backdrop-blur-md border border-[#C7FF00]/30 overflow-hidden hover:border-[#C7FF00] transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800" 
                  alt="Men Athlete Lifting Heavy Weights" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 bg-[#C7FF00] text-black font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                  HEAVY STRENGTH
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-base font-black text-white group-hover:text-[#C7FF00] transition-colors font-display uppercase">
                  MASTER TRAINER SESSIONS
                </h3>
                <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                  Reserve your position in small-group high-yield training blocks led by Olympic and IFBB Master Trainers. Click to view detailed protocol.
                </p>
              </div>
            </div>

            {/* FEATURE 2 - MEN BARBELL SQUAT WORKOUT IMAGE */}
            <div 
              onClick={() => setSelectedWorkout(WORKOUT_DETAILS_DATA[3])}
              className="group cursor-pointer rounded-3xl bg-zinc-950/80 backdrop-blur-md border border-[#C7FF00]/30 overflow-hidden hover:border-[#C7FF00] transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800" 
                  alt="Men Heavy Squat Workout" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 bg-black/80 text-[#C7FF00] border border-[#C7FF00]/40 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                  STATE-OF-THE-ART
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-base font-black text-white group-hover:text-[#C7FF00] transition-colors font-display uppercase">
                  ELEIKO & HAMMER STRENGTH RIGS
                </h3>
                <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                  Competition-grade Olympic platforms, custom matte black power racks, Keiser pneumatic trainers, and turf sprint lanes. Click for specifications.
                </p>
              </div>
            </div>

            {/* FEATURE 3 - MEN ATHLETE DUMBBELL RECOVERY */}
            <div 
              onClick={() => setSelectedWorkout(WORKOUT_DETAILS_DATA[2])}
              className="group cursor-pointer rounded-3xl bg-zinc-950/80 backdrop-blur-md border border-[#C7FF00]/30 overflow-hidden hover:border-[#C7FF00] transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=800" 
                  alt="Men Bodybuilder Muscle Workout" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 bg-lime-400 text-black font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                  RECOVERY SUITES
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-base font-black text-white group-hover:text-[#C7FF00] transition-colors font-display uppercase">
                  CRYO & HYPERBARIC RECOVERY
                </h3>
                <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                  -110°C full-body cryo chambers, contrast plunges, infrared saunas, and percussion therapy suites to double your recovery rate. Click for full guide.
                </p>
              </div>
            </div>

          </div>

          {/* STOP MAKING EXCUSES BANNER */}
          <div className="mt-16 bg-[#C7FF00] rounded-3xl p-8 sm:p-12 text-black text-center relative overflow-hidden shadow-[0_0_50px_rgba(199,255,0,0.35)]">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter font-display leading-none mb-3">
              STOP MAKING EXCUSES.
            </h2>
            <p className="text-xs sm:text-sm font-black uppercase tracking-wider text-black/80 max-w-xl mx-auto mb-8">
              THE HARD WORK STARTS TODAY. SECURE YOUR BIOMETRIC ACCESS PASS AND ELEVATE YOUR PERFORMANCE.
            </p>
            <button
              onClick={() => setCurrentView('memberships')}
              className="px-8 py-4 bg-black text-[#C7FF00] font-black text-xs uppercase tracking-wider rounded-full hover:scale-105 transition-all shadow-xl"
            >
              JOIN THE CLUB TODAY
            </button>
          </div>

        </div>
      </div>

      {/* FULL-PAGE DETAILED WORKOUT SPECIFICATIONS MODAL */}
      {selectedWorkout && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="max-w-3xl w-full bg-[#0d1406] border-2 border-[#C7FF00] rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(199,255,0,0.4)] my-8 relative">
            
            {/* CLOSE BUTTON */}
            <button 
              onClick={() => setSelectedWorkout(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/80 hover:bg-[#C7FF00] text-white hover:text-black rounded-full border border-[#C7FF00]/50 flex items-center justify-center transition-all shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* HERO PICTURE HEADER */}
            <div className="relative h-72 sm:h-80 overflow-hidden">
              <img 
                src={selectedWorkout.image} 
                alt={selectedWorkout.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1406] via-transparent to-transparent opacity-80" />
              
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-[#C7FF00] text-black font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider">
                  {selectedWorkout.category}
                </span>
                <span className="bg-black/80 text-[#C7FF00] border border-[#C7FF00]/50 font-mono-custom font-black text-xs px-3 py-1 rounded-full uppercase">
                  {selectedWorkout.intensity} INTENSITY
                </span>
              </div>

              <div className="absolute bottom-4 left-6 right-6">
                <h2 className="text-2xl sm:text-4xl font-black text-white uppercase font-display tracking-tight leading-none mb-1">
                  {selectedWorkout.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#C7FF00] font-mono-custom font-bold">
                  {selectedWorkout.description}
                </p>
              </div>
            </div>

            {/* DETAILS CONTENT BODY */}
            <div className="p-6 sm:p-8 space-y-6 text-zinc-200">
              
              {/* KEY PERFORMANCE METRICS GRID */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-black/60 border border-[#C7FF00]/30 p-3.5 rounded-2xl">
                  <div className="text-[10px] font-mono-custom font-bold text-zinc-400 uppercase">SETS & REPS</div>
                  <div className="text-sm font-black text-white mt-1">{selectedWorkout.setsReps}</div>
                </div>

                <div className="bg-black/60 border border-[#C7FF00]/30 p-3.5 rounded-2xl">
                  <div className="text-[10px] font-mono-custom font-bold text-zinc-400 uppercase">TEMPO & RATE</div>
                  <div className="text-sm font-black text-[#C7FF00] mt-1">{selectedWorkout.tempo}</div>
                </div>

                <div className="bg-black/60 border border-[#C7FF00]/30 p-3.5 rounded-2xl">
                  <div className="text-[10px] font-mono-custom font-bold text-zinc-400 uppercase">EST. CALORIE BURN</div>
                  <div className="text-sm font-black text-white mt-1">{selectedWorkout.caloriesBurned}</div>
                </div>

                <div className="bg-black/60 border border-[#C7FF00]/30 p-3.5 rounded-2xl">
                  <div className="text-[10px] font-mono-custom font-bold text-zinc-400 uppercase">RECOVERY WINDOW</div>
                  <div className="text-sm font-black text-lime-300 mt-1">{selectedWorkout.recoveryTime}</div>
                </div>
              </div>

              {/* TARGETED MUSCLE GROUPS */}
              <div>
                <h3 className="text-xs font-mono-custom font-black uppercase text-[#C7FF00] tracking-widest mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>TARGET MUSCLE GROUPS</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedWorkout.targetMuscles.map((muscle, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 rounded-xl bg-[#C7FF00]/15 text-[#C7FF00] border border-[#C7FF00]/40 font-mono-custom text-xs font-bold"
                    >
                      ✓ {muscle}
                    </span>
                  ))}
                </div>
              </div>

              {/* STEP-BY-STEP EXECUTION GUIDE */}
              <div>
                <h3 className="text-xs font-mono-custom font-black uppercase text-[#C7FF00] tracking-widest mb-3 flex items-center gap-2">
                  <Dumbbell className="w-4 h-4" />
                  <span>EXECUTION & BIOMECHANICAL STEPS</span>
                </h3>
                <div className="space-y-2.5">
                  {selectedWorkout.executionSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-black/40 border border-white/10 p-3 rounded-2xl">
                      <span className="w-6 h-6 rounded-full bg-[#C7FF00] text-black font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-200 font-medium leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* EQUIPMENT REQUIRED */}
              <div>
                <h3 className="text-xs font-mono-custom font-black uppercase text-[#C7FF00] tracking-widest mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>REQUIRED RIGS & GEAR</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedWorkout.equipment.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300 font-mono-custom">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C7FF00]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* MASTER TRAINER FORM TIP */}
              <div className="bg-[#C7FF00]/15 border border-[#C7FF00]/50 p-4 rounded-2xl flex items-start gap-3">
                <Info className="w-5 h-5 text-[#C7FF00] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-black text-[#C7FF00] font-mono-custom uppercase">MASTER COACH FORM TIP</div>
                  <p className="text-xs text-zinc-200 mt-1 font-medium leading-relaxed">
                    {selectedWorkout.trainerTip}
                  </p>
                </div>
              </div>

              {/* BOTTOM ACTION CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
                <button
                  onClick={() => setSelectedWorkout(null)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold text-xs uppercase tracking-wider border border-zinc-700 transition-all"
                >
                  CLOSE DETAILS
                </button>

                <button
                  onClick={() => {
                    setSelectedWorkout(null);
                    setCurrentView('schedule');
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#C7FF00] hover:bg-[#b0e600] text-black font-black text-xs uppercase tracking-wider rounded-full shadow-[0_0_30px_rgba(199,255,0,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-black" />
                  <span>BOOK SESSION IN SCHEDULE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

