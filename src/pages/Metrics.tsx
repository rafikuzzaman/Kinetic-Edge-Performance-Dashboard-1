import React from 'react';
import { motion } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Gauge, Activity, Zap, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../lib/utils';

const PERFORMANCE_TREND = [
  { day: 'Mon', speed: 78, gforce: 2.1 },
  { day: 'Tue', speed: 82, gforce: 2.4 },
  { day: 'Wed', speed: 80, gforce: 2.2 },
  { day: 'Thu', speed: 85, gforce: 2.8 },
  { day: 'Fri', speed: 88, gforce: 3.1 },
  { day: 'Sat', speed: 84, gforce: 2.6 },
  { day: 'Sun', speed: 91, gforce: 3.4 },
];

export const Metrics = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-headline font-bold text-on-surface">Advanced Metrics</h2>
        <p className="text-outline font-label">Deep dive into physiological and technical performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Max Speed" value="104.2" unit="km/h" trend="+4.2%" up />
        <MetricCard label="Peak G-Force" value="4.8" unit="G" trend="+0.4" up />
        <MetricCard label="Avg. Heart Rate" value="148" unit="bpm" trend="-2.1%" down />
        <MetricCard label="Reaction Time" value="0.18" unit="s" trend="-0.02" up />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-headline font-bold text-on-surface">Speed Progression</h3>
            <div className="flex items-center gap-2 text-[10px] font-bold text-outline uppercase tracking-widest">
              <span className="w-3 h-3 rounded-full bg-primary"></span> Max Speed
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PERFORMANCE_TREND}>
                <defs>
                  <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ab2d00" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ab2d00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#73777b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#73777b' }} />
                <Tooltip />
                <Area type="monotone" dataKey="speed" stroke="#ab2d00" strokeWidth={3} fillOpacity={1} fill="url(#colorSpeed)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-headline font-bold text-on-surface">G-Force Load</h3>
            <div className="flex items-center gap-2 text-[10px] font-bold text-outline uppercase tracking-widest">
              <span className="w-3 h-3 rounded-full bg-tertiary"></span> Lateral Gs
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PERFORMANCE_TREND}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#73777b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#73777b' }} />
                <Tooltip />
                <Line type="monotone" dataKey="gforce" stroke="#006571" strokeWidth={3} dot={{ r: 4, fill: '#006571' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MetricCard = ({ label, value, unit, trend, up, down }: { label: string, value: string, unit: string, trend: string, up?: boolean, down?: boolean }) => (
  <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-transparent hover:border-primary/10 transition-all">
    <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-2">{label}</p>
    <div className="flex items-baseline gap-2 mb-2">
      <span className="text-3xl font-headline font-bold text-on-surface">{value}</span>
      <span className="text-xs font-label text-outline">{unit}</span>
    </div>
    <div className={cn(
      "flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest",
      up ? "text-tertiary" : down ? "text-error" : "text-outline"
    )}>
      {up ? <ArrowUpRight size={12} /> : down ? <ArrowDownRight size={12} /> : null}
      {trend}
    </div>
  </div>
);
