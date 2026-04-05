import React from 'react';
import { motion } from 'motion/react';
import { auth, db } from '../firebase';
import { updateProfile, updatePassword, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Camera, LogOut, Save, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

export const Profile = () => {
  const [user, setUser] = React.useState<any>(null);
  const [name, setName] = React.useState('');
  const [photoURL, setPhotoURL] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<{ type: 'success' | 'error', text: string } | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.displayName || '');
        setPhotoURL(currentUser.photoURL || '');
        
        // Fetch additional data from Firestore
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setName(data.name || currentUser.displayName || '');
          setPhotoURL(data.photoURL || currentUser.photoURL || '');
        }
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    setLoading(true);
    setMessage(null);
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL
      });
      
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        name: name,
        photoURL: photoURL
      });
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser || !newPassword) return;
    setLoading(true);
    setMessage(null);
    try {
      await updatePassword(auth.currentUser, newPassword);
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setNewPassword('');
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err: any) {
      console.error(err.message);
    }
  };

  if (!user) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-8 pb-20"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-headline font-bold text-on-surface tracking-tight">Athlete Profile</h2>
          <p className="text-outline font-label mt-1">Manage your identity and security settings</p>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-surface-container-high text-on-surface-variant px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-error hover:text-white transition-all flex items-center gap-2"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>

      {message && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "p-4 rounded-xl font-bold text-sm flex items-center gap-3 shadow-sm",
            message.type === 'success' ? "bg-tertiary-container text-on-tertiary-container" : "bg-error-container text-on-error-container"
          )}
        >
          <div className={cn("w-2 h-2 rounded-full", message.type === 'success' ? "bg-tertiary" : "bg-error")}></div>
          {message.text}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline/5 text-center">
            <div className="relative w-32 h-32 mx-auto mb-6 group">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-primary/10 shadow-xl">
                <img 
                  src={photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=AB2D00&color=fff`} 
                  alt={name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="text-white" size={24} />
              </div>
            </div>
            <h3 className="text-2xl font-headline font-bold text-on-surface">{name}</h3>
            <p className="text-outline font-label text-sm mb-6">{user.email}</p>
            <div className="flex items-center justify-center gap-2 bg-tertiary-container text-on-tertiary-container px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
              <ShieldCheck size={12} />
              Verified Athlete
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline/5">
            <h4 className="text-[10px] font-bold text-outline uppercase tracking-widest mb-4">Account Stats</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-label text-outline">Member Since</span>
                <span className="text-sm font-label font-bold text-on-surface">
                  {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-label text-outline">Last Login</span>
                <span className="text-sm font-label font-bold text-on-surface">
                  {user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Forms */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline/5">
            <h3 className="text-xl font-headline font-bold text-on-surface mb-8 flex items-center gap-3">
              <User className="text-primary" size={20} />
              General Information
            </h3>
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-outline uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline/20 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors font-label"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2 opacity-60">
                  <label className="text-[10px] font-bold text-outline uppercase tracking-widest ml-1">Email (Read Only)</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
                    <input 
                      type="email" 
                      value={user.email}
                      disabled
                      className="w-full bg-surface-container-low border border-outline/20 rounded-xl py-4 pl-12 pr-4 font-label cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-outline uppercase tracking-widest ml-1">Profile Photo URL</label>
                <div className="relative">
                  <Camera className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
                  <input 
                    type="url" 
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full bg-surface-container-low border border-outline/20 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors font-label"
                  />
                </div>
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="bg-primary text-white px-8 py-4 rounded-xl font-headline font-bold uppercase tracking-[0.2em] shadow-lg hover:bg-primary-dim transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <Save size={18} />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline/5">
            <h3 className="text-xl font-headline font-bold text-on-surface mb-8 flex items-center gap-3">
              <Lock className="text-tertiary" size={20} />
              Security Settings
            </h3>
            <form onSubmit={handleUpdatePassword} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-outline uppercase tracking-widest ml-1">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
                  <input 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter at least 6 characters"
                    className="w-full bg-surface-container-low border border-outline/20 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors font-label"
                    minLength={6}
                  />
                </div>
              </div>
              <button 
                type="submit"
                disabled={loading || !newPassword}
                className="bg-tertiary text-white px-8 py-4 rounded-xl font-headline font-bold uppercase tracking-[0.2em] shadow-lg hover:bg-tertiary/90 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <Lock size={18} />
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
