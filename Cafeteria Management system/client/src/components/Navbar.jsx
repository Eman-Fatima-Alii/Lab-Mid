import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { LogOut, Coffee, LayoutDashboard, ShoppingCart, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass-panel m-6 px-8 py-4 flex items-center justify-between sticky top-6 z-50">
      <Link to="/" className="flex items-center gap-3 text-2xl font-bold">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
          <Coffee size={22} className="text-white" />
        </div>
        <span className="gradient-text tracking-tight">Cafe Hub</span>
      </Link>
      
      <div className="flex items-center gap-8">
        {user?.role === 'admin' && (
          <Link to="/admin" className="text-sm font-semibold text-text-secondary hover:text-primary flex items-center gap-2 transition-all">
            <LayoutDashboard size={18} /> Admin
          </Link>
        )}
        {(user?.role === 'admin' || user?.role === 'staff') && (
          <Link to="/pos" className="text-sm font-semibold text-text-secondary hover:text-primary flex items-center gap-2 transition-all">
            <ShoppingCart size={18} /> POS
          </Link>
        )}
        
        <div className="h-8 w-px bg-glass-border mx-2"></div>
        
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold">{user?.name}</span>
            <span className="text-[10px] uppercase tracking-widest text-primary font-bold">{user?.role}</span>
          </div>
          <button 
            onClick={handleLogout}
            className="p-3 bg-glass-white hover:bg-danger/20 text-danger rounded-xl transition-all duration-300"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
