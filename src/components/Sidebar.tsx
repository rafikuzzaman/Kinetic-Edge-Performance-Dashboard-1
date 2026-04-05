import React from 'react';
import { 
  Gauge, 
  Trophy, 
  Timer, 
  Dumbbell, 
  LogOut, 
  HelpCircle, 
  User,
  Settings,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const Sidebar = ({ onNewAnalysis }: { onNewAnalysis?: () => void }) => {
  const [user, setUser] = React.useState(auth.currentUser);
  const [role, setRole] = React.useState<string | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch role from Firestore
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        } else if (currentUser.email === 'aabeg01@gmail.com') {
          setRole('admin');
        }
      } else {
        setRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const isAdmin = role === 'admin' || user?.email === 'aabeg01@gmail.com';

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 border-r border-slate-200/10 bg-surface-container-low flex flex-col py-8 px-4 shadow-[20px_0_40px_rgba(42,47,50,0.04)] z-50">
      <div className="mb-10 px-4">
        <h1 className="text-xl font-black text-slate-900 font-headline">KINETIC EDGE</h1>
      </div>
      
      <NavLink to="/profile" className="flex items-center gap-4 px-4 mb-10 hover:bg-white/50 p-2 rounded-xl transition-all group">
        <div className="relative">
          <img 
            alt={user?.displayName || 'User Profile'} 
            className="w-12 h-12 rounded-lg object-cover border-2 border-transparent group-hover:border-primary transition-all" 
            src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=AB2D00&color=fff`}
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-tertiary-fixed rounded-full border-2 border-surface-container-low"></div>
        </div>
        <div className="overflow-hidden">
          <p className="font-headline font-bold text-on-surface truncate">{user?.displayName || 'Athlete'}</p>
          <p className="font-body font-semibold uppercase tracking-wider text-[10px] text-slate-500 truncate">
            {isAdmin ? 'Administrator' : 'GS Specialist'}
          </p>
        </div>
      </NavLink>

      <nav className="flex-1 space-y-1">
        <SidebarLink to="/" icon={<Gauge size={18} />} label="Performance" />
        <SidebarLink to="/race-history" icon={<Trophy size={18} />} label="Race History" />
        <SidebarLink to="/training-data" icon={<Dumbbell size={18} />} label="Training Data" />
        <SidebarLink to="/equipment" icon={<Timer size={18} />} label="Equipment" />
        <SidebarLink to="/profile" icon={<User size={18} />} label="Profile" />
        {isAdmin && (
          <SidebarLink to="/admin" icon={<ShieldCheck size={18} />} label="Admin Panel" />
        )}
      </nav>

      <div className="mt-auto px-4 space-y-6">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNewAnalysis}
          className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-3 rounded-lg font-headline font-bold text-xs uppercase tracking-widest shadow-lg"
        >
          New Run Analysis
        </motion.button>
        <div className="space-y-2">
          <button className="flex items-center gap-3 text-slate-500 text-xs font-semibold uppercase tracking-wider hover:text-primary transition-colors w-full text-left">
            <HelpCircle size={14} />
            Support
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 text-slate-500 text-xs font-semibold uppercase tracking-wider hover:text-error transition-colors w-full text-left"
          >
            <LogOut size={14} />
            Log Out
          </button>
        </div>
      </div>
    </aside>
  );
};

const SidebarLink = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => cn(
      "flex items-center gap-3 py-3 px-4 transition-all duration-300 rounded-lg",
      isActive 
        ? "bg-white text-primary border-l-4 border-primary shadow-sm" 
        : "text-slate-500 hover:bg-white/50 hover:translate-x-1"
    )}
  >
    {icon}
    <span className="font-body font-semibold uppercase tracking-wider text-xs">{label}</span>
  </NavLink>
);
