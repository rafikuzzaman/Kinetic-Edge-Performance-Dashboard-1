import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Clock, Play, ChevronRight, MoreVertical } from 'lucide-react';
import { cn } from '../lib/utils';

const SESSIONS = [
  {
    id: 'SES-102',
    title: 'Morning Speed Session',
    location: 'Saas-Fee, Glacier',
    date: 'April 05, 2026',
    time: '08:30 - 11:30',
    runs: 8,
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1482867996988-29ec3aee816d?auto=format&fit=crop&q=80&w=400&h=200'
  },
  {
    id: 'SES-101',
    title: 'Technical GS Drills',
    location: 'Zermatt, Matterhorn',
    date: 'April 04, 2026',
    time: '09:00 - 12:00',
    runs: 12,
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=400&h=200'
  }
];

export const Sessions = () => {
  const [view, setView] = React.useState<'list' | 'calendar'>('list');
  const [isNewSessionModalOpen, setIsNewSessionModalOpen] = React.useState(false);

  // Simple calendar generation
  const daysInMonth = 30;
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-headline font-bold text-on-surface">Training Sessions</h2>
          <p className="text-outline font-label">Chronological log of all on-snow and dryland sessions</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setView(view === 'list' ? 'calendar' : 'list')}
            className={cn(
              "px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-colors",
              view === 'calendar' ? "bg-primary text-white" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant"
            )}
          >
            {view === 'calendar' ? 'List View' : 'Calendar View'}
          </button>
          <button 
            onClick={() => setIsNewSessionModalOpen(true)}
            className="bg-primary text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-primary-dim transition-colors flex items-center gap-2"
          >
            <Play size={14} />
            Start New Session
          </button>
        </div>
      </div>

      {view === 'list' ? (
        <div className="grid grid-cols-1 gap-6">
          {SESSIONS.map((session) => (
            <motion.div 
              key={session.id}
              whileHover={{ x: 4 }}
              className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-transparent hover:border-primary/10 transition-all flex h-48"
            >
              <div className="w-72 relative overflow-hidden">
                <img 
                  src={session.image} 
                  alt={session.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
              </div>
              <div className="flex-1 p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{session.id}</span>
                      <span className="w-1 h-1 rounded-full bg-outline/30"></span>
                      <span className="text-[10px] font-bold text-outline uppercase tracking-widest">{session.status}</span>
                    </div>
                    <h3 className="text-2xl font-headline font-bold text-on-surface">{session.title}</h3>
                  </div>
                  <button className="text-outline hover:text-on-surface transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </div>

                <div className="flex items-center gap-12">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-outline">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-outline uppercase tracking-widest">Location</p>
                      <p className="text-xs font-label font-bold text-on-surface">{session.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-outline">
                      <Calendar size={16} />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-outline uppercase tracking-widest">Date</p>
                      <p className="text-xs font-label font-bold text-on-surface">{session.date}</p>
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-[9px] font-bold text-outline uppercase tracking-widest">Runs Logged</p>
                      <p className="text-xl font-headline font-bold text-primary">{session.runs}</p>
                    </div>
                    <button className="w-12 h-12 bg-surface-container-high text-on-surface-variant rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-headline font-bold text-on-surface">April 2026</h3>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg hover:bg-surface-container-low transition-colors text-outline">
                <ChevronRight className="rotate-180" size={20} />
              </button>
              <button className="p-2 rounded-lg hover:bg-surface-container-low transition-colors text-outline">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
              <div key={day} className="text-center py-2 text-[10px] font-bold text-outline tracking-widest">{day}</div>
            ))}
            {calendarDays.map(day => {
              const hasSession = day === 4 || day === 5;
              return (
                <div 
                  key={day} 
                  className={cn(
                    "h-24 rounded-lg p-2 border transition-all flex flex-col justify-between",
                    hasSession ? "bg-primary/5 border-primary/20" : "bg-surface-container-low border-transparent hover:border-outline/10"
                  )}
                >
                  <span className={cn("text-xs font-bold", hasSession ? "text-primary" : "text-outline")}>{day}</span>
                  {hasSession && (
                    <div className="bg-primary text-white text-[8px] font-bold p-1 rounded uppercase tracking-tighter truncate">
                      {day === 5 ? 'Morning Speed' : 'Technical GS'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* New Session Modal */}
      {isNewSessionModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-surface-container-lowest w-full max-w-md rounded-2xl p-8 shadow-2xl"
          >
            <h3 className="text-2xl font-headline font-bold text-on-surface mb-6">Start New Session</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-outline uppercase tracking-widest">Session Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Afternoon GS Training"
                  className="w-full bg-surface-container-low rounded-lg py-3 px-4 text-sm focus:ring-2 ring-primary/20 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-outline uppercase tracking-widest">Location</label>
                <input 
                  type="text" 
                  placeholder="e.g. Hintertux, AT"
                  className="w-full bg-surface-container-low rounded-lg py-3 px-4 text-sm focus:ring-2 ring-primary/20 outline-none"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setIsNewSessionModalOpen(false)}
                  className="flex-1 py-3 rounded-lg font-bold text-xs uppercase tracking-widest text-outline hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIsNewSessionModalOpen(false)}
                  className="flex-1 bg-primary text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-primary-dim transition-colors"
                >
                  Create Session
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};
