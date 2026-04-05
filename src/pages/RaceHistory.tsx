import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Calendar, MapPin, ChevronRight, Filter } from 'lucide-react';
import { cn } from '../lib/utils';

const RACES = [
  {
    id: 'R-2024-01',
    event: 'FIS World Cup - Giant Slalom',
    location: 'Cortina d\'Ampezzo, ITA',
    date: 'Jan 24, 2024',
    rank: '04',
    time: '2:14.52',
    points: '12.4',
    status: 'Official'
  },
  {
    id: 'R-2024-02',
    event: 'FIS World Cup - Giant Slalom',
    location: 'Kranjska Gora, SLO',
    date: 'Jan 06, 2024',
    rank: '08',
    time: '2:16.12',
    points: '14.2',
    status: 'Official'
  },
  {
    id: 'R-2023-12',
    event: 'FIS World Cup - Giant Slalom',
    location: 'Lienz, AUT',
    date: 'Dec 28, 2023',
    rank: '02',
    time: '2:12.88',
    points: '8.5',
    status: 'Podium'
  }
];

export const RaceHistory = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-headline font-bold text-on-surface">Race History</h2>
          <p className="text-outline font-label">Comprehensive record of FIS sanctioned events</p>
        </div>
        <button className="flex items-center gap-2 bg-surface-container-high px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-surface-variant transition-colors">
          <Filter size={14} />
          Filter Results
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-transparent hover:border-primary/10 transition-all">
          <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-2">Season Podiums</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-headline font-bold text-on-surface">03</span>
            <span className="text-xs font-label text-outline">Total</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-transparent hover:border-primary/10 transition-all">
          <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-2">Avg. FIS Points</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-headline font-bold text-on-surface">11.2</span>
            <span className="text-xs font-label text-outline">Points</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-transparent hover:border-primary/10 transition-all">
          <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-2">Top 10 Finishes</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-headline font-bold text-on-surface">07</span>
            <span className="text-xs font-label text-outline">Races</span>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-8 py-4 font-label text-[10px] font-bold text-outline uppercase tracking-widest">Event Details</th>
                <th className="px-8 py-4 font-label text-[10px] font-bold text-outline uppercase tracking-widest">Rank</th>
                <th className="px-8 py-4 font-label text-[10px] font-bold text-outline uppercase tracking-widest">Time</th>
                <th className="px-8 py-4 font-label text-[10px] font-bold text-outline uppercase tracking-widest">FIS Points</th>
                <th className="px-8 py-4 font-label text-[10px] font-bold text-outline uppercase tracking-widest">Status</th>
                <th className="px-8 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {RACES.map((race) => (
                <tr key={race.id} className="hover:bg-surface transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                        <Trophy size={20} />
                      </div>
                      <div>
                        <p className="font-headline font-bold text-on-surface">{race.event}</p>
                        <div className="flex items-center gap-3 mt-1 text-[10px] font-label text-outline uppercase tracking-wider">
                          <span className="flex items-center gap-1"><MapPin size={10} /> {race.location}</span>
                          <span className="flex items-center gap-1"><Calendar size={10} /> {race.date}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "text-2xl font-headline font-bold",
                      race.status === 'Podium' ? "text-primary" : "text-on-surface"
                    )}>
                      {race.rank}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-label font-bold text-on-surface">{race.time}</td>
                  <td className="px-8 py-6 font-label font-bold text-on-surface">{race.points}</td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest",
                      race.status === 'Podium' ? "bg-primary-container text-on-primary-container" : "bg-surface-container-high text-on-surface-variant"
                    )}>
                      {race.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
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
    </motion.div>
  );
};
