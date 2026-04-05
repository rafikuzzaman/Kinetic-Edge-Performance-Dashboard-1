import React from 'react';
import { motion } from 'motion/react';
import { Dumbbell, Activity, Timer, Zap, ChevronRight, BarChart2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { NavLink } from 'react-router-dom';

const TRAINING_SESSIONS = [
  {
    id: 'S-992',
    type: 'Slalom Drills',
    date: 'Today, 07:30 AM',
    duration: '120 min',
    intensity: 'High',
    avgHr: '154 bpm',
    calories: '840 kcal'
  },
  {
    id: 'S-991',
    type: 'Core & Stability',
    date: 'Yesterday, 16:00 PM',
    duration: '60 min',
    intensity: 'Medium',
    avgHr: '122 bpm',
    calories: '320 kcal'
  },
  {
    id: 'S-990',
    type: 'Strength Training',
    date: 'Yesterday, 09:00 AM',
    duration: '90 min',
    intensity: 'High',
    avgHr: '142 bpm',
    calories: '610 kcal'
  }
];

export const TrainingData = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-headline font-bold text-on-surface">Training Data</h2>
        <p className="text-outline font-label">Off-course and technical preparation metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-secondary to-secondary-dim p-8 rounded-xl text-white shadow-lg">
            <Activity className="mb-4 opacity-50" size={32} />
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Recovery Score</p>
            <h3 className="text-5xl font-headline font-bold mb-4">88%</h3>
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div className="bg-white h-full w-[88%]"></div>
            </div>
            <p className="mt-4 text-xs font-label opacity-70">Optimal for high-intensity training today</p>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-transparent">
            <h4 className="font-headline font-bold text-on-surface mb-4">Weekly Volume</h4>
            <div className="space-y-4">
              <VolumeItem label="On-Snow" value={12} total={20} color="bg-primary" />
              <VolumeItem label="Gym" value={8} total={20} color="bg-secondary" />
              <VolumeItem label="Recovery" value={4} total={20} color="bg-tertiary" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
            <h3 className="text-xl font-headline font-bold text-on-surface">Recent Sessions</h3>
            <NavLink to="/sessions" className="text-primary text-xs font-bold uppercase tracking-widest hover:underline">View All</NavLink>
          </div>
          <div className="divide-y divide-slate-50">
            {TRAINING_SESSIONS.map((session) => (
              <div key={session.id} className="px-8 py-6 flex items-center justify-between hover:bg-surface transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                    {session.type.includes('Slalom') ? <Zap size={20} /> : <Dumbbell size={20} />}
                  </div>
                  <div>
                    <p className="font-headline font-bold text-on-surface">{session.type}</p>
                    <p className="text-[10px] text-outline font-label uppercase tracking-wider">{session.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-12">
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">Duration</p>
                    <p className="font-label font-bold text-on-surface">{session.duration}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">Intensity</p>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase",
                      session.intensity === 'High' ? "bg-error-container text-on-error-container" : "bg-secondary-container text-on-secondary-container"
                    )}>
                      {session.intensity}
                    </span>
                  </div>
                  <button className="text-outline group-hover:text-primary transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const VolumeItem = ({ label, value, total, color }: { label: string, value: number, total: number, color: string }) => (
  <div>
    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1">
      <span className="text-outline">{label}</span>
      <span className="text-on-surface">{value}h</span>
    </div>
    <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
      <div className={cn("h-full", color)} style={{ width: `${(value / total) * 100}%` }}></div>
    </div>
  </div>
);
