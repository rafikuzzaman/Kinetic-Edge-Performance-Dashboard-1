import React from 'react';
import { 
  Bell,
  Search,
  Settings,
  User
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { auth } from '../firebase';

export const Header = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  return (
    <header className="flex justify-between items-center px-8 w-full h-16 backdrop-blur-md sticky top-0 z-40 bg-background/80">
      <div className="flex items-center gap-8">
        <div className="flex items-center bg-surface-container-low px-4 py-2 rounded-lg focus-within:ring-2 ring-primary/20 transition-all">
          <Search size={16} className="text-slate-400" />
          <input 
            className="bg-transparent border-none focus:ring-0 text-sm font-label ml-2 w-64 placeholder:text-slate-400" 
            placeholder="Search analytics..." 
            type="text"
          />
        </div>
        <nav className="hidden lg:flex items-center gap-6">
          <HeaderLink to="/" label="DASHBOARD" />
          <HeaderLink to="/metrics" label="METRICS" />
          <HeaderLink to="/sessions" label="SESSIONS" />
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-200 transition-colors">
          <Bell size={20} className="text-on-surface" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-200 transition-colors">
          <Settings size={20} className="text-on-surface" />
        </button>
        <button 
          onClick={() => navigate('/profile')}
          className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 hover:border-primary transition-all group"
        >
          {user?.photoURL ? (
            <img 
              alt={user.displayName || 'User Profile'} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
              src={user.photoURL}
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-surface-container-high flex items-center justify-center text-outline group-hover:text-primary transition-colors">
              <User size={16} />
            </div>
          )}
        </button>
      </div>
    </header>
  );
};

const HeaderLink = ({ to, label }: { to: string, label: string }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => cn(
      "font-headline tracking-tight py-5 transition-colors duration-200 text-sm font-bold",
      isActive ? "text-primary border-b-2 border-primary" : "text-slate-600 hover:text-primary"
    )}
  >
    {label}
  </NavLink>
);
