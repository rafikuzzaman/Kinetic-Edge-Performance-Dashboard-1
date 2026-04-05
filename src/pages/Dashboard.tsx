import React from 'react';
import { 
  Trophy, 
  Timer, 
  TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { cn } from '../lib/utils';
import { Map as MapIcon, Thermometer, Wind, ChevronRight } from 'lucide-react';

// --- Types ---

interface TrainingRun {
  id: string;
  date: string;
  location: string;
  split1: string;
  split2: string;
  finalTime: string;
  condition: string;
  conditionColor: string;
}

// --- Mock Data ---

const VELOCITY_DATA = [
  { time: 0, speed: 40, type: 'normal' },
  { time: 5, speed: 60, type: 'normal' },
  { time: 10, speed: 55, type: 'normal' },
  { time: 15, speed: 85, type: 'acceleration' },
  { time: 20, speed: 70, type: 'normal' },
  { time: 25, speed: 90, type: 'normal' },
  { time: 30, speed: 75, type: 'turn' },
  { time: 35, speed: 45, type: 'normal' },
  { time: 40, speed: 65, type: 'normal' },
  { time: 45, speed: 102.4, type: 'acceleration' },
  { time: 50, speed: 80, type: 'normal' },
  { time: 55, speed: 50, type: 'normal' },
];

const RECENT_RUNS: TrainingRun[] = [
  {
    id: '#TR-2094',
    date: 'Today, 09:12 AM',
    location: 'Saas-Fee, CH',
    split1: '18.42s',
    split2: '34.12s',
    finalTime: '1:12.45',
    condition: 'Blue Ice',
    conditionColor: 'bg-secondary-container text-on-secondary-container',
  },
  {
    id: '#TR-2093',
    date: 'Today, 08:45 AM',
    location: 'Saas-Fee, CH',
    split1: '18.55s',
    split2: '34.45s',
    finalTime: '1:13.02',
    condition: 'Soft Snow',
    conditionColor: 'bg-surface-variant text-on-surface-variant',
  },
  {
    id: '#TR-2088',
    date: 'Yesterday, 14:22 PM',
    location: 'Zermatt, CH',
    split1: '18.12s',
    split2: '33.98s',
    finalTime: '1:11.88',
    condition: 'Man-Made',
    conditionColor: 'bg-tertiary-container text-on-tertiary-container',
  },
];

const StatCard = ({ label, value, unit, trend, icon, variant = 'default' }: { 
  label: string, 
  value: string, 
  unit: string, 
  trend?: string, 
  icon?: React.ReactNode,
  variant?: 'default' | 'primary'
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={cn(
      "p-8 rounded-xl border border-transparent relative overflow-hidden group transition-all duration-500 shadow-[0_20px_40px_rgba(42,47,50,0.06)]",
      variant === 'primary' ? "bg-gradient-to-br from-primary to-primary-container text-on-primary" : "bg-surface-container-lowest"
    )}
  >
    {variant === 'default' && (
      <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
    )}
    <p className={cn(
      "font-body font-bold text-xs uppercase tracking-[0.2em] mb-4",
      variant === 'primary' ? "text-on-primary/70" : "text-outline"
    )}>
      {label}
    </p>
    <div className="flex items-baseline gap-2">
      <span className="text-6xl font-headline font-bold tracking-tighter">{value}</span>
      <span className={cn("font-label font-medium", variant === 'primary' ? "opacity-70" : "text-outline")}>{unit}</span>
    </div>
    {trend && (
      <div className={cn(
        "mt-4 flex items-center gap-2 font-label text-sm font-semibold",
        variant === 'primary' ? "text-on-primary" : "text-tertiary"
      )}>
        {icon}
        {trend}
      </div>
    )}
  </motion.div>
);

export const Dashboard = () => {
  const [activeChart, setActiveChart] = React.useState<'SPEED' | 'G-FORCE'>('SPEED');
  const [notification, setNotification] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const RunContextCard = () => (
    <div className="lg:col-span-4 glass-panel rounded-xl p-8 flex flex-col justify-between overflow-hidden relative border border-white/20">
      <img 
        alt="Snowy mountain terrain" 
        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 -z-10" 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuASg7GTODF3Anwze66oF1-lOnsvaLR8b6RM338c9MtDOdecINqOCWlfcSmRKBne0VwvYaX3g6vN2b3Doc_W6TFSpMPYfZ1b0NjaEGqOdp7pmA_I3sUZiUUEPYRVqDQVmjkCI7VAEyqwk0yTXvQx7kbRt546VMc43vEialdZZaIiWTaf_N8fONdRybe98beV2SmGmjnjcywWbx5_G804ByV8eDCl16G-Xlp62T_ude48RARhrJwWFmBjxFDB6uh7zezU0INLPbp1ngo0"
        referrerPolicy="no-referrer"
      />
      <div>
        <div className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full text-[10px] font-bold inline-block mb-4 uppercase tracking-widest">Current Condition</div>
        <h4 className="text-3xl font-headline font-bold text-on-surface leading-tight mb-2">Hard Packed / Ice</h4>
        <div className="flex items-center gap-4 text-on-surface/70 font-label">
          <div className="flex items-center gap-1">
            <Thermometer size={14} />
            -8°C
          </div>
          <div className="flex items-center gap-1">
            <Wind size={14} />
            12 km/h NW
          </div>
        </div>
      </div>
      <div className="mt-8 space-y-4">
        <div className="bg-white/40 p-4 rounded-lg backdrop-blur-sm border border-white/50">
          <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-1">Equipment Used</p>
          <p className="font-headline font-bold text-on-surface">Atomic Redster G9 FIS</p>
          <p className="text-xs text-on-surface/60 font-medium">Wax: LF Graphite Mix</p>
        </div>
        <button 
          onClick={() => setNotification("Downloading race data CSV...")}
          className="w-full bg-on-surface text-surface py-3 rounded-lg font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-on-surface/90 transition-colors"
        >
          View Course Map
          <MapIcon size={14} />
        </button>
      </div>
    </div>
  );

  const RecentRunsTable = () => (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(42,47,50,0.06)]">
      <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
        <h3 className="text-xl font-headline font-bold text-on-surface">Recent Training Runs</h3>
        <button 
          onClick={() => setNotification("Preparing CSV download...")}
          className="text-primary text-xs font-bold uppercase tracking-widest hover:underline transition-all"
        >
          Download CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-surface-container-low">
              <th className="px-8 py-4 font-label text-[10px] font-bold text-outline uppercase tracking-widest">Session ID</th>
              <th className="px-8 py-4 font-label text-[10px] font-bold text-outline uppercase tracking-widest">Location</th>
              <th className="px-8 py-4 font-label text-[10px] font-bold text-outline uppercase tracking-widest">Split 1</th>
              <th className="px-8 py-4 font-label text-[10px] font-bold text-outline uppercase tracking-widest">Split 2</th>
              <th className="px-8 py-4 font-label text-[10px] font-bold text-outline uppercase tracking-widest">Final Time</th>
              <th className="px-8 py-4 font-label text-[10px] font-bold text-outline uppercase tracking-widest">Condition</th>
              <th className="px-8 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {RECENT_RUNS.map((run) => (
              <tr key={run.id} className="hover:bg-surface transition-colors group">
                <td className="px-8 py-5">
                  <p className="font-headline font-bold text-on-surface">{run.id}</p>
                  <p className="text-[10px] text-outline font-label">{run.date}</p>
                </td>
                <td className="px-8 py-5 font-label font-medium text-on-surface">{run.location}</td>
                <td className="px-8 py-5 font-headline font-bold text-on-surface">{run.split1}</td>
                <td className="px-8 py-5 font-headline font-bold text-on-surface">{run.split2}</td>
                <td className={cn("px-8 py-5 font-headline font-extrabold", run.id === '#TR-2094' ? "text-primary" : run.id === '#TR-2088' ? "text-tertiary" : "text-on-surface")}>
                  {run.finalTime}
                </td>
                <td className="px-8 py-5">
                  <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-bold uppercase", run.conditionColor)}>
                    {run.condition}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="text-outline hover:text-primary transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 relative"
    >
      {/* Notification Toast */}
      {notification && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-24 right-8 bg-on-surface text-white px-6 py-3 rounded-lg shadow-2xl z-[100] font-bold text-xs uppercase tracking-widest flex items-center gap-2"
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          {notification}
        </motion.div>
      )}

      {/* Hero Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Average Speed" 
          value="84.2" 
          unit="km/h" 
          trend="+2.4 from last session" 
          icon={<TrendingUp size={14} />} 
        />
        <StatCard 
          label="Points Ranking" 
          value="12" 
          unit="FIS" 
          trend="World Rank: #142" 
          icon={<Trophy size={14} />} 
        />
        <StatCard 
          label="Last Race Placement" 
          value="04" 
          unit="TH" 
          trend="+0.12s from Podium" 
          icon={<Timer size={14} />} 
          variant="primary"
        />
      </div>

      {/* Mark Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['Mark Split', 'Mark Turn', 'Mark Error', 'Mark Finish'].map((label) => (
          <motion.button 
            key={label}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setNotification(`${label} recorded at ${new Date().toLocaleTimeString()}.`);
              // In a real app, we would push this to a 'marks' array in the current session
            }}
            className="bg-surface-container-low hover:bg-primary hover:text-white transition-all py-4 rounded-xl font-headline font-bold text-[10px] uppercase tracking-[0.2em] text-outline shadow-sm border border-transparent hover:border-primary/20 active:bg-primary-dim"
          >
            {label}
          </motion.button>
        ))}
      </div>

      {/* Main Data Visualization Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-8 shadow-[0_20px_40px_rgba(42,47,50,0.06)] flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-headline font-bold text-on-surface">Velocity Curve Analysis</h3>
              <p className="text-sm text-outline font-label">Course: Cortina d'Ampezzo (Tofana)</p>
            </div>
            <div className="flex bg-surface-container-low p-1 rounded-lg">
              <button 
                onClick={() => setActiveChart('SPEED')}
                className={cn(
                  "px-4 py-1.5 rounded-md text-xs font-bold transition-all",
                  activeChart === 'SPEED' ? "bg-white text-primary shadow-sm" : "text-outline hover:text-on-surface"
                )}
              >
                SPEED
              </button>
              <button 
                onClick={() => setActiveChart('G-FORCE')}
                className={cn(
                  "px-4 py-1.5 rounded-md text-xs font-bold transition-all",
                  activeChart === 'G-FORCE' ? "bg-white text-primary shadow-sm" : "text-outline hover:text-on-surface"
                )}
              >
                G-FORCE
              </button>
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={VELOCITY_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" hide />
                <YAxis hide domain={[0, 110]} />
                <Tooltip 
                  cursor={{ fill: 'rgba(171, 45, 0, 0.05)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-on-surface text-white text-[10px] font-bold px-3 py-2 rounded shadow-xl border border-white/10">
                          <div className="opacity-70 uppercase tracking-widest mb-1">Time: {data.time}s</div>
                          <div className="text-sm">{activeChart === 'SPEED' ? `${data.speed} km/h` : `${(data.speed / 20).toFixed(1)} G`}</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="speed" radius={[4, 4, 0, 0]}>
                  {VELOCITY_DATA.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.type === 'acceleration' ? '#ab2d00' : entry.type === 'turn' ? '#006571' : '#dde3e8'} 
                      className="transition-all duration-300 opacity-80 hover:opacity-100 hover:brightness-110 cursor-pointer"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-between mt-6 pt-6 border-t border-slate-100">
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-[10px] font-bold text-outline uppercase tracking-wider">Acceleration Zone</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-tertiary"></div>
                <span className="text-[10px] font-bold text-outline uppercase tracking-wider">Turn Radius Max</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-outline uppercase tracking-widest">Time (Seconds)</span>
          </div>
        </div>
        <RunContextCard />
      </div>

      {/* Recent Runs Table */}
      <RecentRunsTable />
    </motion.div>
  );
};
