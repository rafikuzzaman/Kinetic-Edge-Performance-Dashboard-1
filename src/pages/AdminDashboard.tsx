import React from 'react';
import { motion } from 'motion/react';
import { db, auth } from '../firebase';
import { collection, onSnapshot, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { Shield, User, ShieldCheck, ShieldAlert, Search, Mail } from 'lucide-react';
import { cn } from '../lib/utils';

interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: 'admin' | 'athlete';
  photoURL?: string;
  createdAt?: any;
}

export const AdminDashboard = () => {
  const [users, setUsers] = React.useState<UserProfile[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentUserRole, setCurrentUserRole] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchCurrentUserRole = async () => {
      if (auth.currentUser) {
        // We can't directly check role without fetching doc, 
        // but the sidebar already does this. 
        // For simplicity, we'll just let the firestore rules handle the security,
        // but we'll try to fetch it here for UI purposes.
      }
    };
    fetchCurrentUserRole();

    const q = query(collection(db, 'users'), orderBy('email', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({
        ...doc.data(),
        uid: doc.id
      })) as UserProfile[];
      setUsers(usersData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching users:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleRole = async (user: UserProfile) => {
    const newRole = user.role === 'admin' ? 'athlete' : 'admin';
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        role: newRole
      });
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update role. You might not have permission.");
    }
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-20"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-headline font-bold text-on-surface tracking-tight">User Management</h2>
          <p className="text-outline font-label mt-1">Manage athlete roles and administrative access</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface-container-lowest border border-outline/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary transition-all font-label text-sm shadow-sm"
          />
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">Athlete</th>
                <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">Email</th>
                <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">Role</th>
                <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/5">
              {filteredUsers.map((user) => (
                <tr key={user.uid} className="hover:bg-surface-container-low/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=AB2D00&color=fff`} 
                        alt={user.name} 
                        className="w-10 h-10 rounded-lg object-cover shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                      <span className="font-headline font-bold text-on-surface">{user.name || 'Anonymous'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-outline font-label text-sm">
                      <Mail size={14} />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                      user.role === 'admin' 
                        ? "bg-tertiary-container text-on-tertiary-container" 
                        : "bg-surface-container-high text-outline"
                    )}>
                      {user.role === 'admin' ? <ShieldCheck size={12} /> : <User size={12} />}
                      {user.role}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => toggleRole(user)}
                      disabled={user.email === 'aabeg01@gmail.com'} // Prevent removing initial admin
                      className={cn(
                        "px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
                        user.role === 'admin'
                          ? "text-error hover:bg-error/10"
                          : "text-primary hover:bg-primary/10"
                      )}
                    >
                      {user.role === 'admin' ? (
                        <>
                          <ShieldAlert size={14} />
                          Revoke Admin
                        </>
                      ) : (
                        <>
                          <Shield size={14} />
                          Grant Admin
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-outline font-label">
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
