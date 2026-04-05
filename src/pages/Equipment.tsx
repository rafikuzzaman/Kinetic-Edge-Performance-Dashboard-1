import React from 'react';
import { motion } from 'motion/react';
import { Settings, Shield, Zap, Info, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

const EQUIPMENT = [
  {
    id: 'EQ-001',
    name: 'Atomic Redster G9 FIS',
    category: 'Skis',
    status: 'Active',
    usage: '42 runs',
    lastService: '2 days ago',
    image: 'https://picsum.photos/seed/skis/400/400'
  },
  {
    id: 'EQ-002',
    name: 'Lange World Cup RS',
    category: 'Boots',
    status: 'Active',
    usage: '128 runs',
    lastService: '1 week ago',
    image: 'https://picsum.photos/seed/boots/400/400'
  },
  {
    id: 'EQ-003',
    name: 'POC Skull Orbic X',
    category: 'Protection',
    status: 'Standby',
    usage: '12 runs',
    lastService: 'N/A',
    image: 'https://picsum.photos/seed/helmet/400/400'
  }
];

export const Equipment = () => {
  const [scheduled, setScheduled] = React.useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-headline font-bold text-on-surface">Equipment Inventory</h2>
          <p className="text-outline font-label">Technical gear tracking and maintenance logs</p>
        </div>
        <button className="bg-on-surface text-surface px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-on-surface/90 transition-colors">
          Add New Gear
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EQUIPMENT.map((item) => (
          <motion.div 
            key={item.id}
            whileHover={{ y: -5 }}
            className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-transparent hover:border-primary/10 transition-all group"
          >
            <div className="h-48 overflow-hidden relative">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-lg",
                  item.status === 'Active' ? "bg-tertiary-container text-on-tertiary-container" : "bg-surface-container-high text-on-surface-variant"
                )}>
                  {item.status}
                </span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">{item.category}</p>
              <h3 className="text-lg font-headline font-bold text-on-surface mb-4">{item.name}</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-surface-container-low p-3 rounded-lg">
                  <p className="text-[9px] font-bold text-outline uppercase tracking-widest mb-1">Total Usage</p>
                  <p className="font-label font-bold text-on-surface">{item.usage}</p>
                </div>
                <div className="bg-surface-container-low p-3 rounded-lg">
                  <p className="text-[9px] font-bold text-outline uppercase tracking-widest mb-1">Last Service</p>
                  <p className="font-label font-bold text-on-surface">{item.lastService}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-surface-container-high text-on-surface-variant py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-surface-variant transition-colors flex items-center justify-center gap-2">
                  <Settings size={12} />
                  Service
                </button>
                <button className="w-10 h-10 bg-surface-container-high text-on-surface-variant rounded-lg flex items-center justify-center hover:bg-surface-variant transition-colors">
                  <Info size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-dashed border-outline/20">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Shield size={32} />
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-headline font-bold text-on-surface">Maintenance Alert</h4>
            <p className="text-outline font-label text-sm">Atomic Redster G9 FIS is due for edge sharpening and base waxing after 40+ runs.</p>
          </div>
          <button 
            onClick={() => setScheduled(true)}
            disabled={scheduled}
            className={cn(
              "px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg transition-all",
              scheduled ? "bg-tertiary text-white cursor-default" : "bg-primary text-white hover:bg-primary-dim"
            )}
          >
            {scheduled ? 'Service Scheduled' : 'Schedule Now'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
