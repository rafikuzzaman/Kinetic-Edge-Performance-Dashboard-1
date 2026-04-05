import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { motion } from 'motion/react';
import { Plus, Activity, Play, Calendar as CalendarIcon, MapPin } from 'lucide-react';
import { Modal } from './Modal';

export const Layout = () => {
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar onNewAnalysis={() => setIsAnalysisModalOpen(true)} />
      
      <main className="ml-64 min-h-screen">
        <Header />
        
        <div className="p-8">
          <Outlet />
        </div>

        {/* Floating Action Button */}
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsAnalysisModalOpen(true)}
          className="fixed bottom-8 right-8 w-14 h-14 bg-on-surface text-white rounded-full flex items-center justify-center shadow-2xl z-50 group"
        >
          <Plus size={24} />
          <div className="absolute right-16 bg-on-surface text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-widest">
            Log Manual Run
          </div>
        </motion.button>
      </main>

      <Modal 
        isOpen={isAnalysisModalOpen} 
        onClose={() => setIsAnalysisModalOpen(false)}
        title="New Run Analysis"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-outline uppercase tracking-widest">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={14} />
                <input 
                  type="text" 
                  placeholder="e.g. Saas-Fee, CH"
                  className="w-full bg-surface-container-low border-none rounded-lg py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-outline uppercase tracking-widest">Date</label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={14} />
                <input 
                  type="date" 
                  className="w-full bg-surface-container-low border-none rounded-lg py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-outline uppercase tracking-widest">Run Type</label>
            <div className="grid grid-cols-3 gap-3">
              {['Giant Slalom', 'Slalom', 'Super-G'].map((type) => (
                <button 
                  key={type}
                  className="py-3 rounded-lg border border-slate-100 text-xs font-bold hover:border-primary hover:text-primary transition-all bg-surface-container-lowest"
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-3 bg-surface-container-low hover:bg-surface-container-high transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-outline group-hover:text-primary transition-colors shadow-sm">
              <Activity size={24} />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-on-surface">Upload Sensor Data</p>
              <p className="text-[10px] text-outline font-medium">Supports .FIT, .GPX, .CSV</p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              onClick={() => setIsAnalysisModalOpen(false)}
              className="flex-1 py-3 rounded-lg font-bold text-xs uppercase tracking-widest text-outline hover:bg-surface-container-high transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                setIsAnalysisModalOpen(false);
                // In a real app, this would trigger the analysis process
              }}
              className="flex-1 bg-primary text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-primary-dim transition-colors flex items-center justify-center gap-2"
            >
              <Play size={14} />
              Start Analysis
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
